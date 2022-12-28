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
            const {major, minor, signal} = this.$config.station;
            const stationConfig = station.is_signal_only ? signal : station.is_major ? major : minor;
            const {hideBelowLogzoom} = stationConfig;
            const {logzoom} = this.$store.state;
            const isAboveLogzoom = ![null, undefined, false].includes(hideBelowLogzoom) && (logzoom >= hideBelowLogzoom);
            const isInView = this.isInView(station);
            return isInView && isAboveLogzoom;
        },
    },

    computed: {
    },
}
</script>

<template>
    <v-layer ref="layer_stations">
        <Station v-for="station in $store.state.data.station" :key="station.id"
            :data="station" :editable="editable"
            :x="getScreenX(station.x)" :y="getScreenY(station.y)"
            v-if="isDisplayStation(station)"
        />
    </v-layer>
</template>