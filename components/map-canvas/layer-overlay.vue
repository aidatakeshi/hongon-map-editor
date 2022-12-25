<script>
import map_calc_screen_mx from '~/mixian/map-calc-screen.mx.js';

const scales = [
    {label: '500km', length_km: 500},
    {label: '200km', length_km: 200},
    {label: '100km', length_km: 100},
    {label: '50km', length_km: 50},
    {label: '20km', length_km: 20},
    {label: '10km', length_km: 10},
    {label: '5km', length_km: 5},
    {label: '2km', length_km: 2},
    {label: '1km', length_km: 1},
    {label: '5km', length_km: 5},
    {label: '2km', length_km: 2},
    {label: '1km', length_km: 1},
    {label: '500m', length_km: 0.5},
    {label: '200m', length_km: 0.2},
    {label: '100m', length_km: 0.1},
    {label: '50m', length_km: 0.05},
    {label: '20m', length_km: 0.02},
    {label: '10m', length_km: 0.01},
    {label: '5m', length_km: 0.005},
    {label: '2m', length_km: 0.002},
    {label: '1m', length_km: 0.001},
];

export default {
    props: {
        
    },

    mixins: [
        map_calc_screen_mx,
    ],

    components: {
        
    },

    data(){
        return {
            
        };
    },

    async mounted(){
    },

    methods: {
        longitudeMark(long){
            long = Math.round(long);
            if (long > 0) return `${long}°E`;
            if (long < 0) return `${-long}°W`;
            return `0°`;
        },
        latitudeMark(lat){
            lat = Math.round(lat);
            if (lat > 0) return `${lat}°N`;
            if (lat < 0) return `${-lat}°S`;
            return `0°`;
        },
    },

    computed: {
        screen_width(){
            return this.$store.state.screen_width;
        },
        screen_height(){
            return this.$store.state.screen_height;
        },
        longitudes(){
            const x_left = Math.ceil(this.$store.getters.x_left);
            const x_right = Math.floor(this.$store.getters.x_right);
            let arr = [];
            for (let long = x_left; long <= x_right; long++) arr.push(long);
            return arr;
        },
        longitudeLineScreenXs(){
            return this.longitudes.map(long => this.getScreenX(long));
        },
        latitudes(){
            const y_bottom = Math.ceil(this.$store.getters.y_bottom);
            const y_top = Math.floor(this.$store.getters.y_top);
            let arr = [];
            for (let lat = y_bottom; lat <= y_top; lat++) arr.push(lat);
            return arr;
        },
        latitudeLineScreenYs(){
            return this.latitudes.map(lat => this.getScreenY(lat));
        },
        //Returns {label, width}
        scaleUsed(){
            for (let scale of scales){
                const label = scale.label;
                const width = scale.length_km * this.$store.getters.px_per_km;
                if (width <= this.$config.scale.width_max){
                    return {label, width};
                }
            }
        },
    },
}
</script>

<template>
    <v-layer>

        <!-- Longitude Lines -->
        <v-group v-if="$store.state.display.show_lat_long_lines">
            <v-group v-for="(long, i) in longitudes" :key="i">
                <v-line :config="{
                    ...$config.lat_long.line,
                    points: [
                        longitudeLineScreenXs[i], 0,
                        longitudeLineScreenXs[i], screen_height,
                    ],
                    listening: false,
                }" />
                <!-- Upper Label -->
                <v-text :config="{
                    ...$config.lat_long.label,
                    x: longitudeLineScreenXs[i] + ($config.lat_long.label.x_shift || 0),
                    y: 0 + ($config.lat_long.label.y_shift || 0),
                    width: screen_width,
                    align: 'left',
                    text: longitudeMark(long),
                    listening: false,
                }" />
                <!-- Lower Label -->
                <v-text :config="{
                    ...$config.lat_long.label,
                    x: -screen_width + longitudeLineScreenXs[i] - ($config.lat_long.label.x_shift || 0),
                    y: screen_height - ($config.lat_long.label.fontSize || 0) - ($config.lat_long.label.y_shift || 0),
                    width: screen_width,
                    align: 'right',
                    text: longitudeMark(long),
                    listening: false,
                }" />
            </v-group>
        </v-group>

        <!-- Latitude Lines -->
        <v-group v-if="$store.state.display.show_lat_long_lines">
            <v-group v-for="(lat, i) in latitudes" :key="i">
                <v-line :config="{
                    points: [
                        0, latitudeLineScreenYs[i],
                        screen_width, latitudeLineScreenYs[i],
                    ],
                    ...$config.lat_long.line,
                    listening: false,
                }" />
                <v-text :config="{
                    ...$config.lat_long.label,
                    x: 0 + ($config.lat_long.label.x_shift || 0),
                    y: -($config.lat_long.label.fontSize || 0) + latitudeLineScreenYs[i] - ($config.lat_long.label.y_shift || 0),
                    width: screen_width,
                    align: 'left',
                    text: latitudeMark(lat),
                    listening: false,
                }" />
                <v-text :config="{
                    ...$config.lat_long.label,
                    x: -($config.lat_long.label.x_shift || 0),
                    y: latitudeLineScreenYs[i] + ($config.lat_long.label.y_shift || 0),
                    width: screen_width,
                    align: 'right',
                    text: latitudeMark(lat),
                    listening: false,
                }" />
            </v-group>
        </v-group>

        <!-- Scale -->
        <v-group v-if="scaleUsed">
            <v-line :config="{
                points: [
                    (screen_width - $config.scale.x_shift), ($config.scale.y_shift + $config.scale.height),
                    (screen_width - $config.scale.x_shift), ($config.scale.y_shift),
                ],
                ...$config.scale.line,
                listening: false,
            }" />
            <v-line :config="{
                points: [
                    (screen_width - $config.scale.x_shift), ($config.scale.y_shift + $config.scale.height / 2),
                    (screen_width - $config.scale.x_shift - scaleUsed.width), ($config.scale.y_shift + $config.scale.height / 2),
                ],
                ...$config.scale.line,
                listening: false,
            }" />
            <v-line :config="{
                points: [
                    (screen_width - $config.scale.x_shift - scaleUsed.width), ($config.scale.y_shift + $config.scale.height),
                    (screen_width - $config.scale.x_shift - scaleUsed.width), ($config.scale.y_shift),
                ],
                ...$config.scale.line,
                listening: false,
            }" />
            <v-text :config="{
                ...$config.scale.label,
                x: screen_width - $config.scale.x_shift - scaleUsed.width,
                y: ($config.scale.label.y_shift || 0),
                width: scaleUsed.width,
                align: 'center',
                text: scaleUsed.label,
                listening: false,
            }" />
        </v-group>

    </v-layer>
</template>