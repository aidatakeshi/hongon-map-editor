export default {

    regions_broader(state, value_arr){
        if (Array.isArray(value_arr)) state.region_broader = value_arr;
    },
    region_broader(state, value_obj){
        if (value_obj.id) state.region_broader[value_obj.id] = value_obj;
    },
    regions(state, value_arr){
        if (Array.isArray(value_arr)) state.region = value_arr;
    },
    region(state, value_obj){
        if (value_obj.id) state.region[value_obj.id] = value_obj;
    },
    ref_images(state, value_arr){
        if (Array.isArray(value_arr)) state.ref_image = value_arr;
    },
    ref_image(state, value_obj){
        if (value_obj.id) state.ref_image[value_obj.id] = value_obj;
    },
    line_types(state, value_arr){
        if (Array.isArray(value_arr)) state.line_type = value_arr;
    },
    line_type(state, value_obj){
        if (value_obj.id) state.line_type[value_obj.id] = value_obj;
    },
    lines(state, value_arr){
        if (Array.isArray(value_arr)) state.line = value_arr;
    },
    line(state, value_obj){
        if (value_obj.id) state.line[value_obj.id] = value_obj;
    },
    line_sections(state, value_arr){
        if (Array.isArray(value_arr)) state.line_section = value_arr;
    },
    line_section(state, value_obj){
        if (value_obj.id) state.line_section[value_obj.id] = value_obj;
    },
    stations(state, value_arr){
        if (Array.isArray(value_arr)) state.station = value_arr;
    },
    station(state, value_obj){
        if (value_obj.id) state.station[value_obj.id] = value_obj;
    },

};