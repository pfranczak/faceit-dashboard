<template>
    <div>
        <h1>STEAM FRIENDS WITH FACEIT ACCOUNT</h1>
        <div class="cards">
            <PlayerCard v-for="friend in friends" :key="friend.nickname" v-bind:card="friend"/>
        </div>
    </div>
</template>

<script>
    import { getDataFromEndpoint, getDataFromServer } from "../requests";
    import PlayerCard from "./PlayerCard";

    export default {
        name: "SteamFriends",
        components: { PlayerCard },
        data() {
            return {
                friends: [],
            }
        },
        beforeMount() {
            getDataFromServer('/steam/friends').then(({ data }) => {
                const promises = data.map(({ steamid }) => {
                    return getDataFromEndpoint('search/players', { nickname: steamid });
                });

                Promise.all(promises).then((res) => {
                    const friendsWithFaceitAccount = res.map(({ data: { items } }) => items).filter(item => item.length > 0);
                    const friendsWithCsGo = friendsWithFaceitAccount.filter(g => g[0].games.filter(({ name }) => name === 'csgo').length > 0);
                    this.friends = friendsWithCsGo.map(friend => {
                        return {
                            avatar: friend[0].avatar,
                            nickname: friend[0].nickname,
                            player_id: friend[0].player_id,
                            country: friend[0].country
                        }
                    });
                });
            });
        }
    }
</script>

<style scoped>
    .cards {
        white-space: nowrap;
        max-width: 95vw;
        overflow-x: auto;
        margin: 0 auto;
        padding: .4em .1em;
        justify-content: center;
    }

    .cards .card {
        background-color: #a9b0b4;
    }

    button {
        background-color: #a9b0b4;
    }
</style>
