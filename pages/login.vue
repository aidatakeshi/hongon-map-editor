<script>
export default {
    data(){
        return {
            email: null,
            password: null,
            wrong_credentials: false,
        };
    },
    async mounted(){
        //If already logged in -> push to /edit
        if (this.$getBearerToken()){
            this.$router.push('/edit');
        }
    },
    methods: {
        async submitLogin(){
            const response = await this.$POST("login", {
                email: this.email,
                password: this.password,
            }, false);
            if (response._status >= 400){
                console.log('Login: Wrong Credentials');
                this.wrong_credentials = true;
                return true;
            }
            const bearer_token = response.token;
            this.$saveBearerToken(bearer_token);
            console.log('Login: Successful');
            return this.$router.push('/edit');
        },
    },
}
</script>

<template>
    <div class="d-flex w-100 justify-content-center align-items-center" style="height: 100vh">
        <b-card header="Login" style="width: 20rem; max-width: 90vw;">

            <label for="email" class="mb-0">Email</label>
            <input type="email" class="form-control" v-model="email" id="email" @focus="wrong_credentials=false">

            <label for="password" class="mb-0">Password</label>
            <input type="password" class="form-control" v-model="password" id="password" @focus="wrong_credentials=false">

            <div class="text-danger" v-if="wrong_credentials">Wrong Credentials.</div>

            <b-button class="mt-2" variant="primary" block @click="submitLogin()">Login</b-button>

        </b-card>
    </div>
</template>