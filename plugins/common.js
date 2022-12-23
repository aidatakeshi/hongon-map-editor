import Vue from 'vue';
import axios from 'axios';
import config from '~/map.config.js';

const myAxios = axios.create({
    baseURL: config.API_URL,
});

function getBearerToken(omitBearer = false){
    if (!localStorage) return false;
    var bearer = (omitBearer) ? '' : 'Bearer ';
    var token = localStorage.getItem('access_token');
    return (token == null) ? '' : (bearer + token);
};

function saveBearerToken(token){
    if (!localStorage) return false;
    localStorage.setItem('access_token', token);
};

function clearBearerToken(){
    if (!localStorage) return false;
    localStorage.removeItem('access_token');
};

async function callAPI(method, route, data = {}, useBearer = true){
    //Try Calling API
    try {
        var options = {};
        if (useBearer) options.headers = {'Authorization': getBearerToken()};
        //GET Request -> query
        switch (method.toUpperCase()){
            case 'GET':
                var response = await myAxios.get(route, {params: data, ...options});
            break;
            //DELETE Request -> query
            case 'DELETE':
                var response = await myAxios.delete(route, {params: data, ...options});
            break;
            //POST Request -> body
            case 'POST':
                var response = await myAxios.post(route, data, options);
            break;
            //PUT Request -> body
            case 'PUT':
                var response = await myAxios.put(route, data, options);
            break;
            //PATCH Request -> body
            case 'PATCH':
                var response = await myAxios.patch(route, data, options);
            break;
        }
    }
    //Encountering Error
    catch (error){
        if (error.response){
            //Return Error Data
            return { _status: error.response.status, ...(error.response.data || {}) };
        }else{
            //No Response Error
            return { _status: null };
        }
    }
    //If No Error...
    return { _status: response.status, ...(response.data || {}) };
}

async function callAPI_get(route, data = {}, useBearer = true){
    return await callAPI('GET', route, data, useBearer);
}

async function callAPI_put(route, data = {}, useBearer = true){
    return await callAPI('PUT', route, data, useBearer);
}

async function callAPI_patch(route, data = {}, useBearer = true){
    return await callAPI('PATCH', route, data, useBearer);
}

async function callAPI_delete(route, data = {}, useBearer = true){
    return await callAPI('DELETE', route, data, useBearer);
}

async function callAPI_post(route, data = {}, useBearer = true){
    return await callAPI('POST', route, data, useBearer);
}

export default ({ app }, inject) => {

    inject('getBearerToken', Vue.observable(getBearerToken));
    inject('saveBearerToken', Vue.observable(saveBearerToken));
    inject('clearBearerToken', Vue.observable(clearBearerToken));

    inject('GET', Vue.observable(callAPI_get));
    inject('PUT', Vue.observable(callAPI_put));
    inject('PATCH', Vue.observable(callAPI_patch));
    inject('DELETE', Vue.observable(callAPI_delete));
    inject('POST', Vue.observable(callAPI_post));

}