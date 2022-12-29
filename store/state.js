import config from '~/map.config.js';

export default () => ({

    //Editable?
    is_editable: false,

    //Screen Display
    screen_width: window ? window.innerWidth : null,
    screen_height: window ? window.innerHeight : null,
    x: (config.map.longitude_min + config.map.longitude_max) / 2,
    y: (config.map.latitude_min + config.map.latitude_max) / 2,
    logzoom: config.zoom.logzoom_default,

    //Pointer
    pointer_x: null,
    pointer_y: null,

    //Dragging / Touching
    touch_initial_dist: null,
    touch_initial_logzoom: null,
    
    //Screen States
    is_loading: false,
    is_dragging: false,
    is_scrolling: false,
    info_panel_open: false,

    //Selection
    selected_type: null,
    selected_id: null,

    //Hover Tooltip
    hover_tooltip_line_section: null,
    hover_tooltip_station: null,

    //Display
    display: {
        show_map_ref_images: true,
        map_ref_images_transparency: 0.5,
        show_lat_long_lines: true,
        lock_stations: false,
        line_color: "default",
        hidden: {
            station: false,
            station_minor: false,
            station_not_in_use: false,
            station_signal_only: false,
            station_label: false,
            station_label_minor: false,
            line_type: [],
            line: [],
            line_section: [],
            operator_type: [],
            operator: [],
        },
    },

});