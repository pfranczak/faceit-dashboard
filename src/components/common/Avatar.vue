<template>
    <img v-if="avatarUrl" class="avatar" alt="player-avatar" v-bind:src="avatarUrl"/>
    <div v-else class="avatar avatar--fake" v-bind:class="{ 'avatar--small': type === 'small' }"></div>
</template>

<script>
    export default {
        name: "Avatar",
        props: {'avatarUrl': String, 'type': String },
    }
</script>

<style scoped>
    .avatar {
        min-width: 75px;
        width: 75px;
        height: 75px;
        border-radius: 50%;
        border: 1px solid rgba(10, 10, 10, .2);
        margin: 0 auto;
    }

    .avatar--fake {
        align-items: center;
        display: flex;
        font-size: 35px;
        justify-content: center;
    }

    .avatar--fake:after {
        color: rgba(10, 10, 10, .2);
        content: 'A';
        display: block;
    }
</style>