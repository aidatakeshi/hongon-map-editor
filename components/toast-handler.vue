<script>

export default {

    computed: {
        trigger(){
            return this.$store.state.toast.trigger;
        },
    },

    watch: {
        trigger(){
            const {content, variant} = this.$store.state.toast;
            this.$bvToast.toast(content, {
                variant: variant || 'info',
                noCloseButton: true,
                autoHideDelay: 3000,
            });
        },
    },
}
</script>

<template>
    <div>
    </div>
</template>