import config from '~/map.config.js';

export default {

    //Editable?
    is_editable: (state, value) => state.is_editable = !!value,

    //Screen Display
    screen_size(state){
        state.screen_width = window ? window.innerWidth : null;
        state.screen_height = window ? window.innerHeight : null;
    },
    x(state, value){
        if (Number.isFinite(value)) state.x = value;
    },
    x_step(state, value){
        if (Number.isFinite(value)) state.x += value;
    },
    y(state, value){
        if (Number.isFinite(value)) state.y = value;
    },
    y_step(state, value){
        if (Number.isFinite(value)) state.y += value;
    },
    logzoom(state, value){
        if (Number.isFinite(value)) state.logzoom = value;
    },
    logzoom_step(state, value){
        if (Number.isFinite(value)){
            const {logzoom_step_unit} = config.zoom;
            state.logzoom = Math.round((state.logzoom + value) / logzoom_step_unit) * logzoom_step_unit;
        }
    },

    //Pointer
    pointer_x(state, value){
        if (Number.isFinite(value)) state.pointer_x = value;
    },
    pointer_y(state, value){
        if (Number.isFinite(value)) state.pointer_y = value;
    },
    set_pointer(state, {x, y}){
        if (Number.isFinite(x)) state.pointer_x = x;
        if (Number.isFinite(y)) state.pointer_y = y;
    },
    clear_pointer(state){
        state.pointer_x = null;
        state.pointer_y = null;
    },

    //Dragging / Touching
    touch_initial_dist(state, value = null){
        state.touch_initial_dist = Number.isFinite(value) ? value : null;
    },
    touch_initial_logzoom(state, value = null){
        state.touch_initial_logzoom = Number.isFinite(value) ? value : null;
    },
    
    //Screen States
    is_loading: (state) => state.is_loading = true,
    not_loading: (state) => state.is_loading = false,
    is_dragging: (state) => state.is_dragging = true,
    not_dragging: (state) => state.is_dragging = false,
    is_scrolling: (state) => state.is_scrolling = true,
    not_scrolling: (state) => state.is_scrolling = false,

    //Info Panel
    info_panel(state, value){
        for (let key in value){
            if (state.info_panel[key] !== undefined){
                state.info_panel[key] = value[key];
            }
        }
    },
    info_panel_open: (state) => state.info_panel.open = true,
    info_panel_close: (state) => state.info_panel.open = false,
    info_panel_toggle: (state) => state.info_panel.open = !state.info_panel.open,

    //Selection
    selected_line(state, id){
        state.selected_type = 'line';
        state.selected_id = id;
        state.selected_index = 0;
    },
    selected_line_index(state, index){
        if (state.selected_type == 'line'){
            state.selected_index = index;
        }
    },
    selected_station(state, id){
        state.selected_type = 'station';
        state.selected_id = id;
        state.selected_index = null;
    },
    selected_clear(state){
        state.selected_type = null;
        state.selected_id = null;
        state.selected_index = null;
    },

    //Hover Tooltip
    hover_tooltip_line(state, id = null){
        state.hover_tooltip_line = id;
    },
    hover_tooltip_line_index(state, index = null){
        state.hover_tooltip_line_index = index;
    },
    hover_tooltip_station(state, id = null){
        state.hover_tooltip_station = id;
    },

    //Display
    display(state, value){
        for (let key in value){
            if (state.display[key] !== undefined){
                state.display[key] = value[key];
            }
        }
    },

    show_map_ref_images: (state, value) => state.display.show_map_ref_images = !!value,
    show_lat_long_lines: (state, value) => state.display.show_lat_long_lines = !!value,

    hide_stations: (state, value) => state.display.hidden.station = !!value,
    hide_stations_minor: (state, value) => state.display.hidden.station_minor = !!value,
    hide_stations_not_in_use: (state, value) => state.display.hidden.station_not_in_use = !!value,
    hide_stations_signal_only: (state, value) => state.display.hidden.station_signal_only = !!value,
    hide_stations_label: (state, value) => state.display.hidden.station_label = !!value,
    hide_stations_label_minor: (state, value) => state.display.hidden.station_label_minor = !!value,
    lock_stations: (state, value) => state.display.lock_stations = !!value,

    map_ref_images_transparency: (state, value) => state.display.map_ref_images_transparency = value,
    rail_line_color: (state, value) => state.display.rail_line_color = value,

    hidden(state, value){
        for (let key in value){
            if (state.display.hidden[key] !== undefined){
                state.display.hidden[key] = value[key];
            }
        }
    },

    hidden_line_types: (state, value) => state.display.hidden.line_types = Array.isArray(value) ? value : [],
    hidden_lines: (state, value) => state.display.hidden_lines = Array.isArray(value) ? value : [],
    hidden_operator_types: (state, value) => state.display.hidden_operator_types = Array.isArray(value) ? value : [],
    hidden_operators: (state, value) => state.display.hidden_operators = Array.isArray(value) ? value : [],

    //Data Sending
    send_data_to_panel(state, payload){
        state.send_data.trigger_panel++;
        state.send_data.payload = payload;
    },
    send_data_to_map(state, payload){
        state.send_data.trigger_map++;
        state.send_data.payload = payload;
    },

    //Toast
    toast_danger(state, content){
        state.toast.content = content;
        state.toast.variant = 'danger';
        state.toast.trigger++;
    },
    toast_success(state, content){
        state.toast.content = content;
        state.toast.variant = 'success';
        state.toast.trigger++;
    },

};