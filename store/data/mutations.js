

export default {

    region_broader(state, value_arr){
        if (Array.isArray(value_arr)) state.region_broader = value_arr;
    },
    region(state, value_arr){
        if (Array.isArray(value_arr)) state.region = value_arr;
    },
    ref_image(state, value_arr){
        if (Array.isArray(value_arr)) state.ref_image = value_arr;
    },
    line_type(state, value_arr){
        if (Array.isArray(value_arr)) state.line_type = value_arr;
    },
    line(state, value_arr){
        if (Array.isArray(value_arr)) state.line = value_arr;
    },
    line_section(state, value_arr){
        if (Array.isArray(value_arr)) state.line_section = value_arr;
    },
    station(state, value_arr){
        if (Array.isArray(value_arr)) state.station = value_arr;
    },
    operator_type(state, value_arr){
        if (Array.isArray(value_arr)) state.operator_type = value_arr;
    },
    operator(state, value_arr){
        if (Array.isArray(value_arr)) state.operator = value_arr;
    },

};