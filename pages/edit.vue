<script>
import axios from '~/plugins/axios'
import _ from '~/config.js'
import $ from '~/common.js';

export default {
    data(){
        return {
            tokenRefreshing: null,
        };
    },

    async mounted(){
        //Verify Myself
        const response = await $.callAPI(axios, "POST", "hongon", {});
        if (response._status != 200){
            $.clearBearerToken();
            console.log('Forced Logout');
            return this.$router.push('/login');
        }
        //Setup Token Refreshing Mechanism
        const interval = (_.bearer_token_refresh_mins || 5) * 60000;
        this.tokenRefreshing = setInterval(this.refreshBearerToken, interval);
    },

    beforeRouteLeave (to, from, next) {
        if (this.tokenRefreshing) clearInterval(this.tokenRefreshing);
        next();
    },

    methods: {
        async refreshBearerToken(){
            const response = await $.callAPI(axios, "POST", "refresh", {});
            if (response._status == 200){
                $.saveBearerToken(response.token);
                console.log('Refresh Bearer Token: Successful');
            }else{
                console.log('Refresh Bearer Token: Failed');
            }
        },
    },
}
</script>

<template>
    <div class="container">
        Placeholder Map Editing Page
    </div>
</template>