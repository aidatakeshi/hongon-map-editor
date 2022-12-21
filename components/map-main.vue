<script>
import axios from '~/plugins/axios';
import _ from '~/config.js';
import $ from '~/common.js';

export default {
    props: {
        editable: { type: Boolean, default: false },
    },

    components: {
        
    },

    data(){
        return {
            
        };
    },

    async mounted(){
        //Get Data From LocalStorage
        await this.$store.dispatch('getLS');
    },

    methods: {
        
    },
}
</script>

<template>
    <div class="map-wrapper">
        <!-- Canvas -->

        <!-- Panel -->

        <!-- Menu -->
    </div>
</template>