<script>
import axios from '~/plugins/axios';
import $ from '~/common.js';

import MapCanvasMain from './map-canvas/main.vue';

export default {
    props: {
        editable: { type: Boolean, default: false },
    },

    components: {
        MapCanvasMain,
    },
}
</script>

<template>
    <div class="map-wrapper">
        <!-- Canvas -->
        <MapCanvasMain :editable="editable" />

        <!-- Panel -->
        <div style="position: absolute; left: 0; top: 0; background-color: white;">Dummy</div>

        <!-- Menu -->

        
    </div>
</template>