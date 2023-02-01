const dataTypes = {
    'ref_image': 'ref-image',
    'operator_type': 'operator-type',
    'operator': 'operator',
    'region_group': 'region-group',
    'region': 'region',
    'line_type': 'line-type',
    'line': 'line',
    'station': 'station',
};
const paramsByType = {
    'line': 'segments',
};

export default {
    methods: {

        async initializeData(){
            //Set Loading
            this.$store.commit('is_loading');
            //For Each Type
            for (let type in dataTypes){
                console.log(`%c Loading Data: ${dataTypes[type]}`, 'color: lime;');
                const response = await this.getDataOfType(type);
                //If Error Encountered...
                if (response._status !== 200){
                    return false;
                }
            }
            console.log(`%c Loading Data Done.`, 'color: lime;');
            //Finish Loading
            this.$store.commit('not_loading');
        },

        async getDataOfType(type){
            if (!dataTypes[type]) return false;
            const response = await this.$GET(`hongon/${dataTypes[type]}`, {
                params: paramsByType[type],
            }, false);
            this.$store.commit(`data/${type}`, response.data);
            return response;
        },

        updateStoreData(type, id, data){

        },

        newStoreData(type, data){

        },

        removeStoreData(type, id){

        },

    },
}