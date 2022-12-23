<script>

export default {
    props: {
        id: String,
        url: String,
        screenX: Number,
        screenY: Number,
        screenW: Number,
        screenH: Number,
    },

    data(){
        return {
            image: null,
        };
    },

    async mounted(){
        this.loadImage();
    },

    methods: {
        loadImage(){
            const myImage = new Image();
            myImage.src = this.url;
            myImage.onload = function(){
                this.image = myImage;
                console.log(`%c Ref Image Loaded: id=${this.id} url=${this.url}`, 'color: pink;');
            }.bind(this);
        },
    },

    computed: {
    },

    watch: {
        url(){
            if (url) this.loadImage();
        },
    },
}
</script>

<template>
    <v-image :config="{
        image: image,
        x: screenX, y: screenY, width: screenW, height: screenH,
        listening: false,
    }" v-if="image" />
</template>