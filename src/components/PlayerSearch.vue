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
        <beat-loader v-show="isLoading" :loading="true" :color="'#a3a3a3'" :size="'20px'"></beat-loader>
        <div class="cards" v-if="!isLoading">
            <PlayerCard v-for="card in cards" :key="card.nickname" v-bind:card="card" v-bind:showAdd="true"/>
        </div>
    </div>
</template>

<script>
    import { getDataFromEndpoint } from "../requests";
    import PlayerCard from "./PlayerCard";
    import BeatLoader from 'vue-spinner/src/BeatLoader';

    export default {
        name: "PlayerSearch",
        components: { PlayerCard, BeatLoader },
        data() {
            return {
                nickname: '',
                cards: [],
                isLoading: false,
            }
        },
        methods: {
            clickMe() {
                this.isLoading = true;
                getDataFromEndpoint('search/players', { nickname: this.nickname })
                    .then(({ data: { items } }) => {
                        this.cards = items.filter(({ games }) => games.filter(({ name }) => name === 'csgo').length > 0);
                        this.isLoading = false;
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
        width: 75vw;
    }

    .cards {
        white-space: nowrap;
        max-width: 95vw;
        overflow-x: auto;
        margin: 0 auto;
        padding: .4em .1em;
        justify-content: center;
    }

    .v-spinner {
        margin-top: 1em;
    }
</style>
