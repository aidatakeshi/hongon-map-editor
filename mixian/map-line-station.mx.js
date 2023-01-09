const UuidEncoder = require('uuid-encoder');
const encoder = new UuidEncoder('base36');

export default {
    methods: {

        getStationByID(station_id){
            return this.$store.state.data.station.filter(item => item.id == station_id)[0];
        },

        getLineSectionByID(line_section_id){
            return this.$store.state.data.line_section.filter(item => item.id == line_section_id)[0];
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

        getLineSectionsOfStation(station_id){
            let lines_of_station = [];
            const line_sections = this.$store.state.data.line_section;
            for (let line_section of line_sections){
                //Check station
                let hasStation = false;
                for (let station of line_section.stations){
                    if (station.station_id == station_id){
                        hasStation = true;
                        break;
                    }
                }
                if (!hasStation) continue;
                //Get Line
                const line = this.$store.state.data.line.filter(item => item.id == line_section.line_id)[0];
                if (!line) continue;
                const line_type = this.$store.state.data.line_type.filter(item => item.id == line.line_type_id)[0];
                if (!line_type) continue;
                //Push Item to Array
                let item = {
                    ...line_section,
                    line,
                    sort: line_type.sort,
                };
                delete item.stations;
                lines_of_station.push(item);
            }
            //Order by sort, sort_in_line
            lines_of_station.sort((a, b) => {
                if (a.sort < b.sort) return -1;
                if (a.sort > b.sort) return +1;
                if (a.sort_in_line < b.sort_in_line) return -1;
                if (a.sort_in_line > b.sort_in_line) return +1;
                return 0;
            })
            //Return Array
            return lines_of_station;
        },

    },
}