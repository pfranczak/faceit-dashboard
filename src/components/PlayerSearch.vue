<template>
    <div class="player-search">
        <b-field>
            <b-input v-model="nickname"
                     placeholder="FACEIT nickname"
            ></b-input>
        </b-field>
        <b-button @click="clickMe">Find</b-button>
    </div>
</template>

<script>
    import { getDataFromEndpoint } from "../requests";

    export default {
        name: "PlayerSearch",
        data() {
            return {
                nickname: '',
                cards: [],
            }
        },
        methods: {
            clickMe() {
                getDataFromEndpoint('search/players', { nickname: this.nickname })
                    .then(({ data: { items } }) => {
                        this.cards = items
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
</style>
