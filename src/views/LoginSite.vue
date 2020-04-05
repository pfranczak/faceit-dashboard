<template>
    <button @click="connectFACTEIT">Connect with FACEIT</button>
</template>

<script>
    export default {
        name: "LoginSite",
        methods: {
            connectFACTEIT () {
                window.FACEIT.loginWithFaceit()
            }
        }
    }
</script>

<style scoped>

</style>
