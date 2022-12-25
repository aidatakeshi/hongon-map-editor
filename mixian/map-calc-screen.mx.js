export default {
    methods: {

        /**
         * Get X/Y positions on screen, by long/lat positions on map
         */
        getScreenX(longitude_x){
            if (longitude_x === null || !Number.isFinite(longitude_x)) return null;
            const {screen_width, x} = this.$store.state;
            const {px_per_long_deg} = this.$store.getters;
            return screen_width / 2 + (longitude_x - x) * px_per_long_deg;
        },

        getScreenY(latitude_y){
            if (latitude_y === null || !Number.isFinite(latitude_y)) return null;
            const {screen_height, y} = this.$store.state;
            const {px_per_lat_deg} = this.$store.getters;
            return screen_height / 2 - (latitude_y - y) * px_per_lat_deg;
        },

        getScreenXY(longitude_x, latitude_y){
            return {
                x: this.getScreenX(longitude_x),
                y: this.getScreenY(latitude_y),
            };
        },

        /**
         * Get Width / Height
         */
        getScreenWidth(longitude_x1, longitude_x2){
            if (longitude_x1 === null || !Number.isFinite(longitude_x1)) return null;
            if (longitude_x2 === null || !Number.isFinite(longitude_x2)) return null;
            const {px_per_long_deg} = this.$store.getters;
            return Math.abs(longitude_x1 - longitude_x2) * px_per_long_deg;
        },

        getScreenHeight(latitude_y1, latitude_y2){
            if (latitude_y1 === null || !Number.isFinite(latitude_y1)) return null;
            if (latitude_y2 === null || !Number.isFinite(latitude_y2)) return null;
            const {px_per_lat_deg} = this.$store.getters;
            return Math.abs(latitude_y1 - latitude_y2) * px_per_lat_deg;
        },

        /**
         * Get long/lat positions on map, by X/Y positions on screen
         */
        getLongitude(screen_x){
            if (screen_x === null || !Number.isFinite(screen_x)) return null;
            const {screen_width, x} = this.$store.state;
            const {px_per_long_deg} = this.$store.getters;
            return x + (screen_x - screen_width / 2) / px_per_long_deg;
        },

        getLatitude(screen_y){
            if (screen_y === null || !Number.isFinite(screen_y)) return null;
            const {screen_height, y} = this.$store.state;
            const {px_per_lat_deg} = this.$store.getters;
            return y - (screen_y - screen_height / 2) / px_per_lat_deg;
        },

        getLongLat(screen_x, screen_y){
            return {
                x: this.getLongitude(screen_x),
                y: this.getLatitude(screen_y),
                longitude: this.getLongitude(screen_x),
                latitude: this.getLatitude(screen_y),
            };
        },

        /**
         * Check If In View
         */
        isInView({x, y, x_min, x_max, y_min, y_max}){
            const {x_left, x_right, y_bottom, y_top} = this.$store.getters;
            //Type 1: x, y
            if (x !== undefined && y !== undefined){
                if (x === null || y === null) return true;
                if (x < x_left) return false;
                if (x > x_right) return false;
                if (y < y_bottom) return false;
                if (y > y_top) return false;
                return true;
            }
            //Type 2: x_min, x_max, y_min, y_max
            else{
                if (x_min === null || x_max === null) return true;
                if (y_min === null || y_max === null) return true;
                if (x_max < x_left) return false;
                if (x_min > x_right) return false;
                if (y_max < y_bottom) return false;
                if (y_min > y_top) return false;
                return true;
            }
        },

    },
}