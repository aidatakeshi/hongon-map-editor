<script>
export default {
    async mounted(){
        const response = await this.$POST("invalidate");
        this.$clearBearerToken();
        console.log('Logout: Done');
        return this.$router.push('/login');
    },
}
</script>

<template>
    <div>
    </div>
</template>