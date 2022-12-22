/**
 * Bearer Token
 */
exports.saveBearerToken = function(token){
    if (!localStorage) return false;
    localStorage.setItem('access_token', token);
};

exports.clearBearerToken = function(){
    if (!localStorage) return false;
    localStorage.removeItem('access_token');
};    

exports.getBearerToken = function(omitBearer = false){
    if (!localStorage) return false;
    var bearer = (omitBearer) ? '' : 'Bearer ';
    var token = localStorage.getItem('access_token');
    return (token == null) ? '' : (bearer + token);
};

/**
 * API Call
 */
async function callAPI(unused, APIMethod, APIRoute, data = {}, tokenRequired = true){
    //Try Calling API
    try {
        var options = {};
        if (tokenRequired) options.headers = {'Authorization': exports.getBearerToken()};
        //GET Request -> query
        switch (APIMethod.toUpperCase()){
            case 'GET':
                var response = await axios.get(APIRoute, {params: data, ...options});
            break;
            //DELETE Request -> query
            case 'DELETE':
                var response = await axios.delete(APIRoute, {params: data, ...options});
            break;
            //POST Request -> body
            case 'POST':
                var response = await axios.post(APIRoute, data, options);
            break;
            //PUT Request -> body
            case 'PUT':
                var response = await axios.put(APIRoute, data, options);
            break;
            //PATCH Request -> body
            case 'PATCH':
                var response = await axios.patch(APIRoute, data, options);
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
exports.callAPI = callAPI;