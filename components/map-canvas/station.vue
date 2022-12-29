<script>

export default {
    props: {
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
            this.$store.commit('hover_tooltip_station', this.data.id);
        },
        clearHoverTooltip(){
            this.$store.commit('hover_tooltip_station', null);
        },
        handleClicked(){
            //In edit mode, if another item is already selected, omit it.
            if (this.$store.state.is_editable){
                if (this.$store.state.selected_type) return false;
            }
            //Set selection
            this.$store.commit('selected_station', this.data.id);
        },
    },

    computed: {
        stationConfig(){
            const {major, minor, signal} = this.$config.station;
            if (this.data.is_signal_only) return signal;
            if (this.data.is_major) return major;
            return minor;
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

        highlighterExtraStrokeWidth(){
            const {px_per_km} = this.$store.getters;
            const strokeWidthObj = this.$config.station.highlighter.extraStrokeWidth;
            if (!strokeWidthObj) return null;
            return Math.max(strokeWidthObj.px, strokeWidthObj.km * px_per_km);
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
            //Check if Label Hidden
            const {hidden} = this.$store.state.display;
            if (hidden.station_label) return true;
            if (hidden.station_label_minor){
                if (!this.data.is_major) return true;
            }
            //Check if Below Logzoom
            const {logzoom} = this.$store.state;
            const {hideBelowLogzoom} = this.labelConfig;
            if (![null, undefined, false].includes(hideBelowLogzoom)){
                if (logzoom < hideBelowLogzoom) return true;
            }
            //Return False
            return false;
        },

        isSelected(){
            if (this.$store.state.selected_type !== 'station') return false;
            if (this.$store.state.selected_id !== this.data.id) return false;
            return true;
        },
    },
}
</script>

<template>
    <v-group :config="{x: x, y: y}"
        @mouseenter="setHoverTooltip"
        @mouseleave="clearHoverTooltip"
        @mouseup="handleClicked" @touchend="handleClicked"
    >
        <!-- Listening Area -->
        <v-circle :config="{
            fill: 'red',
            opacity: 0,
            radius: hitAreaSize / 2,
            strokeScaleEnabled: false,
        }" />

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

        <v-group v-if="isSelected">
            <!-- Selection Highlighter (Circle) -->
            <v-circle v-if="!stationConfig.isDiamond" :config="{
                ...$config.station.highlighter,
                radius: stationSize / 2,
                strokeWidth: stationStrokeWidth + highlighterExtraStrokeWidth * 2,
                strokeScaleEnabled: false,
                listening: false,
            }" />

            <!-- Selection Highlighter (Diamond) -->
            <v-rect v-else :config="{
                ...$config.station.highlighter,
                width: stationSize,
                height: stationSize,
                offsetX: stationSize / 2,
                offsetY: stationSize / 2,
                rotation: 45,
                strokeWidth: stationStrokeWidth + highlighterExtraStrokeWidth * 2,
                strokeScaleEnabled: false,
                listening: false,
            }" />
        </v-group>

        <!-- Station Label -->
        <v-text v-if="!hideLabel" :config="{
            ...labelConfig,
            x: -labelConfig.width / 2,
            y: stationSize / 2 + stationStrokeWidth / 2 + labelConfig.y_shift,
            align: 'center',
            text: data.name_chi,
            listening: false,
        }" />

    </v-group>
</template>