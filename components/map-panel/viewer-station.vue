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
        selectLineSection(id, index){
            this.$store.commit('selected_line', id);
            this.$store.commit('selected_line_index', index);
        },
    },

    computed: {
        station(){
            return this.getStationByID(this.$store.state.selected_id);
        },
        operator(){
            if (!this.station) return null;
            const {major_operator_id} = this.station;
            return this.getOperatorByID(major_operator_id);
        },
        region(){
            if (!this.station) return null;
            const {region_id} = this.station;
            return this.getRegionByID(region_id);
        },
        latLongString(){
            if (!this.station) return null;
            const {x, y} = this.station;
            let lat, long;
            if (y < 0) lat = `${(-y).toFixed(3)}°S`;
            else lat = `${(y).toFixed(3)}°N`;
            if (x < 0) long = `${(-x).toFixed(3)}°W`;
            else long = `${(x).toFixed(3)}°E`;
            return `${lat}, ${long}`;
        },
    },
}
</script>

<template>
    <div class="map-panel" v-if="station">

        <div class="map-panel-head">
            <!-- Header Text -->
            <div v-if="station.name_chi || station.name_eng">
                <span>
                    {{station.name_chi}}
                    <template v-if="station.name_short_chi">({{station.name_short_chi}})</template>
                </span>
                <span style="font-size: 90%;">
                    {{station.name_eng}}
                    <template v-if="station.name_short_eng">({{station.name_short_eng}})</template>
                </span>
            </div>
            <div v-else style="font-style: italic">
                #{{getStationBase36Code(station.id)}}
            </div>
            <!-- Close Button -->
            <b-button variant="light" size="sm" class="ml-auto p-1" @click="$store.commit('selected_clear')">
                <b-icon-x-lg />
            </b-button>
        </div>

        <div class="map-panel-body">
            <div class="row py-1">
                <div class="col-4">主要營運者:</div>
                <div class="col-8 d-flex align-items-justify">
                    <color-box :color="operator.color" />
                    <div>
                        <span>{{operator.name_chi}}</span>
                        <small>({{operator.name_eng}})</small>
                    </div>
                </div>
            </div>
            <div class="row py-1">
                <div class="col-4">所在地區:</div>
                <div class="col-8">
                    <span>{{region.name_chi_full}}</span>
                    <small>({{region.name_eng_full}})</small>
                </div>
            </div>
            <div class="row py-1">
                <div class="col-4">經緯度:</div>
                <div class="col-8">
                    {{latLongString}}
                </div>
            </div>
            <div class="row py-1" v-if="station.altitude_m !== null">
                <div class="col-4">海拔:</div>
                <div class="col-8">
                    {{station.altitude_m}} m
                </div>
            </div>
            <div class="row py-1">
                <div class="col-4">軌道 / 月台:</div>
                <div class="col-8">
                    <b-badge pill variant="light" class="mr-1" v-for="track in station.tracks">
                        {{track}}
                    </b-badge>
                </div>
            </div>
            <div class="row py-1">
                <div class="col-4">停靠路線:</div>
                <div class="col-8">
                    <b-button-group vertical class="w-100">
                        <b-button v-for="line in getLinesOfStation(station.id)"
                            variant="light" block size="sm" class="text-left font-weight-bold px-1"
                            @click="selectLineSection(line.id, line.sectionIndex)"
                        >
                            <color-box :color="line.color" />
                            <span>{{line.display_chi}}</span>
                        </b-button>
                    </b-button-group>
                </div>
            </div>
            <div class="py-1" v-if="station.remarks">
                <div class="-bold">備註:</div>
                <b-card body-class="p-1 -small">
                    <span class="remarks">{{station.remarks}}</span>
                </b-card>
            </div>
        </div>

    </div>
</template>

<style scoped>
    .map-panel-body{
        font-size: 0.9rem;
        font-weight: bold;
    }
    .map-panel-body small{
        font-size: 0.72rem;
        font-weight: bold;
    }
    .remarks{
        white-space: pre-line;
        font-size: 0.8rem;
        font-weight: normal;
    }
</style>