<template>
    <div>
        <PlayerSearch/>
        <FavouritePlayers />
        <SteamFriends v-if="isSteamAuth"/>
        <TopPlayers/>
    </div>
</template>

<script>
    import PlayerSearch from '../components/PlayerSearch';
    import TopPlayers from "../components/TopPlayers";
    import SteamFriends from "../components/SteamFriends";
    import FavouritePlayers from "../components/FavouritePlayers"

    export default {
        name: 'Home',
        components: {
            SteamFriends,
            PlayerSearch,
            TopPlayers,
            FavouritePlayers
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
