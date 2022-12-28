<script>

export default {
    mixins: [
    ],

    components: {
        
    },

    data(){
        return {
            
        };
    },

    async mounted(){
    },

    methods: {
        getLineName(lang = 'chi'){
            const line_section = this.$store.state.data.line_section.filter(item => item.id == this.id)[0];
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
            const line_section = this.$store.state.data.line_section.filter(item => item.id == this.id)[0];
            if (!line_section) return null;
            const operator_id = line_section.operator_id;
            const operator = this.$store.state.data.operator.filter(item => item.id == operator_id)[0];
            if (!operator) return null;
            return operator.name_chi;
        },
        getStationName(lang = 'chi'){
            const station = this.$store.state.data.station.filter(item => item.id == this.id)[0];
            if (!station) return null;
            return (lang == 'chi') ? station.name_chi : station.name_eng;
        },
        getStationRegion(){
            const station = this.$store.state.data.station.filter(item => item.id == this.id)[0];
            if (!station) return null;
            const region_id = station.region_id;
            const region = this.$store.state.data.region.filter(item => item.id == region_id)[0];
            if (!region) return null;
            return region.name_chi_full;
        },
        getStationOperator(){
            const station = this.$store.state.data.station.filter(item => item.id == this.id)[0];
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
                left: `${this.hover_tooltip.x}px`,
                top: `${this.hover_tooltip.y}px`,
            };
        },
        hover_tooltip(){
            return this.$store.state.hover_tooltip;
        },
        type(){
            return this.$store.state.hover_tooltip.type;
        },
        id(){
            return this.$store.state.hover_tooltip.id;
        },
        is_moving(){
            return this.$store.state.is_dragging || this.$store.state.is_scrolling;
        },
    },
}
</script>

<template>
    <div class="map-hover-tooltip" :style="style" v-if="type && !is_moving">

        <!-- Tooltip for LineSection -->
        <div class="tooltip-line" v-if="hover_tooltip.type == 'line_section'">
            <div>{{getLineName('chi')}}</div>
            <div style="font-size: 80%;">
                {{getLineName('eng')}}
            </div>
            <div style="font-size: 80%;">
                ({{getLineOperatorName()}})
            </div>
        </div>

        <!-- Tooltip for Station -->
        <div class="tooltip-station" v-if="hover_tooltip.type == 'station'">
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