<template>
	<div>
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
                .then(({data}) => {
                    console.log(data);
                });
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
		display: flex;
		white-space: nowrap;
		max-width: 95vw;
		overflow-x: auto;
		margin: 0 auto;
		padding: .4em .1em;
		justify-content: center;
	}
</style>
