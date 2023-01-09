<script>

import { BIcon, BIconZoomIn, BIconZoomOut, BIconDisplay } from 'bootstrap-vue';

export default {
    mixins: [
        
    ],

    components: {
        BIcon, BIconZoomIn, BIconZoomOut, BIconDisplay,
    },

    data(){
        return {
            
        };
    },

    async mounted(){
        
    },

    methods: {
        zoomIn(){
            this.$store.commit('logzoom_step', this.$config.zoom.logzoom_step_button);
            this.$store.dispatch('setLSXYZoom');
        },
        zoomOut(){
            this.$store.commit('logzoom_step', -this.$config.zoom.logzoom_step_button);
            this.$store.dispatch('setLSXYZoom');
        },
    },

    computed: {
        is_editable(){
            return this.$store.state.is_editable;
        },
    },
}
</script>

<template>
    <div>
        <div class="menu_display">
            <b-button variant="light" size="sm" @click="zoomIn()">
                <b-icon-zoom-in />
            </b-button>
            <b-button variant="light" size="sm" @click="zoomOut()">
                <b-icon-zoom-out />
            </b-button>
            <b-button variant="light" size="sm" @click="$emit('modal', 'display-settings')">
                <b-icon-display />
                <label>顯示設定</label>
            </b-button>
        </div>

    </div>
</template>