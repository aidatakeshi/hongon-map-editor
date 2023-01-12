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
        line(){
            return this.getLineByID(this.$store.state.selected_id);
        },
        line_type(){
            if (!this.line) return null;
            return this.$store.state.data.line_type.filter(item => item.id === this.line.line_type_id)[0];
        },
        operator(){
            if (!this.line) return null;
            const {operator_id} = this.line;
            return this.getOperatorByID(operator_id);
        },
    },
}
</script>

<template>
    <div class="map-panel">

        <div class="map-panel-head">
            <!-- Line Color -->
            <div>
                <color-box :color="line.color" />
            </div>
            <!-- Header Text -->
            <div class="line-name">
                <div>
                    {{line.name_chi}}
                </div>
                <div style="font-size: 80%;">
                    {{line.name_eng}}
                </div>
            </div>
            <!-- Close Button -->
            <b-button variant="light" size="sm" class="ml-auto p-1" @click="$store.commit('selected_clear')">
                <b-icon-x-lg />
            </b-button>
        </div>

        <div class="map-panel-body">
            <div class="row py-1">
                <div class="col-4">路線類型:</div>
                <div class="col-8 d-flex align-items-justify">
                    <div>
                        <span>{{(line_type || {}).name_chi}}</span>
                    </div>
                </div>
            </div>
            <div class="row py-1">
                <div class="col-4">營運者:</div>
                <div class="col-8 d-flex align-items-justify">
                    <color-box :color="operator.color" />
                    <div>
                        <span>{{operator.name_chi}}</span>
                        <small>({{operator.name_eng}})</small>
                    </div>
                </div>
            </div>
            <div class="row py-1" v-if="line.name_short_eng || line.name_short_chi">
                <div class="col-4">路線簡稱:</div>
                <div class="col-8 d-flex align-items-justify">
                    <span v-if="line.name_short_chi">
                        {{line.name_short_chi}}
                    </span>
                    <span v-if="line.name_short_eng && line.name_short_chi">/</span>
                    <span v-if="line.name_short_eng">
                        {{line.name_short_eng}}
                    </span>
                </div>
            </div>
            <div class="row py-1">
                <div class="col-4">最高車速:</div>
                <div class="col-8 d-flex align-items-justify">
                    <span>{{line.max_speed_kph}} km/h</span>
                </div>
            </div>
            <div class="py-1" v-if="line.remarks">
                <div class="-bold">備註:</div>
                <b-card body-class="p-1 -small">
                    <span class="remarks" v-if="line.remarks">{{line.remarks}}</span>
                    <hr class="my-1" v-if="line.remarks && line.remarks" />
                    <span class="remarks" v-if="line.remarks">{{line.remarks}}</span>
                </b-card>
            </div>

            <b-card v-for="(section, i) in line.sections" class="mt-2" body-class="p-1">
            
                <div class="text-center" v-if="section.name_chi || section.name_eng">
                    {{section.name_chi}}
                    <span style="font-size: 80%;">{{section.name_eng}}</span>
                </div>
                <div class="text-center" v-else-if="line.sections.length > 1">
                    (主段)
                </div>

                <div v-if="!(section.stations || []).length">
                    (未有設定車站)
                </div>
            
                <table class="table table-bordered text-center mt-2 mb-0" v-else>
                    <thead class="thead-light">
                        <tr>
                            <th>#</th>
                            <th>車站</th>
                            <th colspan="2">距離 (km)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in section.stations">
                            <td>
                                #{{i+1}}
                            </td>
                            <td>
                                <template v-if="station = getStationByID(item.station_id)">
                                    <b-button variant="light" block size="sm" class="font-weight-bold p-0"
                                    @click="$store.commit('selected_station', getStationByID(item.station_id).id)">
                                        <template v-if="station.name_chi || station.name_eng">
                                            <div>
                                                {{station.name_chi}}
                                                <template v-if="station.name_short_chi">({{station.name_short_chi}})</template>
                                            </div>
                                            <div style="font-size: 90%;">
                                                {{station.name_eng}}
                                                <template v-if="station.name_short_eng">({{station.name_short_eng}})</template>
                                            </div>
                                        </template>
                                        <div v-else style="font-style: italic">
                                            #{{getStationBase36Code(station.id)}}
                                        </div>
                                    </b-button>
                                </template>
                            </td>
                            <td>
                                {{item.distance_km ? item.distance_km.toFixed(1) : '-'}}
                            </td>
                            <td>
                                {{item.mileage_km ? item.mileage_km.toFixed(1) : '0.0'}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            
            </b-card>

        </div>

    </div>
</template>

<style scoped>
    .map-panel-body{
        font-size: 0.9rem;
        font-weight: bold;
    }
    .map-panel-body .row small{
        font-size: 0.72rem;
        font-weight: bold;
    }
    .map-panel-body table th{
        padding: 0.25em;
        vertical-align: middle;
    }
    .map-panel-body table td{
        padding: 0.25em;
        font-size: 0.9em;
        vertical-align: middle;
    }
    .map-panel-body table td button{
        font-size: 0.9em;
        line-height: 1em;
    }
    .line-name{
        line-height: 1.1em;
    }
    .remarks{
        white-space: pre-line;
        font-size: 0.8rem;
        font-weight: normal;
    }
</style>