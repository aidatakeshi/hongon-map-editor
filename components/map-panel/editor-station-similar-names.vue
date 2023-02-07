<script>

export default {
    props: {
        keyword: String,
    },

    components: {

    },

    data(){
        return {
            isLoading: false,
            isLoaded: false,
            data: [],
        };
    },

    async mounted(){
        this.load();
    },

    methods: {
        async load(){
            this.isLoaded = false;
            if (this.keyword.length < 2) return false;
            this.isLoading = true;
            const response = await this.$GET(`hongon/station--name-similar`, {
                keyword: this.keyword,
            }, false);
            this.isLoading = false;
            if (response._status != 200) return false;
            this.data = response.data;
            this.isLoaded = true;
        },
    },

    computed: {
        data_filtered(){
            return this.data.filter(item => item.id !== this.$store.state.selected_id);
        },
    },

    watch: {
        keyword(){
            this.load();
        },
    },
}
</script>

<template>
    <div>
        <!-- Loading -->
        <div class="text-center py-1" v-if="isLoading">
            <b-spinner variant="secondary" small />
        </div>
        <!-- Result -->
        <b-card class="similar-names my-2" body-class="p-2" v-if="isLoaded && data_filtered.length">
            <strong>相似名稱的車站：</strong>
            <ol class="mb-0 pl-4">
                <li v-for="(item, i) in data_filtered" :key="i">
                    <span :class="item.name_chi == keyword ? 'highlighted' : ''">
                        {{item.name_chi}}
                    </span>
                    <span>/</span>
                    <span :class="item.name_eng == keyword ? 'highlighted' : ''">
                        {{item.name_eng}}
                    </span>
                    <small>({{item.region.name_chi}} / {{item.major_operator.name_chi}})</small>
                </li>
            </ol>
        </b-card>
    </div>
</template>

<style scoped>
.similar-names{
    font-weight: normal;
}
.similar-names .highlighted{
    color: red;
    font-weight: bold;
}

</style>