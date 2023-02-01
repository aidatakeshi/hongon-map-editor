<script>
import map_line_station_mx from '~/mixian/map-line-station.mx.js';
import map_data_mx from '~/mixian/map-data.mx.js';

import SelectRegion from './../input/select-region.vue';
import SelectOperator from './../input/select-operator.vue';
import InputTrackNumber from './../input/input-track-number.vue';

import { BIcon, BIconXLg } from 'bootstrap-vue';

export default {
    mixins: [
        map_line_station_mx, map_data_mx,
    ],

    components: {
        BIcon, BIconXLg,
        SelectRegion, SelectOperator, InputTrackNumber,
    },

    data(){
        return {
            editing: {
                "name_chi": null, "name_eng": null,
                "name_short_chi": null, "name_short_eng": null,
                "major_operator_id": null, "region_id": null,
                "x": null,  "y": null,
                "altitude_m": null,
                "tracks": null, "tracks_info": null,
                "is_major": null, "is_in_use": null, "is_signal_only": null,
                "remarks": null
            },
            editing_default: {
                "tracks": [], "tracks_info": [],
                "is_major": false, "is_in_use": true, "is_signal_only": false,
            },

        };
    },

    async mounted(){
        this.loadStation();
    },

    methods: {
        loadStation(){
            if (this.station_id){
                for (let i in this.editing){
                    this.editing[i] = this.station[i];
                }
            }
        },
    },

    computed: {
        station_id(){
            return this.$store.state.selected_id;
        },
        station(){
            return this.getStationByID(this.station_id);
        },
    },

    watch: {
        station_id(){
            this.loadStation();
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

            <div class="edit-row">
                <div class="label">名稱</div>
                <div class="input">
                    <b-input v-model="editing.name_chi" size="sm" />
                </div>
            </div>
            <div class="edit-row">
                <div class="label">Name</div>
                <div class="input">
                    <b-input v-model="editing.name_eng" size="sm" />
                </div>
            </div>
            <div class="edit-row">
                <div class="label">簡稱</div>
                <div class="input">
                    <b-input v-model="editing.name_short_chi" size="sm" placeholder="[不設定]" />
                </div>
            </div>
            <div class="edit-row">
                <div class="label">Shortform</div>
                <div class="input">
                    <b-input v-model="editing.name_short_eng" size="sm" placeholder="[不設定]" />
                </div>
            </div>
            <div class="edit-row">
                <div class="label">地區</div>
                <div class="input">
                    <SelectRegion v-model="editing.region_id" size="sm" />
                </div>
            </div>
            <div class="edit-row">
                <div class="label">主要營運者</div>
                <div class="input">
                    <SelectOperator v-model="editing.major_operator_id" size="sm" />
                </div>
            </div>
            <div class="edit-row">
                <div class="label">主要車站</div>
                <div class="input">
                    <b-form-checkbox v-model="editing.is_major" switch />
                </div>
            </div>
            <div class="edit-row">
                <div class="label">海拔 (m)</div>
                <div class="input">
                    <b-input v-model="editing.altitude_m" type="number" size="sm" placeholder="[不設定]" />
                </div>
            </div>
            <div>
                <div class="label">月台/軌道編號</div>
                <div class="input">
                    <InputTrackNumber v-model="editing.tracks" size="sm" />
                </div>
            </div>
            <div class="edit-row">
                <div class="label">信號站</div>
                <div class="input">
                    <b-form-checkbox v-model="editing.is_signal_only" switch />
                </div>
            </div>
            <div class="edit-row">
                <div class="label">使用中</div>
                <div class="input">
                    <b-form-checkbox v-model="editing.is_in_use" switch />
                </div>
            </div>
            <div>
                <div class="label">備註</div>
                <div class="input">
                    <b-textarea rows="5" v-model="editing.remarks" size="sm" />
                </div>
            </div>

            <hr/>
            {{ editing }}
        </div>

    </div>
</template>

<style scoped>
    .map-panel-body{
        font-size: 0.8rem;
        font-weight: bold;
    }
    .edit-row{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .edit-row > .label{
        min-width: 6em;
    }
    .edit-row > .input{
        flex-grow: 1;
    }
</style>