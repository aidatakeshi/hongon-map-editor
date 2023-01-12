<script>
import map_calc_screen_mx from '~/mixian/map-calc-screen.mx.js';

export default {
    props: {
        sectionIndex: Number,
        line: { type: Object, default: ()=>{} },
        lineType: { type: Object, default: ()=>{} },
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
        setHoverTooltip(event){
            this.$store.commit('hover_tooltip_line', this.line.id);
            this.$store.commit('hover_tooltip_line_index', this.sectionIndex);
        },
        clearHoverTooltip(){
            this.$store.commit('hover_tooltip_line', null);
            this.$store.commit('hover_tooltip_line_index', null);
        },
        handleClicked(){
            //In edit mode, if another item is already selected, omit it.
            if (this.$store.state.is_editable){
                if (this.$store.state.selected_type) return false;
            }
            //Set selection
            this.$store.commit('selected_line', this.line.id);
            this.$store.commit('selected_line_index', this.sectionIndex);
        },

        lineCtx(ctx, shape){
            ctx.beginPath();
            //For each inter-station
            for (let i in this.section.stations){
                const interstation = this.section.stations[i];
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
                const isInView = this.isInView(interstation);
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
            if (!this.isInView(this.data || {})) return false;
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

        section(){
            return this.line.sections[this.sectionIndex];
        },

        lineID(){
            return this.line.id;
        },
        lineTypeID(){
            return this.line.line_type_id;
        },
        operatorID(){
            return this.line.operator_id;
        },
        operatorTypeID(){
            const operator = this.$store.state.data.operator.filter(operator => operator.id == this.line.operator_id);
            if (!operator.length) return false;
            return operator[0].operator_type_id;
        },

        lineConfig(){
            const {map_thickness} = this.lineType;
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
                    return this.lineType.map_color;
                case "line":
                    return this.line.color;
                case "operator_type":
                    if (true){
                        const {operator_id} = this.data;
                        const operator = this.$store.state.section.operator.filter(item => item.id == operator_id)[0];
                        if (!operator) return 'black';
                        const {operator_type_id} = operator;
                        const operator_type = this.$store.state.section.operator_type.filter(item => item.id == operator_type_id)[0];
                        if (!operator_type) return 'black';
                        return operator_type.map_color || "black";
                    }
                case "operator":
                    if (true){
                        const {operator_id} = this.data;
                        const operator = this.$store.state.section.operator.filter(item => item.id == operator_id)[0];
                        if (!operator) return 'black';
                        return operator.color || 'black';
                    }
                default:
                    if (this.lineConfig.defaultDisplayLineColor){
                        return this.line.color;
                    }else{
                        return this.lineType.map_color;
                    }
            }
        },

        highlighterExtraLineWidth(){
            const {px_per_km} = this.$store.getters;
            const strokeWidthObj = this.$config.line.highlighter.extraLineWidth;
            if (!strokeWidthObj) return null;
            return Math.max(strokeWidthObj.px, strokeWidthObj.km * px_per_km);
        },

        hasDecoration(){
            return !!this.lineConfig.decoration;
        },
        decorationLineWidth(){
            const {px_per_km} = this.$store.getters;
            const decoration = this.lineConfig.decoration;
            if (!decoration) return null;
            return Math.max(decoration.lineWidth.px, decoration.lineWidth.km * px_per_km);
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

        hitLineWidth(){
            const {px_per_km} = this.$store.getters;
            const widthObj = this.$config.line.hit_area.lineWidth;
            if (!widthObj) return null;
            return Math.max(widthObj.px, widthObj.km * px_per_km);
        },

        isSelected(){
            if (this.$store.state.selected_type == 'line'){
                if (this.$store.state.selected_id == this.line.id) return true;
            }
            return false;
        },
    },
}
</script>

<template>
    <v-group v-if="isDisplaying"
        @mouseenter="setHoverTooltip"
        @mouseleave="clearHoverTooltip"
        @mouseup="handleClicked" @touchend="handleClicked"
    >

        <!-- Listening Area -->
        <v-shape :config="{
            sceneFunc: lineCtx,
            stroke: 'red',
            opacity: 0,
            strokeWidth: hitLineWidth,
            strokeScaleEnabled: false,
            fillEnabled: false,
        }"/>

        <!-- Selection Highlighter -->
        <v-shape v-if="isSelected" :config="{
            ...$config.line.highlighter,
            sceneFunc: lineCtx,
            strokeWidth: lineWidth + highlighterExtraLineWidth * 2,
            strokeScaleEnabled: false,
            fillEnabled: false,
            listening: false,
        }"/>

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