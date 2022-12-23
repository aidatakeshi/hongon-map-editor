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

    },
}