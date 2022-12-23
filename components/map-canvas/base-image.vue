<script>
import map_handlers_mx from '~/mixian/map-handlers.mx.js';

export default {
    props: {
        editable: { type: Boolean, default: false },
    },

    mixins: [
        map_handlers_mx,
    ],

    components: {
        
    },

    data(){
        return {
            baseImage: null,
        };
    },

    async mounted(){
        //Load Base Image According to Config
        const myImage = new Image();
        myImage.src = this.$config.basemap.src;
        myImage.onload = function(){
            this.baseImage = myImage;
        }.bind(this);
    },

    methods: {
        
    },

    computed: {
        baseMapConfig(){
            const {longitude_span, latitude_span, longitude_mid, latitude_mid} = this.$store.getters;
            const {px_per_lat_deg, px_per_long_deg} = this.$store.getters;
            const {x, y, screen_width, screen_height} = this.$store.state;
            const basemap = this.$config.basemap;
            return {
                draggable: !this.$store.state.touch_initial_logzoom,
                scaleX: px_per_long_deg * longitude_span / basemap.width,
                scaleY: px_per_lat_deg * latitude_span / basemap.height,
                x: screen_width / 2 - px_per_long_deg * (x - longitude_mid),
                y: screen_height / 2 + px_per_lat_deg * (y - latitude_mid),
            };
        },
        baseImage_xywh(){
            return {
                x: -this.$config.basemap.width /2,
                y: -this.$config.basemap.height /2,
                width: this.$config.basemap.width,
                height: this.$config.basemap.height,
            };
        },
    },
}
</script>

<template>
    <v-layer ref="layer_base_map" :config="baseMapConfig"
        @mouseup="handleBaseMapClicked" @contextmenu="handleBaseMapRightClicked"
        @touchstart="handleBaseMapTouchStart" @touchmove="handleBaseMapTouchMove" @touchend="handleBaseMapTouchEnd"
        @dragstart="handleBaseMapDragStart" @dragmove="handleBaseMapDragMove" @dragend="handleBaseMapDragEnd"
    >
        <!-- Listening Area -->
        <v-rect :config="{
            fill: 'black',
            ...baseImage_xywh,
        }" />

        <!-- Base Image (SVG) -->
        <v-image :config="{
            image: baseImage,
            ...baseImage_xywh,
            listening: false,
        }" v-if="baseImage" />

    </v-layer>
</template>