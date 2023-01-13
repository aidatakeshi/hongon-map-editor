const UuidEncoder = require('uuid-encoder');
const encoder = new UuidEncoder('base36');

export default {
    methods: {

        getStationByID(station_id){
            return this.$store.state.data.station.filter(item => item.id == station_id)[0];
        },

        getLineByID(line_id){
            return this.$store.state.data.line.filter(item => item.id == line_id)[0];
        },

        getOperatorByID(operator_id){
            return this.$store.state.data.operator.filter(item => item.id == operator_id)[0];
        },

        getRegionByID(region_id){
            return this.$store.state.data.region.filter(item => item.id == region_id)[0];
        },

        getStationBase36Code(station_id){
            return encoder.encode(station_id).substr(0, 6).toUpperCase();
        },

        //Fields: -sections, -_data, +sectionIndex, +display_chi, +display_eng, +sort
        getLinesOfStation(station_id){
            let lines_of_station = [];
            const lines = this.$store.state.data.line;
            //For each line
            for (let line of lines){
                //Check each section
                for (let sectionIndex in line.sections){
                    const section = line.sections[sectionIndex];
                    let hasStation = false;
                    for (let station of section.stations){
                        if (station.station_id == station_id){
                            hasStation = true;
                            break;
                        }
                    }
                    if (!hasStation) continue;
                    //If has station...
                    //Get Line
                    const line_type = this.$store.state.data.line_type.filter(item => item.id == line.line_type_id)[0];
                    if (!line_type) continue;
                    //Push Item to Array
                    const display_chi = line.name_chi + (section.name_chi ? ` (${section.name_chi})` : "");
                    const display_eng = line.name_eng + (section.name_eng ? ` (${section.name_eng})` : "");
                    let item = {
                        ...line,
                        display_chi,
                        display_eng,
                        sectionIndex,
                        sort: line_type.sort,
                    };
                    delete item.sections;
                    delete item._data;
                    lines_of_station.push(item);
                }
            }
            //Order by sort, sort_in_line
            lines_of_station.sort((a, b) => {
                if (a.sort < b.sort) return -1;
                if (a.sort > b.sort) return +1;
                return 0;
            })
            //Return Array
            return lines_of_station;
        },

    },
}