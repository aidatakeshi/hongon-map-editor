<script>
import map_calc_screen_mx from '~/mixian/map-calc-screen.mx.js';

export default {
    props: {
        editable: { type: Boolean, default: false },
        data: {type: Object, default: ()=>{}},
        dataLine: {type: Object, default: ()=>{}},
        dataLineType: {type: Object, default: ()=>{}},
    },

    mixins: [
        map_calc_screen_mx,
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
        lineCtx(ctx, shape){
            ctx.beginPath();
            let firstStation = true;
            //For each inter-station
            for (let i in this.data.stations){
                var segments = this.data.stations[i].segments;
                if (!segments.length) continue;
                if (firstStation){
                    firstStation = false;
                    const x = this.getScreenX(segments[0].x);
                    const y = this.getScreenY(segments[0].y);
                    ctx.moveTo(x, y);
                }else{
                    const x = this.getScreenX(segments[0].x);
                    const y = this.getScreenY(segments[0].y);
                    ctx.lineTo(x, y);
                }
                /*if (this.$store.state.is_dragging){
                    //If dragging, only show a straight line between stations
                    const x = this.getScreenX(segments[segments.length - 1].x);
                    const y = this.getScreenY(segments[segments.length - 1].y);
                    ctx.lineTo(x, y);
                }else{*/
                    for (var j = 1; j < segments.length; j++){
                        const segment = segments[j];
                        const segment_prev = segments[j-1];
                        const x = this.getScreenX(segment.x);
                        const y = this.getScreenY(segment.y);
                        //Check if Bezier Curve
                        var isBezier = true;
                        if (!isFinite(segment.x2) || !isFinite(segment.y2)) isBezier = false;
                        if (!isFinite(segment_prev.x1) || !isFinite(segment_prev.y1)) isBezier = false;
                        //... Bezier Curve
                        if (isBezier && !this.$store.state.is_dragging){
                            const x1 = this.getScreenX(segment_prev.x - (-segment_prev.x1));
                            const y1 = this.getScreenY(segment_prev.y - (-segment_prev.y1));
                            const x2 = this.getScreenX(segment.x - (-segment.x2));
                            const y2 = this.getScreenY(segment.y - (-segment.y2));
                            ctx.bezierCurveTo(x1, y1, x2, y2, x, y);
                        }
                        //... Simple Straight Line
                        else{
                            ctx.lineTo(x, y);
                        }
                    }
                /*}*/
            }
            ctx.fillStrokeShape(shape);
        },
    },

    computed: {
        isDisplaying(){
            if (!this.isInView(this.data._data || {})) return false;
            return true;
        },
        lineConfig(){
            const map_thickness = this.dataLineType.map_thickness;
            return this.$config.line.byType[map_thickness] || this.$config.line.byType.default;
        },
        lineWidth(){
            const {px_per_km} = this.$store.getters;
            const lineWidthObj = this.lineConfig.lineWidth;
            if (!lineWidthObj) return null;
            return Math.max(lineWidthObj.px, lineWidthObj.km * px_per_km);
        },
        lineColor(){
            //"line_type"
            switch (this.$store.state.display.line_color){
                case "line_type":
                    return this.dataLineType.map_color;
                case "line":
                    return this.data.color;
                case "operator_type":
                    if (true){
                        const {operator_id} = this.data;
                        const operator = this.$store.state.data.operator.filter(item => item.id == operator_id)[0];
                        if (!operator) return 'black';
                        const {operator_type_id} = operator;
                        const operator_type = this.$store.state.data.operator_type.filter(item => item.id == operator_type_id)[0];
                        if (!operator_type) return 'black';
                        return operator_type.map_color || "black";
                    }
                case "operator":
                    if (true){
                        const {operator_id} = this.data;
                        const operator = this.$store.state.data.operator.filter(item => item.id == operator_id)[0];
                        if (!operator) return 'black';
                        return operator.color || 'black';
                    }
                default:
                    if (this.dataLineType.map_thickness >= 3) return this.data.color;
                    return this.dataLineType.map_color;
            }
        },
        hasDecoration(){
            return !!this.lineConfig.decoration;
        },
        decorationLineWidth(){
            const {px_per_km} = this.$store.getters;
            const decoration = this.lineConfig.decoration;
            if (!decoration) return null;
            return Math.max(decoration.width.px, decoration.width.km * px_per_km);
        },
        decorationLineDash(){
            const {px_per_km} = this.$store.getters;
            const decoration = this.lineConfig.decoration;
            if (!decoration) return null;
            return Math.max(decoration.dash.px, decoration.dash.km * px_per_km);
        },
        decorationLineColor(){
            const decoration = this.lineConfig.decoration;
            if (!decoration) return null;
            return decoration.color;
        },
    },
}
</script>

<template>
    <v-group v-if="isDisplaying">
        <!-- Displayed Line -->
        <v-shape :config="{
            sceneFunc: lineCtx,
            stroke: lineColor,
            strokeWidth: lineWidth,
            strokeScaleEnabled: false,
            fillEnabled: false,
        }"/>
        <!-- Decoration (Dash) Line -->
        <v-shape v-if="hasDecoration && !this.$store.state.is_dragging" :config="{
            sceneFunc: lineCtx,
            stroke: decorationLineColor,
            strokeWidth: decorationLineWidth,
            dash: [ decorationLineDash, decorationLineDash ],
            strokeScaleEnabled: false,
            fillEnabled: false,
            listening: false,
        }"/>
    </v-group>
</template>