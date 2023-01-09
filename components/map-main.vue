<script>
import map_handlers_mx from '~/mixian/map-handlers.mx.js';
import map_data_mx from '~/mixian/map-data.mx.js';
import map_calc_screen_mx from '~/mixian/map-calc-screen.mx.js';

import LayerBaseImage from './map-canvas/layer-base-image.vue';
import LayerRefImages from './map-canvas/layer-ref-images.vue';
import LayerLines from './map-canvas/layer-lines.vue';
import LayerStations from './map-canvas/layer-stations.vue';
import LayerOverlay from './map-canvas/layer-overlay.vue';

import MapHoverTooltip from './map-hover-tooltip.vue';
import MapMenu from './map-menu.vue';

import MapPanelViewerStation from './map-panel/viewer-station.vue';
import MapPanelViewerLineSection from './map-panel/viewer-line-section.vue';
import MapPanelEditorDefault from './map-panel/editor-default.vue';
import MapPanelEditorLineSection from './map-panel/editor-line-section.vue';
import MapPanelEditorStation from './map-panel/editor-station.vue';


export default {
    props: {
    },

    mixins: [
        map_handlers_mx, map_data_mx, map_calc_screen_mx,
    ],

    components: {
        LayerBaseImage, LayerRefImages, LayerLines, LayerStations, LayerOverlay,
        MapHoverTooltip, MapMenu,
        MapPanelViewerStation, MapPanelViewerLineSection,
        MapPanelEditorDefault, MapPanelEditorLineSection, MapPanelEditorStation,
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
        cursor(){
            if (this.$store.state.is_loading) return 'wait';
            if (this.$store.state.is_dragging) return 'move';
            if (this.$store.state.hover_tooltip_line_section) return 'pointer';
            if (this.$store.state.hover_tooltip_station) return 'pointer';
            return 'default';
        },
    },

}
</script>

<template>
    <div class="map-wrapper" :style="{cursor: cursor}">

        <!-- Canvas ------------------------------------------------------------------------------>
        <v-stage :config="stageConfig" @wheel="handleWheelRoll">
            <!-- Base Image (Draggable) -->
            <LayerBaseImage />
            <!-- Ref Images -->
            <LayerRefImages />
            <!-- Lines -->
            <LayerLines />
            <!-- Stations -->
            <LayerStations />
            <!-- Lat/Long Lines, Scale -->
            <LayerOverlay />
        </v-stage>

        <!-- Hover Tooltip -->
        <MapHoverTooltip />

        <!-- Panels ------------------------------------------------------------------------------>
        <template v-if="$store.state.is_editable">
            <!-- Editor Mode -->
            <MapPanelEditorDefault v-if="!$store.state.selected_type" />
            <MapPanelEditorStation v-if="$store.state.selected_type == 'station'" />
            <MapPanelEditorLineSection v-if="$store.state.selected_type == 'line_section'" />

        </template>
        <template v-else>
            <!-- Viewer Mode -->
            <MapPanelViewerStation v-if="$store.state.selected_type == 'station'" />
            <MapPanelViewerLineSection v-if="$store.state.selected_type == 'line_section'" />

        </template>

        <!-- Menu -------------------------------------------------------------------------------->
        <MapMenu />

        <!-- Modals ------------------------------------------------------------------------------>

        
    </div>
</template>