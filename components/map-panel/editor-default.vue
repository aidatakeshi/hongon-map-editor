<script>
import map_line_station_mx from '~/mixian/map-line-station.mx.js';

import { BIcon, BIconChevronDown, BIconChevronUp } from 'bootstrap-vue';

export default {
    mixins: [
        map_line_station_mx,
    ],

    components: {
        BIcon, BIconChevronDown, BIconChevronUp,
    },

    data(){
        return {
        };
    },

    async mounted(){

    },

    methods: {
        toggleInfoPanel(){
            this.$store.commit('info_panel_toggle');
            this.$store.dispatch('setLSInfoPanel');
        },
    },

    computed: {
        
    },
}
</script>

<template>
    <div class="map-panel">

        <div class="map-panel-head">
            <!-- Header Text -->
            <div>
                Editor Default
            </div>
            <!-- Close Button -->
            <b-button variant="light" size="sm" class="ml-auto p-1" @click="toggleInfoPanel()">
                <b-icon-chevron-up v-if="$store.state.info_panel.open" />
                <b-icon-chevron-down v-else />
            </b-button>
        </div>

        <div class="map-panel-body" v-if="$store.state.info_panel.open">

            <div style="height: 200vh"></div>

        </div>

    </div>
</template>

<style scoped>
    .map-panel-body{
        font-size: 0.8rem;
        font-weight: bold;
    }
</style>