<template>
	<div>
		<h1>TOP 10 PLAYERS</h1>
		<div class="cards">
			<div v-for="(card, index) in cards" :key="card.nickname"
				class="card-wrapper"
			>
				<span class="position" v-bind:class="{
					'position--1': index === 0,
					'position--2': index === 1,
					'position--3': index === 2
				}">#{{index + 1}}</span>
			<PlayerCard v-bind:card="card"/>
			</div>
		</div>
	</div>
</template>

<script>
    import {getDataFromEndpoint} from "../requests";
    import PlayerCard from "./PlayerCard";

    export default {
        name: "TopPlayers",
        components: {PlayerCard},
        data() {
            return {
                cards: [],
            }
        },
        mounted() {
            getDataFromEndpoint('rankings/games/csgo/regions/EU', {offset: 0, limit: 10})
                .then(({data: {items}}) => {
                    this.cards = items;
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

	.card-wrapper {
		display: inline-block;
		margin-right: .4em;
		position: relative;
	}

	.position {
		position: absolute;
		top: 4px;
		right: 4px;
		z-index: 2;
	}

	.position--1,
	.position--2,
	.position--3 {
		font-size: 18px;
		font-weight: bold;
	}

	.position--1 {
		color: #ffdf00;
	}

	.position--2 {
		color: #c0c0c0;
	}

	.position--3 {
		color: #b08d57;
	}
</style>
