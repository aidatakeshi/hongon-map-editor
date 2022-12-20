import axios from '~/plugins/axios';
import $ from '~/common.js';

export default {

    async get_LS({ state, commit }) {
        if (!localStorage) return false;
        console.log('LocalStorage: Getting Data');
        //Numeric
        for (let attr of ['x', 'y', 'logzoom']){
            const value = localStorage.getItem(attr);
            if (value !== null && isFinite(value)){
                commit(attr, parseFloat(value));
            }
        }
        //"display" JSON
        const value = localStorage.getItem('display');
        try{
            const value_parsed = JSON.parse(value);
            commit('display', value_parsed);
        }catch(error){}
    },

    async set_LS_xyzoom({ state, commit }) {
        if (!localStorage) return false;
        console.log('LocalStorage: Saving x/y/zoom Data');
        for (let attr of ['x', 'y', 'logzoom']){
            localStorage.setItem(attr, state[attr]);
        }
    },

    async set_LS_display({ state, commit }) {
        if (!localStorage) return false;
        console.log('LocalStorage: Saving display Data');
        localStorage.setItem('display', JSON.stringify(state.display));
    },
    
    async get_data_region({ state, commit }) {
        //Region Broader
        console.log("Data: Getting RegionBroader Items");
        const response1 = await $.callAPI(axios, "GET", "hongon/region-broader", {});
        if (response1._status == 200){
            commit('regions_broader', response1.data);
        }
        //Region
        console.log("Data: Getting Region Items");
        const response2 = await $.callAPI(axios, "GET", "hongon/region", {});
        if (response2._status == 200){
            commit('regions', response2.data);
        }
    },

    async get_data_ref_image({ state, commit }) {
        console.log("Data: Getting RefImage Items");
        const response1 = await $.callAPI(axios, "GET", "hongon/ref-image", {});
        if (response1._status == 200){
            commit('ref_image', response1.data);
        }
    },

    async get_data_line({ state, commit }) {
        //Line Type
        console.log("Data: Getting LineType Items");
        const response1 = await $.callAPI(axios, "GET", "hongon/line-type", {});
        if (response1._status == 200){
            commit('line_types', response1.data);
        }
        //Line
        console.log("Data: Getting Line Items");
        const response2 = await $.callAPI(axios, "GET", "hongon/line", {});
        if (response2._status == 200){
            commit('lines', response2.data);
        }
        //Line Section
        console.log("Data: Getting LineSection Items");
        const response3 = await $.callAPI(axios, "GET", "hongon/line-section", {});
        if (response3._status == 200){
            commit('line_sections', response3.data);
        }
    },

    async get_data_station({ state, commit }) {
        console.log("Data: Getting Station Items");
        const response1 = await $.callAPI(axios, "GET", "hongon/station", {});
        if (response1._status == 200){
            commit('stations', response1.data);
        }
    },



}