<script>
import map_calc_screen_mx from '~/mixian/map-calc-screen.mx.js';

import LineSection from './line-section.vue';

export default {
    props: {
    },

    mixins: [
        map_calc_screen_mx,
    ],

    components: {
        LineSection,
    },

    data(){
        return {
            
        };
    },

    async mounted(){
    },

    methods: {
        linesByType(line_type_id){
            return this.$store.state.data.line.filter(line => line.line_type_id == line_type_id);
        },
        lineSectionsByLine(line_id){
            return this.$store.state.data.line_section.filter(line_section => line_section.line_id == line_id);
        },
    },

    computed: {
        line_types_reversed(){
            let data = [];
            for (let item of this.$store.state.data.line_type){
                data.unshift(item);
            }
            return data;
        },

        refreshTrigger(){
            const {x, y, logzoom, is_dragging} = this.$store.state;
            return `${x}|${y}|${logzoom}|${is_dragging}`;
        },
    },

    watch: {
        refreshTrigger(){
            this.$refs.layer_lines.getNode().getLayer().batchDraw();
        },
    },
}
</script>

<template>
    <v-layer ref="layer_lines">
        <!-- For Each Line Type -->
        <v-group v-for="line_type in line_types_reversed">
            <!-- For Each Line in That Type -->
            <v-group v-for="line in linesByType(line_type.id)">
                <!-- For Each Line Section in That Line -->
                <LineSection v-for="line_section in lineSectionsByLine(line.id)" :key="line_section.id"
                    :data="line_section" :data-line="line" :data-line-type="line_type"
                />
            </v-group>
        </v-group>
    </v-layer>
</template>