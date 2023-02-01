<script>

export default {

    props: {
        value: String,
        size: String,
        disabled: Boolean,
        nullable: Boolean,
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
        options(){
            let options = this.$store.state.data.region_group.map(group => ({
                label: group.name_chi,
                options: this.$store.state.data.region.filter(region => region.region_group_id === group.id).map(region => ({
                    value: region.id,
                    text: `${region.name_chi}${region.name_suffix_chi}`,
                })),
            }));
            if (this.nullable){
                options.unshift({value: null, text: '[不設定]'});
            }else{
                options.unshift({value: null, text: '[請選擇]', disabled: true});
            }
            return options;
        },
    },

}

</script>

<template>
    <b-form-select v-model="value" :options="options" @input="$emit('input', value)"
        :size="size" :disabled="disabled"
    />
</template>