<script>

export default {
    mixins: [
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
            const id = this.line_section_id;
            const line_section = this.$store.state.data.line_section.filter(item => item.id == id)[0];
            if (!line_section) return null;
            const line_id = line_section.line_id;
            const line = this.$store.state.data.line.filter(item => item.id == line_id)[0];
            if (!line) return null;
            if (lang == 'chi'){
                return line.name_chi + (line_section.name_chi ? ` (${line_section.name_chi})` : '');
            }else{
                return line.name_eng + (line_section.name_eng ? ` (${line_section.name_eng})` : '');
            }
        },
        getLineOperatorName(){
            const id = this.line_section_id;
            const line_section = this.$store.state.data.line_section.filter(item => item.id == id)[0];
            if (!line_section) return null;
            const operator_id = line_section.operator_id;
            const operator = this.$store.state.data.operator.filter(item => item.id == operator_id)[0];
            if (!operator) return null;
            return operator.name_chi;
        },
        getStationName(lang = 'chi'){
            const id = this.station_id;
            const station = this.$store.state.data.station.filter(item => item.id == id)[0];
            if (!station) return null;
            return (lang == 'chi') ? station.name_chi : station.name_eng;
        },
        getStationRegion(){
            const id = this.station_id;
            const station = this.$store.state.data.station.filter(item => item.id == id)[0];
            if (!station) return null;
            const region_id = station.region_id;
            const region = this.$store.state.data.region.filter(item => item.id == region_id)[0];
            if (!region) return null;
            return region.name_chi_full;
        },
        getStationOperator(){
            const id = this.station_id;
            const station = this.$store.state.data.station.filter(item => item.id == id)[0];
            if (!station) return null;
            const operator_id = station.major_operator_id;
            const operator = this.$store.state.data.operator.filter(item => item.id == operator_id)[0];
            if (!operator) return null;
            return operator.name_chi;
        },
    },

    computed: {
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
            <div>{{getStationName('chi')}}</div>
            <div style="font-size: 80%;">
                {{getStationName('eng')}}
            </div>
            <div style="font-size: 80%;">
                ({{getStationRegion()}} / {{getStationOperator()}})
            </div>
        </div>

    </div>
</template>