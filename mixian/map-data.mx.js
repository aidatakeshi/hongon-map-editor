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
                const data = await this.getItemsOfType(type);
                //If Error Encountered...
                if (!data) return false;
            }
            console.log(`%c Loading Data: [Done]`, 'color: lime;');
            //Finish Loading
            this.$store.commit('not_loading');
        },

        async getItemsOfType(type){ //Return data or false
            if (!dataTypes[type]) return false;
            //Call Get API
            const response = await this.$GET(`hongon/${dataTypes[type]}`, {
                params: paramsByType[type],
            }, false);
            if (response._status !== 200) return false;
            //Update Store Data
            console.log(`%c Loading Data: [type: ${dataTypes[type]}]`, 'color: lime;');
            this.$store.commit(`data/${type}`, response.data);
            return response.data;
        },

        async getItemData(type, id){ //Return data or false
            if (!dataTypes[type]) return false;
            //Call Get API
            const response = await this.$GET(`hongon/${dataTypes[type]}/${id}`, {
                params: paramsByType[type],
            }, false);
            if (response._status !== 200) return false;
            //Return data
            console.log(`%c Loading Data: [type: ${dataTypes[type]}] [id: ${id}]`, 'color: lime;');
            return response.data;

        },

        async updateItem(type, id, data){ //Return isSuccess
            if (!dataTypes[type]) return false;
            //Call Patch API
            const response = await this.$PATCH(`hongon/${dataTypes[type]}/${id}`, data);
            if (response._status !== 200) return false;
            //Update Store Data
            console.log(`%c Saving Data: [type: ${dataTypes[type]}] [id: ${id}]`, 'color: lime;');
            this.$store.commit(`data/${type}`, {id, ...data});
            return true;
        },

        async newStoreData(type, data){ //Return data or false

        },

        async removeStoreData(type, id){ //Return isSuccess

        },

    },
}