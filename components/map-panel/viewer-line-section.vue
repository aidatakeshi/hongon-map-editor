<script>

import { BIcon, BIconXLg } from 'bootstrap-vue';

export default {
    mixins: [
    ],

    components: {
        BIcon, BIconXLg,
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

    },
}
</script>

<template>
    <div class="map-panel">
        <div class="map-panel-head">

            <!-- Header Text -->
            <div>

            </div>

            <!-- Close Button -->
            <b-button variant="light" size="sm" class="ml-auto p-1" @click="$store.commit('selected_clear')">
                <b-icon-x-lg />
            </b-button>

        </div>
        <div class="map-panel-body">
            Viewer Station
        </div>
    </div>
</template>