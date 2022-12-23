<script>
import map_handlers_mx from '~/mixian/map-handlers.mx.js';

import MapCanvasBaseImage from './base-image.vue';
import MapCanvasRefImages from './ref-images.vue';

export default {
    props: {
        editable: { type: Boolean, default: false },
    },

    mixins: [
        map_handlers_mx,
    ],

    components: {
        MapCanvasBaseImage,
    },

    data(){
        return {
        };
    },

    methods: {
        
    },

    computed: {
        stageConfig(){
            return {
                width: this.$store.state.screen_width,
                height: this.$store.state.screen_height,
            };
        },
    },
}
</script>

<template>
    <v-stage :config="stageConfig" @wheel="handleWheelRoll">

        <!-- Base Image (Draggable) -->
        <MapCanvasBaseImage :editable="editable" />

        <!-- Ref Images -->
        <MapCanvasRefImages v-if="editable" />

        <!-- Lines -->

        <!-- Stations -->

        <!-- Lat/Long Lines, Ruler -->
        

    </v-stage>
</template>