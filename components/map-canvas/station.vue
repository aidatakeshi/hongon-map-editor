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
    },
}
</script>

<template>
    <v-group :config="{x: x, y: y}">
        <!-- Listening Area -->



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





    </v-group>
</template>