export default {

    //API Base URL
    API_URL: "http://hongon.rapidtra.in/api",

    //Bearer Token Refresh Interval (minutes)
    bearer_token_refresh_mins: 1,

    //Map Settings (This part is required in common.js)
    map: {
        earth_radius_km: 6371.0088,
        latitude_min: +32,
        latitude_max: +41,
        longitude_min: +150.162783813,
        longitude_max: +165.837216187,
    },
    
    //Basemap
    basemap: {
        src: "/storage/app/media/hongon-base-map.svg",
        width: 7000,
        height: 5000,
    },

    //Map Zomming
    zoom: {
        logzoom_max: 2, //log10(pixels/km)
        logzoom_default: 0,
        logzoom_step_scroll: 0.1,
        logzoom_step_button: 0.2,
        logzoom_step_unit: 0.1,
        save_ls_after_scroll: 1000, //In ms
    },

};