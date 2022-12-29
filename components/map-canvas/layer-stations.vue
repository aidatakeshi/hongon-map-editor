<script>
import map_calc_screen_mx from '~/mixian/map-calc-screen.mx.js';

import Station from './station.vue';

export default {
    props: {
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

        isDisplayStationGroup(isMajor){
            //Check Hidden Stations
            const {hidden} = this.$store.state.display;
            if (hidden.station){
                return false;
            }
            if (hidden.station_minor){
                if (!isMajor) return false;
            }
            //Return True
            return true;
        },

        isDisplayStation(station){
            //Check Hidden Stations
            const {hidden} = this.$store.state.display;
            if (hidden.station_signal_only){
                if (station.is_signal_only) return false;
            }
            if (hidden.station_not_in_use){
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
        majorStations(){
            return this.$store.state.data.station.filter(item => item.is_major);
        },
        minorStations(){
            return this.$store.state.data.station.filter(item => !item.is_major);
        },
    },
}
</script>

<template>
    <v-layer ref="layer_stations">
        <!-- Minor Stations -->
        <v-group v-if="isDisplayStationGroup(false)">
            <Station v-for="station in minorStations" :key="station.id"
                v-if="isDisplayStation(station)"
                :data="station"
                :x="getScreenX(station.x)" :y="getScreenY(station.y)"
            />
        </v-group>
        <!-- Major Stations -->
        <v-group v-if="isDisplayStationGroup(true)">
            <Station v-for="station in majorStations" :key="station.id"
                v-if="isDisplayStation(station)"
                :data="station"
                :x="getScreenX(station.x)" :y="getScreenY(station.y)"
            />
        </v-group>
    </v-layer>
</template>