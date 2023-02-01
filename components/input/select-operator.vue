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
            let options = this.$store.state.data.operator_type.map(type => ({
                label: type.name_chi,
                options: this.$store.state.data.operator.filter(operator => operator.operator_type_id === type.id).map(operator => ({
                    value: operator.id,
                    text: `${operator.name_chi}`,
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