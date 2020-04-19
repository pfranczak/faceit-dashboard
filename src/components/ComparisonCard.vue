<template>
    <div class="card" v-if="players.length > 0">
        <div class="avatars">
            <div class="avatar-container"
                 v-for="({avatar, id}) in players"
                 v-bind:key="id"
            >
                <Avatar v-bind:avatar-url="avatar"/>
                <div class="remove-player" @click="removePlayer(id)"></div>
            </div>
        </div>
        <router-link to="/comparison">
            <b-button>Show <br/>comparison</b-button>
        </router-link>
    </div>
</template>

<script>

    import Avatar from "./common/Avatar";
    export default {
        name: 'ComparisonCard',
        components: {Avatar},
        computed: {
            players() {
                return this.$store.getters.playersToCompare;
            }
        },
        methods: {
            removePlayer: function (id) {
                this.$store.commit('removeFromCompare', {id});
            }
        }
    }
</script>

<style scoped>
    .avatars {
        display: flex;
        max-width: calc(100% - 108px);
        overflow: auto;
    }

    .avatar-container {
        position: relative;
    }

    .remove-player {
        position: absolute;
        width: 13px;
        height: 13px;
        top: 0;
        right: 0;
        background-color: #DA0101;
        border-radius: 50%;
        border: 1px solid rgba(10, 10, 10, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .remove-player:after {
        display: block;
        content: 'x';
        color: #fff;
        margin-top: -2px;
        font-size: 12px;
        font-weight: bold;
        margin-left: 1px;
    }

    .card {
        border-radius: .3em;
        display: flex;
        padding: 1em;
        position: fixed;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
    }

    .avatar {
        margin-right: .2em;
    }

    .button {
        height: 75px;
        margin-left: .3em;
    }
</style>
