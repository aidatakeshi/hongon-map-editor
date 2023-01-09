<script>
import map_line_station_mx from '~/mixian/map-line-station.mx.js';

import { BIcon, BIconXLg } from 'bootstrap-vue';

export default {
    mixins: [
        map_line_station_mx,
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
        station(){
            return this.getStationByID(this.$store.state.selected_id);
        },
    },
}
</script>

<template>
    <div class="map-panel" v-if="station">

        <div class="map-panel-head">
            <!-- Header Text -->
            <div>
                編輯車站
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