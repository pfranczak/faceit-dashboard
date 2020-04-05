<template>
    <div class="card">
        <img class="card__avatar" alt="player-avatar" v-bind:src="avatar"/>
        <div class="card__nickname">
            <img class="card__flag" v-bind:src="'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/1x1/' + country + '.svg'"/>
            <h5 class="title is-5">{{nickname}}</h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PlayerCard",
        data() {
            return {
                player_id: "76f1f33f-e798-40f8-985a-5a9cd2de38d7",
                nickname: "todler",
                status: "AVAILABLE",
                games: [
                    {
                        "name": "csgo",
                        "skill_level": "4"
                    }
                ],
                country: "pl",
                verified: false,
                avatar: "https://assets.faceit-cdn.net/avatars/76f1f33f-e798-40f8-985a-5a9cd2de38d7_1550609310260.png"
            }
        }
    }
</script>

<style scoped>
    .card {
        padding: 1.5em;
        width: 170px;
    }

    .card__avatar {
        width: 75px;
        height: 75px;
        border-radius: 50%;
        border: 1px solid rgba(10, 10, 10, .2);
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
</style>
