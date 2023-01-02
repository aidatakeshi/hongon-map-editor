<script>
import map_station_mx from '~/mixian/map-station.mx.js';

export default {
    mixins: [
        map_station_mx,
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
            if (!this.line_section) return null;
            const line_id = this.line_section.line_id;
            const line = this.$store.state.data.line.filter(item => item.id == line_id)[0];
            if (!line) return null;
            if (lang == 'chi'){
                return line.name_chi + (this.line_section.name_chi ? ` (${this.line_section.name_chi})` : '');
            }else{
                return line.name_eng + (this.line_section.name_eng ? ` (${this.line_section.name_eng})` : '');
            }
        },
        getLineOperatorName(){
            if (!this.line_section) return null;
            const operator_id = this.line_section.operator_id;
            const operator = this.$store.state.data.operator.filter(item => item.id == operator_id)[0];
            if (!operator) return null;
            return operator.name_chi;
        },

        getStationName(lang = 'chi'){
            if (!this.station) return null;
            return (lang == 'chi') ? this.station.name_chi : this.station.name_eng;
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
        line_section(){
            const id = this.line_section_id;
            return this.$store.state.data.line_section.filter(item => item.id == id)[0];
        },
        station(){
            const id = this.station_id;
            return this.$store.state.data.station.filter(item => item.id == id)[0];
        },
        style(){
            return {
                left: `${this.mouse_x}px`, top: `${this.mouse_y}px`,
            };
        },
        line_section_id(){
            return this.$store.state.hover_tooltip_line_section;
        },
        station_id(){
            return this.$store.state.hover_tooltip_station;
        },
        is_moving(){
            return this.$store.getters.is_moving;
        },
    },
}
</script>

<template>
    <div v-if="!is_moving">

        <!-- Tooltip for LineSection -->
        <div class="map-hover-tooltip-line" :style="style" v-if="line_section_id">
            <div>{{getLineName('chi')}}</div>
            <div style="font-size: 80%;">
                {{getLineName('eng')}}
            </div>
            <div style="font-size: 80%;">
                ({{getLineOperatorName()}})
            </div>
        </div>

        <!-- Tooltip for Station -->
        <div class="map-hover-tooltip-station" :style="style" v-if="station_id">
            <template v-if="getStationName('chi') || getStationName('eng')">
                <div>{{getStationName('chi')}}</div>
                <div style="font-size: 80%;">
                    {{getStationName('eng')}}
                </div>
            </template>
            <div v-else>
                #{{getStationBase36Code(getStation())}}
            </div>
            <div style="font-size: 80%;">
                ({{getStationRegion()}} / {{getStationOperator()}})
            </div>
        </div>

    </div>
</template>