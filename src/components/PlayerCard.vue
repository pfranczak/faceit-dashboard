<template>
    <div v-if="faceit_elo" class="card">
        <img v-if="avatar" class="card__avatar" alt="player-avatar" v-bind:src="avatar"/>
        <div v-if="!avatar" class="card__avatar card__avatar--fake"></div>
        <div class="card__nickname">
            <img class="card__flag"
                 v-bind:src="'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/1x1/' + country.toLowerCase() + '.svg'"/>
            <h6 class="title is-6">{{nickname}}</h6>
        </div>
        <h6 class="subtitle is-6">{{faceit_elo}}</h6>
    </div>
</template>

<script>
    import { getDataFromEndpoint } from "../requests";

    export default {
        name: 'PlayerCard',
        props: ['card'],
        data() {
            return {
                ...this.card,
                faceit_elo: null
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                getDataFromEndpoint(`players/${this.card.player_id}`)
                    .then(({ data: { games: { csgo: { faceit_elo } } } }) => {
                        this.faceit_elo = faceit_elo;
                    });
            });
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
        height: 170px;
    }

    .card:last-child {
        margin: 0;
    }

    .card__avatar {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        border: 1px solid rgba(10, 10, 10, .2);
        margin: 0 auto;
    }

    .card__avatar--fake {
        align-items: center;
        display: flex;
        font-size: 35px;
        justify-content: center;
    }

    .card__avatar--fake:after {
        color: rgba(10, 10, 10, .2);
        content: 'A';
        display: block;
    }

    .card__nickname {
        align-items: center;
        border-bottom: 1px solid rgba(10, 10, 10, .2);
        display: flex;
        justify-content: center;
        margin-top: .2em;
        padding-bottom: .4em;
    }

    .card__flag {
        margin-right: .2em;
        width: 18px;
        height: 18px;
        border: 1px solid rgba(10, 10, 10, .2);
    }

    .card .subtitle {
        margin-top: .3em;
    }
</style>
