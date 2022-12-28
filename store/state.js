import config from '~/map.config.js';

export default () => ({

    //Screen Display
    screen_width: window ? window.innerWidth : null,
    screen_height: window ? window.innerHeight : null,
    x: (config.map.longitude_min + config.map.longitude_max) / 2,
    y: (config.map.latitude_min + config.map.latitude_max) / 2,
    logzoom: config.zoom.logzoom_default,

    //Cursor
    cursor_x: null,
    cursor_y: null,

    //Dragging / Touching
    touch_initial_dist: null,
    touch_initial_logzoom: null,
    
    //Screen States
    is_loading: false,
    is_dragging: false,
    is_scrolling: false,
    info_panel_open: false,

    //Selection
    selected: {
        type: null,
        id: null,
        part: null,
        interstation: null,
        segment: null,
        position: null,
    },

    //Display
    display: {
        show_map_ref_images: true,
        map_ref_images_transparency: 0.5,
        show_lat_long_lines: true,
        lock_stations: false,
        line_color: "default",
        hidden: {
            station: {
                all: false,
                minor: false,
                not_in_use: false,
                signal_only: false,
            },
            line_type: [],
            line: [],
            line_section: [],
            operator_type: [],
            operator: [],
        },
    },

});