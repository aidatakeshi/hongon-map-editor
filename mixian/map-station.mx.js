const UuidEncoder = require('uuid-encoder');
const encoder = new UuidEncoder('base36');

export default {
    methods: {

        getStationBase36Code(station){
            return  encoder.encode(station.id).substr(0, 6).toUpperCase();
        },

    },
}