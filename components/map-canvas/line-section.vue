<script>
import map_calc_screen_mx from '~/mixian/map-calc-screen.mx.js';

export default {
    props: {
        editable: { type: Boolean, default: false },
        data: { type: Object, default: ()=>{} },
        dataLine: { type: Object, default: ()=>{} },
        dataLineType: { type: Object, default: ()=>{} },
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
            //For each inter-station
            for (let i in this.data.stations){
                const interstation = this.data.stations[i];
                const segments = interstation.segments;
                //If no segments available, skip.
                if (!segments.length) continue;
                //First point of inter-station
                const x = this.getScreenX(segments[0].x);
                const y = this.getScreenY(segments[0].y);
                if (i == 0){
                    ctx.moveTo(x, y);
                }else{
                    ctx.lineTo(x, y);
                }
                //Determine if Hide Segments / Bezier
                const {is_dragging, is_scrolling, logzoom} = this.$store.state;
                const isMoving = is_dragging || is_scrolling;
                const {hideSegments, hideSegmentsMoving, hideBezier, hideBezierMoving} = this.lineConfig;
                const minLogzoomForSegments = isMoving ? hideSegmentsMoving : hideSegments;
                const minLogzoomForBezier = isMoving ? hideBezierMoving : hideBezier;
                const isHideSegments = [null, 0, undefined].includes(minLogzoomForSegments) ? false
                    : minLogzoomForSegments === true ? true
                    : logzoom < minLogzoomForSegments;
                const isHideBezier = [null, 0, undefined].includes(minLogzoomForBezier) ? false
                    : minLogzoomForBezier === true ? true
                    : logzoom < minLogzoomForBezier;
                //Check if interstation out of view
                const isInView = this.isInView(interstation._data);
                //Case 1: Jump to the next station without drawing
                if (!isInView){
                    const x = this.getScreenX(segments[segments.length - 1].x);
                    const y = this.getScreenY(segments[segments.length - 1].y);
                    ctx.moveTo(x, y);
                }
                //Case 2: Only show a straight line between stations
                else if (isHideSegments){
                    const x = this.getScreenX(segments[segments.length - 1].x);
                    const y = this.getScreenY(segments[segments.length - 1].y);
                    ctx.lineTo(x, y);
                }
                //Case 3: Draw each segment between stations
                else{
                    for (var j = 1; j < segments.length; j++){
                        const segment = segments[j];
                        const segment_prev = segments[j-1];
                        const x = this.getScreenX(segment.x);
                        const y = this.getScreenY(segment.y);
                        //Check if Bezier Curve
                        const isBezier = isFinite(segment.x2) && isFinite(segment.y2)
                        && isFinite(segment_prev.x1) && isFinite(segment_prev.y1);
                        //Case 3A: Show Bezier Curve
                        if (isBezier && !isHideBezier){
                            const x1 = this.getScreenX(segment_prev.x + segment_prev.x1);
                            const y1 = this.getScreenY(segment_prev.y + segment_prev.y1);
                            const x2 = this.getScreenX(segment.x + segment.x2);
                            const y2 = this.getScreenY(segment.y + segment.y2);
                            ctx.bezierCurveTo(x1, y1, x2, y2, x, y);
                        }
                        //Case 3B: Show Simple Straight Line
                        else{
                            ctx.lineTo(x, y);
                        }
                    }
                }
            }
            ctx.fillStrokeShape(shape);
        },
    },

    computed: {
        isDraggingOrScrolling(){
            return this.$store.state.is_scrolling || this.$store.state.is_dragging;
        },
        isDisplaying(){
            const hidden = this.$store.state.display.hidden;
            //Check Whether in View
            if (!this.isInView(this.data._data || {})) return false;
            //Check Whether Line Section Hidden
            if (hidden.line_section.includes(this.lineSectionID)) return false;
            //Check Whether Line Hidden
            if (hidden.line.includes(this.lineID)) return false;
            //Check Whether Line Type Hidden
            if (hidden.line_type.includes(this.lineTypeID)) return false;
            //Check Whether Operator Hidden
            if (hidden.operator.includes(this.operatorID)) return false;
            //Check Whether Operator Type Hidden
            if (hidden.operator_type.includes(this.operatorTypeID)) return false;
            //Return True
            return true;
        },

        lineSectionID(){
            return this.data.id;
        },
        lineID(){
            return this.dataLine.id;
        },
        lineTypeID(){
            return this.dataLine.line_type_id;
        },
        operatorID(){
            return this.data.operator_id;
        },
        operatorTypeID(){
            const operator = this.$store.state.data.operator.filter(operator => operator.id == this.data.operator_id);
            if (!operator.length) return false;
            return operator[0].operator_type_id;
        },

        lineConfig(){
            const {map_thickness} = this.dataLineType;
            const {defaultType} = this.$config.line;
            return this.$config.line.byType[map_thickness || defaultType];
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
                    if (this.lineConfig.defaultDisplayLineColor){
                        return this.data.color;
                    }else{
                        return this.dataLineType.map_color;
                    }
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
        <!-- Listening Area -->



        
        <!-- Selection Highlighter -->




        <!-- Displayed Line -->
        <v-shape :config="{
            sceneFunc: lineCtx,
            stroke: lineColor,
            strokeWidth: lineWidth,
            strokeScaleEnabled: false,
            fillEnabled: false,
            listening: false,
        }"/>
        <!-- Decoration (Dash) Line -->
        <v-shape v-if="hasDecoration && !isDraggingOrScrolling" :config="{
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