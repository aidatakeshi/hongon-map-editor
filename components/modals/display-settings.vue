<script>

import { BIcon, BIconChevronDown, BIconChevronUp } from 'bootstrap-vue';

export default {
    mixins: [
    ],

    components: {
        BIcon, BIconChevronDown, BIconChevronUp,
    },

    data(){
        return {
            display: {
                show_map_ref_images: null,
                map_ref_images_transparency: null,
                show_lat_long_lines: null,
                lock_stations: null,
                line_color: null,
            },
            hidden: {
                station: null,
                station_minor: null,
                station_not_in_use: null,
                station_signal_only: null,
                station_label: null,
                station_label_minor: null,
            },
        };
    },

    async mounted(){

    },

    methods: {
        show(){
            //Copy display from states to here
            this.display = {...this.$store.state.display};
            this.hidden = {...this.$store.state.display.hidden};
            //Show Modal
            this.$refs._modal.show();
        },
        hide(){
            this.$refs._modal.hide();
        },
        onChangeField(){
            this.$store.commit('display', this.display);
            this.$store.commit('hidden', this.hidden);
        },
        onHide(){
            this.$store.dispatch('setLSDisplay');
        },
    },

    computed: {
        is_editable(){
            return this.$store.state.is_editable;
        },
    },
}
</script>

<template>
    <b-modal ref="_modal" title="顯示設定" centered hide-footer scrollable
    header-bg-variant="light" header-class="p-2" body-class="p-2" @hide="onHide">

        <div>
            <strong>地圖顯示：</strong>
        </div>

        <b-card body-class="p-2">
            <div class="d-flex align-items-center">
                <label for="show_lat_long_lines" class="my-1 mr-auto">顯示經緯度線</label>
                <b-form-checkbox id="show_lat_long_lines" switch v-model="display.show_lat_long_lines"
                @change="onChangeField" />
            </div>
            <div class="d-flex align-items-center">
                <label for="line_color" class="my-1 mr-auto">路線顯示色彩</label>
                <b-form-select id="line_color" class="w-50" size="sm" v-model="display.line_color"
                @change="onChangeField">
                    <b-form-select-option value="default">預設顯示方式</b-form-select-option>
                    <b-form-select-option value="line_type">根據路線類型</b-form-select-option>
                    <b-form-select-option value="line">根據路線</b-form-select-option>
                    <b-form-select-option value="operator_type">根據營運者類型</b-form-select-option>
                    <b-form-select-option value="operator">根據營運者</b-form-select-option>
                </b-form-select>
            </div>
            <div class="d-flex align-items-center">
                <label for="hide_station" class="my-1 mr-auto">隱藏所有車站</label>
                <b-form-checkbox id="hide_station" switch v-model="hidden.station"
                @change="onChangeField" />
            </div>
            <div class="d-flex align-items-center">
                <label for="hide_station_minor" class="my-1 mr-auto">隱藏非主要車站</label>
                <b-form-checkbox id="hide_station_minor" switch v-model="hidden.station_minor"
                :disabled="hidden.station" @change="onChangeField" />
            </div>
            <div class="d-flex align-items-center">
                <label for="hide_station_not_in_use" class="my-1 mr-auto">隱藏非使用車站</label>
                <b-form-checkbox id="hide_station_not_in_use" switch v-model="hidden.station_not_in_use"
                :disabled="hidden.station" @change="onChangeField" />
            </div>
            <div class="d-flex align-items-center">
                <label for="hide_station_signal_only" class="my-1 mr-auto">隱藏信號所</label>
                <b-form-checkbox id="hide_station_signal_only" switch v-model="hidden.station_signal_only"
                :disabled="hidden.station" @change="onChangeField" />
            </div>
            <div class="d-flex align-items-center">
                <label for="hide_station_label" class="my-1 mr-auto">不顯示站名 (所有車站)</label>
                <b-form-checkbox id="hide_station_label" switch v-model="hidden.station_label"
                :disabled="hidden.station" @change="onChangeField" />
            </div>
            <div class="d-flex align-items-center">
                <label for="hide_station_label_minor" class="my-1 mr-auto">不顯示站名 (非主要車站)</label>
                <b-form-checkbox id="hide_station_label_minor" switch v-model="hidden.station_label_minor"
                :disabled="hidden.station || hidden.station_minor || hidden.station_label"
                @change="onChangeField" />
            </div>
        </b-card>

        <div v-if="is_editable" class="mt-2">
            <strong>編輯相關：</strong>
        </div>

        <b-card body-class="p-2" v-if="is_editable">
            <div class="d-flex align-items-center">
                <label for="show_map_ref_images" class="my-1 mr-auto">顯示參考底圖</label>
                <b-form-checkbox id="show_map_ref_images" switch v-model="display.show_map_ref_images"
                @change="onChangeField" />
            </div>
            <div class="d-flex align-items-center">
                <label for="map_ref_images_transparency" class="my-1 mr-auto">參考底圖不透明度</label>
                <b-form-spinbutton id="map_ref_images_transparency" v-model="display.map_ref_images_transparency"
                    :disabled="!display.show_map_ref_images"
                    min="0" max="1" step="0.05" class="w-50" size="sm"
                @change="onChangeField" />
            </div>
            <div class="d-flex align-items-center">
                <label for="lock_stations" class="my-1 mr-auto">鎖定車站位置</label>
                <b-form-checkbox id="lock_stations" switch v-model="display.lock_stations"
                @change="onChangeField" />
            </div>
        </b-card>

    </b-modal>
</template>

<style scoped>

</style>