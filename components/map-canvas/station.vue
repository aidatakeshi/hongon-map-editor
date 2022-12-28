<script>

export default {
    props: {
        editable: { type: Boolean, default: false },
        data: { type: Object, default: ()=>{} },
        x: Number,
        y: Number,
    },

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
        setHoverTooltip(){
            this.$store.commit('hover_tooltip_station', {
                x: this.x,
                y: this.y,
                id: this.data.id,
            });
        },
        clearHoverTooltip(){
            this.$store.commit('hover_tooltip_clear');
        },
    },

    computed: {
        stationConfig(){
            const {major, minor, signal} = this.$config.station;
            return this.data.is_signal_only ? signal : this.data.is_major ? major : minor;
        },
        stationSize(){
            const {px_per_km} = this.$store.getters;
            const sizeObj = this.stationConfig.size;
            if (!sizeObj) return null;
            return Math.max(sizeObj.px, sizeObj.km * px_per_km);
        },
        stationStrokeWidth(){
            const {px_per_km} = this.$store.getters;
            const strokeWidthObj = this.stationConfig.strokeWidth;
            if (!strokeWidthObj) return null;
            return Math.max(strokeWidthObj.px, strokeWidthObj.km * px_per_km);
        },
        strokeColor(){
            const {in_use, not_in_use} = this.$config.station;
            return (this.data.is_in_use ? in_use : not_in_use).stroke;
        },
        fillColor(){
            const {in_use, not_in_use} = this.$config.station;
            return (this.data.is_in_use ? in_use : not_in_use).fill;
        },

        hitAreaSize(){
            const {px_per_km} = this.$store.getters;
            const sizeObj = this.$config.station.hit_area.size;
            if (!sizeObj) return null;
            return Math.max(sizeObj.px, sizeObj.km * px_per_km);
        },

        labelConfig(){
            return this.stationConfig.label || {};
        },
        hideLabel(){
            const {logzoom} = this.$store.state;
            const {hideBelowLogzoom} = this.labelConfig;
            if ([null, undefined, false].includes(hideBelowLogzoom)) return false;
            return logzoom < hideBelowLogzoom;
        },
    },
}
</script>

<template>
    <v-group :config="{x: x, y: y}"
        @mouseenter="setHoverTooltip"
        @mouseleave="clearHoverTooltip"
    >
        <!-- Listening Area -->
        <v-circle :config="{
            stroke: 'black',
            opacity: 0,
            radius: hitAreaSize / 2,
            strokeScaleEnabled: false,
        }" />

        <!-- Selection Highlighter -->
        


        <!-- Station (Circle) -->
        <v-circle v-if="!stationConfig.isDiamond" :config="{
            fill: fillColor,
            stroke: strokeColor,
            radius: stationSize / 2,
            strokeWidth: stationStrokeWidth,
            strokeScaleEnabled: false,
            listening: false,
        }" />

        <!-- Station (Diamond) -->
        <v-rect v-else :config="{
            fill: fillColor,
            stroke: strokeColor,
            width: stationSize,
            height: stationSize,
            offsetX: stationSize / 2,
            offsetY: stationSize / 2,
            rotation: 45,
            strokeWidth: stationStrokeWidth,
            strokeScaleEnabled: false,
            listening: false,
        }" />

        <!-- Station Label -->
        <v-text v-if="!hideLabel" :config="{
            ...labelConfig,
            x: -labelConfig.width / 2,
            y: stationSize / 2 + labelConfig.y_shift,
            align: 'center',
            text: data.name_chi,
            listening: false,
        }" />

    </v-group>
</template>