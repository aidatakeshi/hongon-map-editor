<script>
import axios from '~/plugins/axios'
import $ from '~/common.js';

export default {
    async mounted(){
        const response = await $.callAPI(axios, "POST", "invalidate");
        $.clearBearerToken();
        console.log('Logout: Done');
        return this.$router.push('/login');
    },
}
</script>

<template>
    <div>
    </div>
</template>