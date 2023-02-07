<script>
import map_line_station_mx from '~/mixian/map-line-station.mx.js';
import map_data_mx from '~/mixian/map-data.mx.js';

import SelectRegion from './../input/select-region.vue';
import SelectOperator from './../input/select-operator.vue';
import InputTrackNumber from './../input/input-track-number.vue';
import EditorStationSimilarNames from './editor-station-similar-names.vue';

import { BIcon, BIconXLg } from 'bootstrap-vue';

export default {
    mixins: [
        map_line_station_mx, map_data_mx,
    ],

    components: {
        BIcon, BIconXLg,
        SelectRegion, SelectOperator, InputTrackNumber,
        EditorStationSimilarNames,
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
            isDisplayingSimilarNames: {
                "eng": false, "chi": false,
            },
            isLoading: false,
            isSaving: false,
        };
    },

    async mounted(){
        this.loadStation();
    },

    methods: {
        async loadStation(){
            this.isLoading = true;
            const data = await this.getItemData('station', this.station_id);
            this.isLoading = false;
            if (!data) return $store.commit('selected_clear');
            for (let attr in this.editing){
                if (data[attr] !== undefined) this.editing[attr] = data[attr];
            }
        },
        updateMapDisplay(){
            this.$store.commit('send_data_to_map', {
                "name_chi": this.editing.name_chi, 
                "x": this.editing.x,
                "y": this.editing.y,
                "is_major": this.editing.is_major,
                "is_in_use": this.editing.is_in_use,
                "is_signal_only": this.editing.is_signal_only,
            });
        },
        async submit(){
            this.isSaving = true;
            const isSuccess = await this.updateItem('station', this.station_id, this.editing);
            this.isSaving = false;
            if (isSuccess){
                this.$store.commit('selected_clear');
                this.$store.commit('toast_success', '已保存');
            }else{
                this.$store.commit('toast_danger', '保存失敗');
            }
        },
    },

    computed: {
        station_id(){
            return this.$store.state.selected_id;
        },
        send_data_trigger_panel(){
            return this.$store.state.send_data.trigger_panel;
        },
    },

    watch: {
        station_id(){
            this.loadStation();
        },
        send_data_trigger_panel(){
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
    <div class="map-panel" v-if="station_id">

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

        <div class="map-panel-body text-center py-4" v-if="isLoading">
            <b-spinner variant="secondary" />
        </div>

        <div class="map-panel-body" v-else>

            <div class="edit-row">
                <div class="label">名稱</div>
                <div class="input">
                    <b-input v-model="editing.name_chi" size="sm"
                        @input="updateMapDisplay"
                        @focus="isDisplayingSimilarNames.chi = true"
                        @blur="isDisplayingSimilarNames.chi = false"
                    />
                </div>
            </div>
            <EditorStationSimilarNames :keyword="editing.name_chi" v-if="isDisplayingSimilarNames.chi" />
            <div class="edit-row">
                <div class="label">Name</div>
                <div class="input">
                    <b-input v-model="editing.name_eng" size="sm"
                        @focus="isDisplayingSimilarNames.eng = true"
                        @blur="isDisplayingSimilarNames.eng = false"
                    />
                </div>
            </div>
            <EditorStationSimilarNames :keyword="editing.name_eng" v-if="isDisplayingSimilarNames.eng" />
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

            <hr class="my-1" />

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
                    <b-form-checkbox v-model="editing.is_major" switch @change="updateMapDisplay" />
                </div>
            </div>

            <hr class="my-1" />

            <div class="edit-row">
                <div class="label">經緯度</div>
                <div class="input">
                    <template v-if="(editing.x || editing.x === 0) && (editing.y || editing.y === 0)">
                        {{editing.x.toFixed(5)}}, {{editing.y.toFixed(5)}}
                    </template>
                </div>
            </div>
            <div class="edit-row">
                <div class="label">海拔 (m)</div>
                <div class="input">
                    <b-input v-model="editing.altitude_m" type="number" size="sm" placeholder="[不設定]" />
                </div>
            </div>

            <hr class="my-1" />

            <div>
                <div class="label">月台/軌道編號</div>
                <div class="input">
                    <InputTrackNumber v-model="editing.tracks" size="sm" />
                </div>
            </div>
            
            <hr class="my-1" />

            <div class="edit-row">
                <div class="label">信號站</div>
                <div class="input">
                    <b-form-checkbox v-model="editing.is_signal_only" switch @change="updateMapDisplay" />
                </div>
            </div>
            <div class="edit-row">
                <div class="label">使用中</div>
                <div class="input">
                    <b-form-checkbox v-model="editing.is_in_use" switch @change="updateMapDisplay" />
                </div>
            </div>

            <hr class="my-1" />

            <div>
                <div class="label">備註</div>
                <div class="input">
                    <b-textarea rows="5" v-model="editing.remarks" size="sm" />
                </div>
            </div>

            <hr class="my-1" />

            <b-button :disabled="isSaving" variant="primary" block @click="submit">
                <div v-if="!isSaving">保存</div>
                <b-spinner small v-else />
            </b-button>

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