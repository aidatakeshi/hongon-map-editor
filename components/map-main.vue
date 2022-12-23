<script>
import map_handlers_mx from '~/mixian/map-handlers.mx.js';
import map_data_mx from '~/mixian/map-data.mx.js';
import map_calc_screen_mx from '~/mixian/map-calc-screen.mx.js';

import LayerBaseImage from './map-canvas/layer-base-image.vue';
import LayerRefImages from './map-canvas/layer-ref-images.vue';
import LayerLines from './map-canvas/layer-lines.vue';
import LayerStations from './map-canvas/layer-stations.vue';
import LayerOverlay from './map-canvas/layer-overlay.vue';

export default {
    props: {
        editable: { type: Boolean, default: false },
    },

    mixins: [
        map_handlers_mx, map_data_mx, map_calc_screen_mx,
    ],

    components: {
        LayerBaseImage, LayerRefImages,
        LayerLines, LayerStations,
        LayerOverlay,
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
    <div class="map-wrapper">

        <!-- Canvas ------------------------------------------------------------------------------>
        <v-stage :config="stageConfig" @wheel="handleWheelRoll">
            <!-- Base Image (Draggable) -->
            <LayerBaseImage :editable="editable" />
            <!-- Ref Images -->
            <LayerRefImages v-if="editable" />
            <!-- Lines -->
            <LayerLines :editable="editable" />
            <!-- Stations -->
            <LayerStaions :editable="editable" />
            <!-- Lat/Long Lines, Scale -->
            <LayerOverlay :editable="editable" />
        </v-stage>

        <!-- Panel ------------------------------------------------------------------------------->
        <div style="position: absolute; left: 0; top: 0; background-color: white;">
            DUM
        </div>

        <!-- Menu -------------------------------------------------------------------------------->

        
    </div>
</template>