export default {

    data(){
        return {
            save_ls_after_scroll_timer: null,
        };
    },

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
            this.$store.commit('is_scrolling');
            //Change logzoom value
            const scroll_step = this.$config.zoom.logzoom_step_scroll * (e.evt.deltaY < 0 ? +1 : -1);
            this.$store.commit('logzoom_step', scroll_step);
            //Make Constraint
            this.constraintXYZoom();
            //Handle Timeout
            if (this.save_ls_after_scroll_timer){
                clearTimeout(this.save_ls_after_scroll_timer);
            }
            this.save_ls_after_scroll_timer = setTimeout(function(){
                this.$store.commit('not_scrolling');
                //Log Console
                const {logzoom} = this.$store.state;
                console.log(`%c Scrolled: logzoom = ${logzoom}`, 'color: yellow;');
                //Save to LocalStorage
                this.$store.dispatch('setLSXYZoom');
            }.bind(this), this.$config.zoom.save_ls_after_scroll);
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
            console.log(`%c Dragged: long_x = ${x}; lat_y = ${y}`, 'color: yellow;');
            //Save to LocalStorage
            this.$store.dispatch('setLSXYZoom');
        },

        handleBaseMapTouchStart(event){
            this.$store.commit('is_dragging');
            this.handleBaseMapClicked(event);
        },

        handleBaseMapTouchMove(event){
            const [touch1, touch2] = event.evt.touches;
            if (!touch1 || !touch2) return false;
            //Proceed
            const [dx, dy] = [touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY];
            const dist = Math.sqrt(dx * dx + dy * dy);
            const {logzoom} = this.$store.state;
            //If touch_initial_dist not set, setup it now
            if (!this.$store.state.touch_initial_logzoom){
                this.$store.commit('touch_initial_logzoom', logzoom);
                this.$store.commit('touch_initial_dist', dist);
            }
            //Update logzoom
            const {touch_initial_logzoom, touch_initial_dist} = this.$store.state;
            this.$store.commit('logzoom', touch_initial_logzoom + Math.log10(dist / touch_initial_dist));
            //Constraint X/Y/Zoom
            this.constraintXYZoom();
        },

        handleBaseMapTouchEnd(event){
            this.$store.commit('touch_initial_logzoom', null);
            this.$store.commit('touch_initial_dist', null);
            this.$store.commit('not_dragging');
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