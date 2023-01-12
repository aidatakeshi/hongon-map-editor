<script>
import map_line_station_mx from '~/mixian/map-line-station.mx.js';

export default {
    mixins: [
        map_line_station_mx,
    ],

    components: {
    },

    data(){
        return {
            mouse_x: null,
            mouse_y: null,
        };
    },

    async mounted(){
        window.addEventListener('mousemove', this.handleMouseMove);
    },

    beforeDestroy(){
        window.removeEventListener('mousemove', this.handleMouseMove);
    },

    methods: {
        handleMouseMove(e){
            this.mouse_x = e.clientX;
            this.mouse_y = e.clientY;
        },
        getLineName(lang = 'chi'){
            const name1 = (lang == 'chi') ? this.line.name_chi : this.line.name_eng;
            let name2;
            if (this.section){
                name2 = (lang == 'chi') ? this.section.name_chi : this.section.name_eng;
            }
            return name1 + (name2 ? ` (${name2})` : '');
        },
        getLineOperatorName(){
            const operator_id = this.line.operator_id;
            const operator = this.$store.state.data.operator.filter(item => item.id == operator_id)[0];
            if (!operator) return null;
            return operator.name_chi;
        },

        getStationRegion(){
            if (!this.station) return null;
            const region_id = this.station.region_id;
            const region = this.$store.state.data.region.filter(item => item.id == region_id)[0];
            if (!region) return null;
            return region.name_chi_full;
        },
        getStationOperator(){
            if (!this.station) return null;
            const operator_id = this.station.major_operator_id;
            const operator = this.$store.state.data.operator.filter(item => item.id == operator_id)[0];
            if (!operator) return null;
            return operator.name_chi;
        },
    },

    computed: {
        line_id(){
            return this.$store.state.hover_tooltip_line;
        },
        line(){
            return this.getLineByID(this.line_id);
        },
        section(){
            return this.line.sections[this.$store.state.hover_tooltip_line_index];
        },
        station_id(){
            return this.$store.state.hover_tooltip_station;
        },
        station(){
            return this.getStationByID(this.station_id);
        },
        is_moving(){
            return this.$store.getters.is_moving;
        },
        style(){
            return {
                left: `${this.mouse_x}px`, top: `${this.mouse_y}px`,
            };
        },
    },
}
</script>

<template>
    <div v-if="!is_moving">

        <!-- Tooltip for LineSection -->
        <div class="map-hover-tooltip-line" :style="style" v-if="line">
            <div>
                {{getLineName('chi')}}
            </div>
            <div style="font-size: 80%;">
                {{getLineName('eng')}}
            </div>
            <div style="font-size: 80%;">
                ({{getLineOperatorName()}})
            </div>
        </div>

        <!-- Tooltip for Station -->
        <div class="map-hover-tooltip-station" :style="style" v-if="station">
            <template v-if="station.name_chi || station.name_eng">
                <div>{{station.name_chi}}</div>
                <div style="font-size: 80%;">
                    {{station.name_eng}}
                </div>
            </template>
            <div v-else>
                #{{getStationBase36Code(getStation().id)}}
            </div>
            <div style="font-size: 80%;">
                ({{getStationRegion()}} / {{getStationOperator()}})
            </div>
        </div>

    </div>
</template>