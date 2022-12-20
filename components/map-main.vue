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
        await this.$store.dispatch('get_LS');
        //Get Data From APIs
        await this.$store.dispatch('get_data_region');
        await this.$store.dispatch('get_data_ref_image');
        await this.$store.dispatch('get_data_line');
        await this.$store.dispatch('get_data_station');
    },

    methods: {
        
    },
}
</script>

<template>
    <div class="map-wrapper">
    </div>
</template>