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
        width: 7000, height: 5000,
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

    //Lat / Long Lines
    lat_long: {
        line: {
            stroke: '#304968', strokeWidth: 1,
            opacity: 0.3,
        },
        label: {
            fill: '#304968',
            fontSize: 10,
            opacity: 0.6,
            x_shift: 2, y_shift: 2,
        },
    },

    //Map Scale
    scale: {
        width_max: 190,
        height: 8,
        x_shift: 12, y_shift: 12,
        line: {
            stroke: 'black',
            strokeWidth: 2,
            opacity: 0.8,
        },
        label: {
            fill: 'black',
            fontStyle: 'bold',
            fontSize: 10,
            opacity: 0.8,
            y_shift: 20,
        },
    },

    //Line
    line: {
        byType: {
            //Major Line
            "3": {
                lineWidth: {px: 6, km: 0.2},
                decoration: {
                    width: {px: 3, km: 0.1},
                    color: 'rgba(255, 255, 255, 0.8)',
                    dash: {px: 9, km: 0.3},
                },
            },
            //Default Line
            "default": {
                lineWidth: {px: 4, km: 0.1},
                decoration: {
                    width: {px: 2, km: 0.05},
                    color: 'rgba(255, 255, 255, 0.8)',
                    dash: {px: 6, km: 0.15},
                },
            },
            //Minor Line
            "1": {
                lineWidth: {px: 2, km: 0.05},
                decoration: null,
            },
        },
    },

};