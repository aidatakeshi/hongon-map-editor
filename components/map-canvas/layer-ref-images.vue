<script>
import map_calc_screen_mx from '~/mixian/map-calc-screen.mx.js';

export default {
    props: {
    },

    mixins: [
        map_calc_screen_mx,
    ],

    components: {
        
    },

    methods: {
    },

    computed: {
    },

    watch: {
    },
}
</script>

<template>
    <v-layer v-if="$store.state.display.show_map_ref_images" :config="{
        opacity: $store.state.display.map_ref_images_transparency,
    }">
        <MapCanvasRefImage v-for="data in $store.state.data.ref_image" :key="data.id"
            :screen-x="getScreenX(data.x_min)" :screen-w="getScreenWidth(data.x_min, data.x_max)"
            :screen-y="getScreenY(data.y_max)" :screen-h="getScreenHeight(data.y_min, data.y_max)"
            :url="data.file_url" :id="data.id"
        />
    </v-layer>
</template>