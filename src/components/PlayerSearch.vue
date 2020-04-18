<template>
    <div>
        <div class="player-search">
            <b-field>
                <b-input v-model="nickname"
                         placeholder="FACEIT nickname"
                ></b-input>
            </b-field>
            <b-button @click="clickMe">Find</b-button>
        </div>
        <div class="cards">
            <PlayerCard v-for="card in cards" :key="card.nickname" v-bind:card="card"/>
        </div>
    </div>
</template>

<script>
    import { getDataFromEndpoint } from "../requests";
    import PlayerCard from "./PlayerCard";

    export default {
        name: "PlayerSearch",
        components: { PlayerCard },
        data() {
            return {
                nickname: 'chaubee',
                cards: [],
            }
        },
        methods: {
            clickMe() {
                getDataFromEndpoint('search/players', { nickname: this.nickname })
                    .then(({ data: { items } }) => {
                        this.cards = items.filter(({ games }) => games.filter(({ name }) => name === 'csgo').length > 0);
                    });
            }
        }
    }
</script>

<style scoped>
    .player-search {
        display: flex;
        justify-content: center;
        padding: .5em;
    }

    .player-search .button {
        margin-left: .2em;
    }

    .player-search .field {
        margin: 0;
    }

    .cards {
        white-space: nowrap;
        max-width: 95vw;
        overflow-x: auto;
        margin: 0 auto;
        padding: .4em .1em;
        justify-content: center;
    }
</style>
