<template>
    <div>
        <b-field>
            <b-input v-model="playerName"
                     placeholder="Enter faceit nickname"
            ></b-input>
        </b-field>
        <b-button @click="clickMe">Find</b-button>
    </div>
</template>

<script>
    export default {
        name: "PlayerSearch",
        data() {
            return {
                playerName: ''
            }
        },
        methods: {
            clickMe() {
                console.log(this.playerName);
            }
        }
    }
</script>

<style scoped>

</style>
