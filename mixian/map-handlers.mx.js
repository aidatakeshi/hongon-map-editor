export default {

    methods: {

        initializeListeners(){
            if (typeof window !== 'undefined'){
                window.addEventListener('resize', this.handleScreenResized);
            }
        },
    
        removeListeners(){
            if (typeof window !== 'undefined'){
                window.removeEventListener('resize', this.handleScreenResized);
            }
        },
    
        handleScreenResized(){
            this.$store.commit('screen_size');
            const {screen_width, screen_height} = this.$store.state;
            console.log(`%c Screen Resized: width: ${screen_width}; height: ${screen_height}`, 'color: yellow;');
            //Make Constraint
            this.constraintXYZoom();
        },
    
        handleWheelRoll(e){
            e.evt.preventDefault();
            //Change logzoom value
            const scroll_step = this.$config.zoom.logzoom_step_scroll * (e.evt.deltaY < 0 ? +1 : -1);
            this.$store.commit('logzoom_step', scroll_step);
            //Make Constraint
            this.constraintXYZoom();
            //Log Console
            const {logzoom} = this.$store.state;
            console.log(`%c Scrolled: logzoom = ${logzoom}`, 'color: yellow;');
            //Save to LocalStorage
            this.$store.dispatch('setLSXYZoom');
        },

        handleBaseMapClicked(event){

        },

        handleBaseMapRightClicked(event){
            event.evt.preventDefault();
        },

        handleBaseMapDragStart(event){
            this.$store.commit('is_dragging');
        },

        handleBaseMapDragMove(event){
            const {screen_width, screen_height} = this.$store.state;
            const {longitude_mid, latitude_mid, px_per_lat_deg, px_per_long_deg} = this.$store.getters;
            //Get new x, y position of layer_base_map
            const x = event.target.getAttr('x');
            const y = event.target.getAttr('y');
            //Set new state x, y (i.e. longitude, latitude)
            this.$store.commit('x', longitude_mid - (x - screen_width / 2) / px_per_long_deg);
            this.$store.commit('y', latitude_mid + (y - screen_height / 2) / px_per_lat_deg);
            //Make Constraint
            this.constraintXYZoom(event.target);
        },

        handleBaseMapDragEnd(event){
            this.$store.commit('not_dragging');
            //Log Console
            const {x, y} = this.$store.state;
            console.log(`%c Drag End: long_x = ${x}; lat_y = ${y}`, 'color: yellow;');
            //Save to LocalStorage
            this.$store.dispatch('setLSXYZoom');
        },

        handleBaseMapTouchStart(event){
            
        },

        handleBaseMapTouchMove(event){
            this.constraintXYZoom();
        },

        handleBaseMapTouchEnd(event){
            
        },

        constraintXYZoom(target = null){
            const {latitude_min, latitude_max, longitude_min, longitude_max} = this.$config.map;
            const {screen_height, screen_width} = this.$store.state;
            const {km_per_lat_deg, latitude_span, longitude_span, longitude_mid, latitude_mid} = this.$store.getters;
            let hasUpdate = false;

            //Constraint logzoom max
            const logzoom_max = this.$config.zoom.logzoom_max;
            if (this.$store.state.logzoom > logzoom_max){
                this.$store.commit('logzoom', logzoom_max);
                hasUpdate = true;
            }

            //Constraint logzoom according to vertical
            const logzoom_min_y = Math.log10(screen_height / km_per_lat_deg / latitude_span);
            if (this.$store.state.logzoom < logzoom_min_y){
                this.$store.commit('logzoom', logzoom_min_y);
                hasUpdate = true;
            }

            //Constraint y (latitude)
            const {px_per_lat_deg} = this.$store.getters;
            const y_max = latitude_max - (screen_height / 2) / px_per_lat_deg;
            const y_min = latitude_min + (screen_height / 2) / px_per_lat_deg;
            if (this.$store.state.y < y_min){
                this.$store.commit('y', y_min);
                hasUpdate = true;
            }else if (this.$store.state.y > y_max){
                this.$store.commit('y', y_max);
                hasUpdate = true;
            }

            //Constraint logzoom according to horizontal
            const {km_per_long_deg} = this.$store.getters;
            const logzoom_min_x = Math.log10(screen_width / km_per_long_deg / longitude_span);
            if (this.$store.state.logzoom < logzoom_min_x){
                this.$store.commit('logzoom', logzoom_min_x);
                hasUpdate = true;
            }

            //Constraint x (longitude)
            const {px_per_long_deg} = this.$store.getters;
            const x_max = longitude_max - (screen_width / 2) / px_per_long_deg;
            const x_min = longitude_min + (screen_width / 2) / px_per_long_deg;
            if (this.$store.state.x < x_min){
                this.$store.commit('x', x_min);
                hasUpdate = true;
            }else if (this.$store.state.x > x_max){
                this.$store.commit('x', x_max);
                hasUpdate = true;
            }

            //Force Update
            if (hasUpdate && target){
                const {x, y} = this.$store.state;
                target.setAttr('x', screen_width / 2 - px_per_long_deg * (x - longitude_mid));
                target.setAttr('y', screen_height / 2 + px_per_lat_deg * (y - latitude_mid));
            }

        },

    },

}