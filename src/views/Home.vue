<template>
    <div>
        <PlayerSearch/>
        <SteamFriends/>
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
        }
    }
</script>

<style scoped>

</style>
