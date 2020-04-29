<template>
    <div>
        <div v-if="isSteamAuth" class="field">
            <p class="notLogin">Log in to steam to see your favourite players</p>
        </div>
        <div v-else>
            <p class="login"> FAVOURITES PLAYERS </p>
            <div v-if="playersList.length > 0">
            <PlayerCard v-for="player in playersList" :key="player.nickname" v-bind:card="player" v-bind:showAdd='false' />
            </div>
            <p v-else class="emptyFavoritePlayers">You didn't have favourite players</p>
        </div>
    </div>
</template>

<script>

import {getDataFromEndpointWithoutParams , getDataFromServer} from "../requests"
import PlayerCard from "./PlayerCard";

export default {
    name: "FavoritePlayers",
    components: { PlayerCard },
    data() {
        return {
            players: [],
            isSteamAuth: this.$store.getters.steamUser === null
        }
    }, 
    computed: {
        playersList() {
            return this.$store.getters.favouritePlayer.length > this.players.length ? this.$store.getters.favouritePlayer : this.players
        }
    },
    beforeMount() {
            const steamId = this.$store.getters.steamUser.steamid
            getDataFromServer(`/user/friends/${steamId}`).then(({data}) => {
                const promises = data.map( userId  => {
                    return getDataFromEndpointWithoutParams(`players/${userId}`);
            })
            Promise.all(promises).then((res) => {
                const friends = res.map((item) => item.data)
                this.players = friends.map(player => { 
                    return {
                        avatar: player.avatar,
                        nickname: player.nickname,
                        player_id: player.player_id,
                        country: player.country
                    }
                });
                this.$store.commit("setFavouritePlayers", this.players)
            });
        })
    }
}
</script>

<style scoped>

.field {
    background-color: #e3e4e8;
}

.notLogin {
    font-size: 35px;
    padding: 20px;
    color: white;
}

.login{
    padding: 20px;
    font-weight: bold;
}

.emptyFavoritePlayers{
    font-size: 30px;
    padding: 15px;
    color: white;
    background-color: #e3e4e8;
}

</style>