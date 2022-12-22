<script>
import axios from '~/plugins/axios';
import $ from '~/common.js';

import map_handlers_mx from '~/mixian/map-handlers.mx.js';

import MapCanvasBaseImage from './base-image.vue';

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

    async mounted(){
        //Get Data From LocalStorage
        await this.$store.dispatch('getLS');
        //Apply X/Y/Zoom Constraint Once
        this.constraintXYZoom();
        //Initialize Listeners
        this.initializeListeners();
    },

    beforeDestroy(){
        //Remove Listeners
        this.removeListeners();
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
        <MapCanvasBaseImage />

        <!-- Ref Images -->

        <!-- Lines -->

        <!-- Stations -->

    </v-stage>
</template>