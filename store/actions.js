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

}