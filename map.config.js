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
        save_ls_after_scroll: 500, //In ms
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

    //Station
    station: {
        major: {
            size: {px: 8, km: 0.32},
            strokeWidth: {px: 2, km: 0.08},
            hideBelowLogzoom: 0.6,
            hideLabelBelowLogzoom: 0.8,
        },
        minor: {
            size: {px: 6, km: 0.24},
            strokeWidth: {px: 1.5, km: 0.06},
            hideBelowLogzoom: 1,
            hideLabelBelowLogzoom: 1.2,
        },
        signal: {
            isDiamond: true,
            size: {px: 5, km: 0.2},
            strokeWidth: {px: 1.5, km: 0.06},
            hideBelowLogzoom: 1,
            hideLabelBelowLogzoom: 1.2,
        },
        in_use: {
            stroke: 'black',
            fill: 'white',
        },
        not_in_use: {
            stroke: '#666',
            fill: '#ccc',
        },
    },

    //Line
    line: {
        defaultType: "2",
        byType: {
            //Major Line
            "3": {
                name: "Major",
                lineWidth: {px: 6, km: 0.2},
                decoration: {
                    width: {px: 3, km: 0.1},
                    color: 'rgba(255, 255, 255, 0.8)',
                    dash: {px: 9, km: 0.3},
                },
                defaultDisplayLineColor: true,
                hideSegments: false,
                hideSegmentsMoving: false,
                hideBezier: false,
                hideBezierMoving: true,
            },
            //Default Line
            "2": {
                name: "Default",
                lineWidth: {px: 4, km: 0.1},
                decoration: {
                    width: {px: 2, km: 0.05},
                    color: 'rgba(255, 255, 255, 0.8)',
                    dash: {px: 6, km: 0.15},
                },
                defaultDisplayLineColor: false,
                hideSegments: false,
                hideSegmentsMoving: true,
                hideBezier: 0.7, //Below this logzoom
                hideBezierMoving: true,
            },
            //Minor Line
            "1": {
                name: "Minor",
                lineWidth: {px: 2, km: 0.05},
                decoration: null,
                defaultDisplayLineColor: false,
                hideSegments: false,
                hideSegmentsMoving: true,
                hideBezier: 1.0, //Below this logzoom
                hideBezierMoving: true,
            },
        },
    },

};