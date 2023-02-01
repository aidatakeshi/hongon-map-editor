<script>
import map_line_station_mx from '~/mixian/map-line-station.mx.js';
import map_data_mx from '~/mixian/map-data.mx.js';

import { BIcon, BIconXLg } from 'bootstrap-vue';

export default {
    mixins: [
        map_line_station_mx, map_data_mx,
    ],

    components: {
        BIcon, BIconXLg,
    },

    data(){
        return {
        };
    },

    async mounted(){

    },

    methods: {
        
    },

    computed: {
        line_section(){
            return this.getLineSectionByID(this.$store.state.selected_id);
        },
        line(){
            if (!this.line_section) return null;
            return this.getLineByID(this.line_section.line_id);
        },
    },
}
</script>

<template>
    <div class="map-panel">

        <div class="map-panel-head">
            <!-- Header Text -->
            <div>
                編輯路線
            </div>
            <!-- Close Button -->
            <b-button variant="light" size="sm" class="ml-auto p-1" @click="$store.commit('selected_clear')">
                <b-icon-x-lg />
            </b-button>
        </div>

        <div class="map-panel-body">
            

        </div>

    </div>
</template>

<style scoped>
    .map-panel-body{
        font-size: 0.8rem;
        font-weight: bold;
    }
</style>