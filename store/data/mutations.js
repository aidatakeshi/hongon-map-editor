const handleData = function(state, type, payload){
    if (Array.isArray(payload)){
        //Update all items mode
        state[type] = payload;
        
    }else if (typeof payload === 'object'){
        if (!payload.id){
            //Insert item mode

        }else if (!payload._delete){
            //Update item mode
            for (let i in state[type]){
                if (state[type][i].id === payload.id){
                    for (let attr in state[type][i]){
                        if (payload[attr] !== undefined) state[type][i][attr] = payload[attr];
                    }
                    break;
                }
            }

        }else{
            //Remove item mode

        }
    }
}

export default {

    region_group(state, payload){
        handleData(state, 'region_group', payload);
    },
    region(state, payload){
        handleData(state, 'region', payload);
    },
    ref_image(state, payload){
        handleData(state, 'ref_image', payload);
    },
    line_type(state, payload){
        handleData(state, 'line_type', payload);
    },
    line(state, payload){
        handleData(state, 'line', payload);
    },
    station(state, payload){
        handleData(state, 'station', payload);
    },
    operator_type(state, payload){
        handleData(state, 'operator_type', payload);
    },
    operator(state, payload){
        handleData(state, 'operator', payload);
    },

};