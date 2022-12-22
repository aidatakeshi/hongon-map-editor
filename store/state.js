import config from '~/config.js';

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
    
    //Screen States
    is_loading: false,
    is_dragging: false,
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
        show_stations: true,
        show_stations_minor: true,
        show_stations_not_in_use: true,
        show_stations_signal_only: true,
        lock_stations: false,
        line_color: "line_type",
        hidden: {
            line_type: [],
            line: [],
            operator_type: [],
            operator: [],
        },
    },

});