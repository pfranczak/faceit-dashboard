<template>
    <div>
        <PlayerSearch/>
        <SteamFriends v-if="isSteamAuth"/>
        <TopPlayers/>
    </div>
</template>

<script>
    import PlayerSearch from '../components/PlayerSearch';
    import TopPlayers from "../components/TopPlayers";
    import SteamFriends from "../components/SteamFriends";

    export default {
        name: 'Home',
        components: {
            SteamFriends,
            PlayerSearch,
            TopPlayers
        },
        data() {
            return {
                isSteamAuth: this.$store.getters.steamUser !== null
            }
        }
    }
</script>

<style scoped>

</style>
