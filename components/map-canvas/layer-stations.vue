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
            editing: {
                "id": null, "name_chi": null, 
                "x": null,  "y": null,
                "is_major": null, "is_in_use": null, "is_signal_only": null,
            },
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

        handleDragged({x, y}){
            const $x = this.getLongitude(x);
            const $y = this.getLatitude(y);
            this.editing.x = $x;
            this.editing.y = $y;
            this.$store.commit('send_data_to_panel', {x: $x, y: $y});
        },

    },

    computed: {
        editable(){
            return this.$store.state.is_editable;
        },
        selected_id(){
            if (this.$store.state.selected_type == 'station') return this.$store.state.selected_id;
            return null;
        },
        send_data_trigger_map(){
            return this.$store.state.send_data.trigger_map;
        },
        majorStations(){
            return this.$store.state.data.station.filter(item => item.is_major);
        },
        minorStations(){
            return this.$store.state.data.station.filter(item => !item.is_major);
        },
    },

    watch: {
        selected_id(station_id){
            if (this.editable){
                //Copy required station data to editing object
                if (!station_id) return false;
                const station = this.$store.state.data.station.filter(item => item.id == station_id)[0];
                if (!station) return false;
                for (let i in this.editing){
                    this.editing[i] = station[i];
                }
            }
        },
        send_data_trigger_map(){
            const payload = this.$store.state.send_data.payload;
            for (var i in this.editing){
                if (payload[i] !== undefined){
                    this.editing[i] = payload[i];
                }
            }
        },
    },
}
</script>

<template>
    <v-layer ref="layer_stations">

        <!-- Mode 1: Viewer -->
        <template v-if="!editable">
            <!-- Minor Stations (Which are Not Selected) -->
            <v-group v-if="isDisplayStationGroup(false)">
                <Station v-for="station in minorStations" :key="station.id"
                    v-if="isDisplayStation(station)"
                    :data="station" :selected="selected_id === station.id"
                    :x="getScreenX(station.x)" :y="getScreenY(station.y)"
                />
            </v-group>
            <!-- Major Stations (Which are Not Selected) -->
            <v-group v-if="isDisplayStationGroup(true)">
                <Station v-for="station in majorStations" :key="station.id"
                    v-if="isDisplayStation(station)"
                    :data="station" :selected="selected_id === station.id"
                    :x="getScreenX(station.x)" :y="getScreenY(station.y)"
                />
            </v-group>
        </template>

        <!-- Mode 2: Editor -->
        <template v-else>
            <!-- Minor Stations (Which are Not Selected) -->
            <v-group v-if="isDisplayStationGroup(false)">
                <Station v-for="station in minorStations" :key="station.id"
                    v-if="isDisplayStation(station) && selected_id !== station.id"
                    :data="station" :x="getScreenX(station.x)" :y="getScreenY(station.y)"
                />
            </v-group>
            <!-- Major Stations (Which are Not Selected) -->
            <v-group v-if="isDisplayStationGroup(false)">
                <Station v-for="station in majorStations" :key="station.id"
                    v-if="isDisplayStation(station) && selected_id !== station.id"
                    :data="station" :x="getScreenX(station.x)" :y="getScreenY(station.y)"
                />
            </v-group>
            <!-- Selected Station (using editing object) -->
            <Station v-if="selected_id" selected
                :data="editing" :x="getScreenX(editing.x)" :y="getScreenY(editing.y)"
                @dragged="handleDragged"
            />
        </template>

    </v-layer>
</template>