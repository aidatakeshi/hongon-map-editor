export default {

    //Screen Display
    screen_width(state){
        state.screen_width = window ? window.innerWidth : null;
    },
    screen_height(state){
        state.screen_height = window ? window.innerHeight : null;
    },
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
        if (Number.isFinite(value)) state.logzoom += value;
    },
    cursor_x(state, value){
        if (Number.isFinite(value)) state.cursor_x = value;
    },
    cursor_y(state, value){
        if (Number.isFinite(value)) state.cursor_y = value;
    },
    set_cursor(state, {x, y}){
        if (Number.isFinite(x)) state.cursor_x = x;
        if (Number.isFinite(y)) state.cursor_y = y;
    },
    clear_cursor(state){
        state.cursor_x = null;
        state.cursor_y = null;
    },
    
    //Screen States
    is_loading: (state) => state.is_loading = true,
    not_loading: (state) => state.not_loading = true,
    is_dragging: (state) => state.is_dragging = true,
    not_dragging: (state) => state.not_dragging = true,
    info_panel_open: (state) => state.info_panel_open = true,
    info_panel_close: (state) => state.info_panel_open = false,
    info_panel_toggle: (state) => state.info_panel_open = !state.info_panel_open,

    //Selection
    selected(state, value){
        for (let key in value){
            if (state.selected[key] !== undefined){
                state.selected[key] = value[key];
            }
        }
    },

    selected_type: (state, value) => state.selected.type = value,
    selected_id: (state, value) => state.selected.id = value,
    selected_part: (state, value) => state.selected.part = value,
    selected_interstation: (state, value) => state.selected.interstation = value,
    selected_segment: (state, value) => state.selected.segment = value,
    selected_position: (state, value) => state.selected.position = value,

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
    show_stations: (state, value) => state.display.show_stations = !!value,
    show_stations_minor: (state, value) => state.display.show_stations_minor = !!value,
    show_stations_not_in_use: (state, value) => state.display.show_stations_not_in_use = !!value,
    show_stations_signal_only: (state, value) => state.display.show_stations_signal_only = !!value,
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

};