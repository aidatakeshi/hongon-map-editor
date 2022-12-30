<script>

import { BIcon, BIconXLg } from 'bootstrap-vue';

export default {
    mixins: [
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
            const {selected_id} = this.$store.state;
            return this.$store.state.data.station.filter(item => item.id == selected_id)[0];
        },
        operator(){
            if (!this.station) return null;
            const {major_operator_id} = this.station;
            return this.$store.state.data.operator.filter(item => item.id == major_operator_id)[0];
        },
        region(){
            if (!this.station) return null;
            const {region_id} = this.station;
            return this.$store.state.data.region.filter(item => item.id == region_id)[0];
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
            <div>
                <span>
                    {{station.name_chi}}
                </span>
                <span class="-small" v-if="station.name_short_chi">
                    ({{station.name_short_chi}})
                </span>
                <span class="-small">
                    {{station.name_eng}}
                </span>
                <span class="-small" v-if="station.name_short_eng">
                    ({{station.name_short_eng}})
                </span>
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
            <div class="py-1" v-if="station.remarks">
                <div class="-bold">備註:</div>
                <b-card body-class="p-1 -small">
                    <span class="-remarks">{{station.remarks}}</span>
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
</style>