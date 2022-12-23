<script>
import MapMain from '~/components/map-main.vue';

export default {
    data(){
        return {
            authPassed: false,
            tokenRefreshing: null,
        };
    },

    async mounted(){
        //Verify Myself
        const response = await this.$POST("hongon", {});
        if (response._status != 200){
            this.$clearBearerToken();
            console.log('Forced Logout');
            return this.$router.push('/login');
        }
        this.authPassed = true;
        //Setup Token Refreshing Mechanism
        const interval = (this.$config.bearer_token_refresh_mins || 5) * 60000;
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
                this.$saveBearerToken(response.token);
                console.log('Refresh Bearer Token: Successful');
            }else{
                console.log('Refresh Bearer Token: Failed');
            }
        },
    },
}
</script>

<template>
    <MapMain editable v-if="authPassed" />
</template>