<script>
import map_calc_screen_mx from '~/mixian/map-calc-screen.mx.js';

import Station from './station.vue';

export default {
    props: {
        editable: { type: Boolean, default: false },
    },

    mixins: [
        map_calc_screen_mx,
    ],

    components: {
        Station,
    },

    data(){
        return {
            
        };
    },

    async mounted(){
    },

    methods: {
        isDisplayStation(station){
            //Check Hidden Stations
            const hidden_station = this.$store.state.display.hidden.station;
            if (hidden_station.all){
                return false;
            }
            if (hidden_station.minor){
                if (!station.is_major) return false;
            }
            if (hidden_station.signal_only){
                if (station.is_signal_only) return false;
            }
            if (hidden_station.not_in_use){
                if (!station.is_in_use) return false;
            }
            //Check Whether in View
            const isInView = this.isInView(station);
            if (!isInView){
                return false;
            }
            //Check Logzoom Requirements
            const {major, minor, signal} = this.$config.station;
            const stationConfig = station.is_signal_only ? signal : station.is_major ? major : minor;
            const {hideBelowLogzoom} = stationConfig;
            const {logzoom} = this.$store.state;
            const isAboveLogzoom = ![null, undefined, false].includes(hideBelowLogzoom) && (logzoom >= hideBelowLogzoom);
            if (!isAboveLogzoom){
                return false;
            }
            //Return True
            return true;
        },
    },

    computed: {
    },
}
</script>

<template>
    <v-layer ref="layer_stations">
        <Station v-for="station in $store.state.data.station" :key="station.id"
            v-if="isDisplayStation(station)"
            :data="station" :editable="editable"
            :x="getScreenX(station.x)" :y="getScreenY(station.y)"
        />
    </v-layer>
</template>