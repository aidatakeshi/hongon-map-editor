import config from '~/config.js';

export default {
    
    //Screen Display
    latitude_span: () => (config.map.latitude_max - config.map.latitude_min),
    longitude_span: () => (config.map.longitude_max - config.map.longitude_min),
    latitude_mid: () => (config.map.latitude_max + config.map.latitude_min) / 2,
    longitude_mid: () => (config.map.longitude_max + config.map.longitude_min) / 2,
    
    km_per_lat_deg: () => (config.map.earth_radius_km * Math.PI / 180),
    km_per_long_deg: (state, getters) => getters.km_per_lat_deg * Math.cos(state.y * Math.PI / 180),

    px_per_km: (state, getters) => 10 ** state.logzoom,
    px_per_lat_deg: (state, getters) => getters.km_per_lat_deg * getters.px_per_km,
    px_per_long_deg: (state, getters) => getters.km_per_long_deg * getters.px_per_km,

    x_left: (state, getters) => state.x - state.screen_width / 2 / getters.px_per_long_deg,
    x_right: (state, getters) => state.x + state.screen_width / 2 / getters.px_per_long_deg,
    y_bottom: (state, getters) => state.y - state.screen_height / 2 / getters.px_per_lat_deg,
    y_top: (state, getters) => state.y + state.screen_height / 2 / getters.px_per_lat_deg,

    logzoom_min: (state, getters) => Math.log10(state.screen_height / (config.map.latitude_min + config.map.latitude_max)),

    //Selection
    is_station_selected: (state) => state.selected.type === 'station',
    is_line_selected: (state) => state.selected.type === 'line',

};