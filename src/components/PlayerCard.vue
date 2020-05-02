<template>
    <div v-if="faceit_elo" class="card">
        <router-link :to="{ name: 'player', params: { id: card.player_id }}">
        <Avatar v-bind:avatar-url="avatar"/>
        <div class="card__nickname">
            <img class="card__flag"
                 v-bind:src="'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/1x1/' + country.toLowerCase() + '.svg'"/>
            <h6 class="title is-6">{{nickname}}</h6>
        </div>
        <h6 class="subtitle is-6">{{faceit_elo}}</h6>
        <b-button rounded @click.stop.prevent="addToCompare">Compare</b-button> <br>
        <b-button rounded @click.stop.prevent="addToFavouriteList" class="defaultButton" 
        v-if="showAdd && isSteamAuth">Favourite</b-button>
        <b-button rounded @click.stop.prevent="deleteFromList" class="defaultButton" 
        v-if="showDelete">Delete player</b-button>
        </router-link>
    </div>
</template>

<script>
    import { getDataFromEndpoint, postDataToServer, getDataFromServer,getDataFromEndpointWithoutParams } from "../requests";
    import Avatar from "./common/Avatar";

    export default {
        name: 'PlayerCard',
        components: {Avatar},
        props: ['card', 'showAdd', 'showDelete'],
        data() {
            return {
                ...this.card,
                faceit_elo: null,
                ...this.showAdd,
                isSteamAuth :this.$store.getters.steamUser !== null,
                players: []
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                getDataFromEndpoint(`players/${this.card.player_id}`)
                    .then(({ data: { games: { csgo: { faceit_elo } } } }) => {
                        this.faceit_elo = faceit_elo;
                    });
            });
        },
        methods: {
            addToCompare() {
                this.$store.commit('addToCompare', { id: this.card.player_id, avatar: this.card.avatar, name: this.card.nickname });
            },
            addToFavouriteList() {
                const userId = this.$store.getters.steamUser.steamid
                const addUserId = this.card.player_id

                postDataToServer(`/user/addFriend/${userId}/${addUserId}`).then(() => {
                    this.getUserFriendsFromDataBase(userId)
                }) 
            },
            deleteFromList(){
                const userId = this.$store.getters.steamUser.steamid
                const removeUserId = this.card.player_id

                postDataToServer(`/user/delete/${userId}/${removeUserId}`).then(() => {
                    this.getUserFriendsFromDataBase(userId)
                }) 
            },
            getUserFriendsFromDataBase(userId) {
                getDataFromServer(`/user/friends/${userId}`).then(({data}) => { 
                    const promises = data.map( id  => {
                        return getDataFromEndpointWithoutParams(`players/${id}`);
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
    }
</script>

<style scoped>
    .card {
        border-radius: .3em;
        display: inline-block;
        margin-right: .4em;
        padding: 1.5em;
        min-width: 140px;
        height: auto;
    }

    .card:last-child {
        margin: 0;
    }

    .card__nickname {
        align-items: center;
        border-bottom: 1px solid rgba(10, 10, 10, .2);
        display: flex;
        justify-content: center;
        margin-top: .4em;
        padding-bottom: .6em;
    }

    .card__flag {
        margin-right: .2em;
        width: 18px;
        height: 18px;
        border: 1px solid rgba(10, 10, 10, .2);
    }

    .card .subtitle {
        margin: .3em auto;
    }

    .defaultButton {
        margin-top: 10px;
    }
</style>
