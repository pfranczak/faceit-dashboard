<template>
    <div>
        <PlayerSearch/>
        <TopPlayers/>
    </div>
</template>

<script>
    import PlayerSearch from '../components/PlayerSearch';
    import TopPlayers from "../components/TopPlayers";

    export default {
        name: 'Home',
        components: {
            PlayerSearch,
            TopPlayers
        }
    }
</script>

<style scoped>

</style>
