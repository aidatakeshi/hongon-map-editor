<script>
import map_handlers_mx from '~/mixian/map-handlers.mx.js';
import map_data_mx from '~/mixian/map-data.mx.js';
import map_calc_screen_mx from '~/mixian/map-calc-screen.mx.js';

import MapCanvasMain from './map-canvas/canvas-main.vue';

export default {
    props: {
        editable: { type: Boolean, default: false },
    },

    mixins: [
        map_handlers_mx, map_data_mx, map_calc_screen_mx,
    ],

    components: {
        MapCanvasMain,
    },

    async mounted(){
        //Get Data From LocalStorage
        this.$store.dispatch('getLS');
        //Apply X/Y/Zoom Constraint Once
        this.constraintXYZoom();
        //Initialize Listeners
        this.initializeListeners();
        //Initialize Data
        this.initializeData();
    },

    beforeDestroy(){
        //Remove Listeners
        this.removeListeners();
    },

}
</script>

<template>
    <div class="map-wrapper">
        <!-- Canvas -->
        <MapCanvasMain :editable="editable" />

        <!-- Panel -->
        <div style="position: absolute; left: 0; top: 0; background-color: white;">
            DUM
        </div>

        <!-- Menu -->

        
    </div>
</template>