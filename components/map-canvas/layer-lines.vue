<script>

import LineSection from './line-section.vue';

export default {
    props: {
        editable: { type: Boolean, default: false },
    },

    mixins: [
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
            return `${this.$store.state.x}|${this.$store.state.y}|${this.$store.state.logzoom}`;;
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
        <!-- For Each Line Type-->
        <template v-for="line_type in line_types_reversed">
            <!-- For Each Line in That Type -->
            <template v-for="line in linesByType(line_type.id)">
                <!-- For Each Line Section in That Line -->
                <LineSection v-for="line_section in lineSectionsByLine(line.id)" :key="line_section.id"
                    :data="line_section" :data-line="line" :data-line-type="line_type"
                    :editable="editable"
                />
            </template>
        </template>
    </v-layer>
</template>