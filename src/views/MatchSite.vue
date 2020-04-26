<template>
    <div>
        <div class="teams">
            <div class="team__avatar">
                <div>{{winnerTeam.team_stats.Team[0]}}</div>
                <div>{{winnerTeam.team_stats.Team[1]}}</div>
            </div>
            <div>
                <div class="best-of">BEST OF {{bestOf}}</div>
                <div class="score">{{winnerTeam.team_stats['Final Score']}}:{{lostTeam.team_stats['Final Score']}}</div>
                <div class="map">{{map}}</div>
            </div>
            <div class="team__avatar">
                {{lostTeam.team_stats.Team[0]}}
                {{lostTeam.team_stats.Team[1]}}
            </div>
        </div>
        <div class="content">
            <table class="match-table">
                <thead>
                <tr class="match-row header">
                    <td align="center">Nickname</td>
                    <td align="center">Kills</td>
                    <td align="center">Assists</td>
                    <td align="center">Deaths</td>
                    <td align="center">MVPs</td>
                </tr>
                </thead>
                <tbody>
                <tr class="match-row" v-for="player in winnerTeam.players" :key="player.player_id">
                    <td align="center">{{player.nickname}}</td>
                    <td align="center">{{player.player_stats.Kills}}</td>
                    <td align="center">{{player.player_stats.Assists}}</td>
                    <td align="center">{{player.player_stats.Deaths}}</td>
                    <td align="center">{{player.player_stats.MVPs}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="content">
            <table class="match-table">
                <thead>
                <tr class="match-row header">
                    <td align="center">Nickname</td>
                    <td align="center">Kills</td>
                    <td align="center">Assists</td>
                    <td align="center">Deaths</td>
                    <td align="center">MVPs</td>
                </tr>
                </thead>
                <tbody>
                <tr class="match-row" v-for="player in lostTeam.players" :key="player.player_id">
                    <td align="center">{{player.nickname}}</td>
                    <td align="center">{{player.player_stats.Kills}}</td>
                    <td align="center">{{player.player_stats.Assists}}</td>
                    <td align="center">{{player.player_stats.Deaths}}</td>
                    <td align="center">{{player.player_stats.MVPs}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { getDataFromEndpoint } from '../requests';

    export default {
        name: "MatchSite",
        props: ['id'],
        data() {
            return {
                map: '',
                score: '',
                winnerTeam: [],
                lostTeam: [],
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                function sortPlayers(players) {
                    return players.sort((player1, player2) => {
                        const k1 = parseInt(player1.player_stats.Kills);
                        const k2 = parseInt(player2.player_stats.Kills);

                        if (k1 > k2) {
                            return -1;
                        } else if (k1 < k2) {
                            return 1;
                        }

                        return 0;
                    });
                }

                getDataFromEndpoint(`matches/${this.id}/stats`)
                    .then(({ data: { rounds } }) => {
                        const data = rounds[0];
                        this.map = data.round_stats.Map;
                        this.bestOf = data.best_of;

                        if (data.teams[0].team_id === data.round_stats.Winner) {
                            this.winnerTeam = data.teams[0];
                            this.lostTeam = data.teams[1];
                        } else {
                            this.lostTeam = data.teams[0];
                            this.winnerTeam = data.teams[1];
                        }
                        this.winnerTeam.team_stats.Team = this.winnerTeam.team_stats.Team.split('_');
                        this.winnerTeam.players = sortPlayers(this.winnerTeam.players);
                        this.lostTeam.team_stats.Team = this.lostTeam.team_stats.Team.split('_');
                        this.lostTeam.players = sortPlayers(this.lostTeam.players);
                    });
            });
        }
    }
</script>

<style scoped>
    .teams {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 1.5em 0;
        overflow: hidden;
    }

    .team__avatar {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100px;
        height: 100px;
        font-weight: bold;
        border-radius: 50%;
        transform: rotate(-45deg);
        border: 1px solid rgba(10, 10, 10, .2);
        font-size: 16px;
        overflow: hidden;
    }

    .score {
        font-size: 34px;
        font-weight: bold;
        margin: .2em 0;
    }

    .match-table {
        background: #fff;
        width: 100%
    }

    .match-table td {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: initial;
    }

    .match-table tr {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: initial;
        margin: 10px 0;
    }

    .match-table td:first-child {
        min-width: 110px;
    }

    .match-row td {
        border: none;
    }

    .match-row.header td {
        border-bottom: 1px solid #dbdbdb;
    }

    .content {
        overflow: scroll;
    }
</style>
