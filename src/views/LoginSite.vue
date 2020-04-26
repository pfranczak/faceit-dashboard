<template>
    <div class="login-screen">
        <button @click="connectFACTEIT">Connect with FACEIT</button>
        <img
            src="../assets/steam.png" class="steam_button"
            @click="connectSTEAM"
        />
    </div>
</template>

<script>
    export default {
        name: "LoginSite",
        methods: {
            connectFACTEIT () {
                window.FACEIT.loginWithFaceit()
            },
            connectSTEAM () {
               window.location.replace('http://localhost:5000') 
            },
        },
    }
</script>

<style scoped>
    .login-screen {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .steam_button {
        margin-top: 10px
    }
</style>
