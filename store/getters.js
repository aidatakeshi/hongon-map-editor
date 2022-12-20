const config_map = require('~/config.js').default.map;

export default {
    
    //Screen Display
    km_per_lat_deg: () => config_map.earth_radius_km * Math.PI / 180,
    px_per_km: (state) => 10 ** state.logzoom,
    px_per_lat_deg: (state, getters) => getters.km_per_lat_deg * getters.px_per_km,
    px_per_long_deg: (state, getters) => getters.km_per_lat_deg * getters.px_per_km * Math.cos(state.y * Math.PI / 180),

    x_left: (state, getters) => state.x - state.screen_width / 2 / getters.px_per_long_deg,
    x_right: (state, getters) => state.x + state.screen_width / 2 / getters.px_per_long_deg,
    y_bottom: (state, getters) => state.y - state.screen_height / 2 / getters.px_per_lat_deg,
    y_top: (state, getters) => state.y + state.screen_height / 2 / getters.px_per_lat_deg,

    logzoom_min: (state, getters) => Math.log10(state.screen_height / (config_map.latitude_min + config_map.latitude_max)),

    //Selection
    is_station_selected: (state) => state.selected.type === 'station',
    is_line_selected: (state) => state.selected.type === 'line',

};