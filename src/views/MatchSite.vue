<template>
    <div>
        <div class="teams" v-if="winnerTeam.team_stats">
            <div class="team__avatar winner">
                <div>{{winnerTeam.team_stats.Team[0]}}</div>
                <div>{{winnerTeam.team_stats.Team[1]}}</div>
            </div>
            <div>
                <div class="best-of">BEST OF {{bestOf}}</div>
                <div class="score">
                    <span class="winner">{{winnerTeam.team_stats['Final Score']}}</span> :
                    <span class="loser">{{lostTeam.team_stats['Final Score']}}</span>
                </div>
                <div class="map">{{map}}</div>
            </div>
            <div class="team__avatar loser">
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
                    <td align="center">HS</td>
                    <td align="center">HS%</td>
                    <td align="center">KD</td>
                    <td align="center">5k</td>
                    <td align="center">4k</td>
                    <td align="center">3k</td>
                </tr>
                </thead>
                <tbody>
                <tr class="match-row" v-for="player in winnerTeam.players" :key="player.player_id">
                    <td align="center">{{player.nickname}}</td>
                    <td align="center">{{player.player_stats.Kills}}</td>
                    <td align="center">{{player.player_stats.Assists}}</td>
                    <td align="center">{{player.player_stats.Deaths}}</td>
                    <td align="center">{{player.player_stats.MVPs}}</td>
                    <td align="center">{{player.player_stats.Headshot}}</td>
                    <td align="center">{{player.player_stats['Headshots %']}}</td>
                    <td align="center">{{player.player_stats['K/D Ratio']}}</td>
                    <td align="center">{{player.player_stats['Penta Kills']}}</td>
                    <td align="center">{{player.player_stats['Quadro Kills']}}</td>
                    <td align="center">{{player.player_stats['Triple Kills']}}</td>
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
                    <td align="center">HS</td>
                    <td align="center">HS%</td>
                    <td align="center">KD</td>
                    <td align="center">5k</td>
                    <td align="center">4k</td>
                    <td align="center">3k</td>
                </tr>
                </thead>
                <tbody>
                <tr class="match-row" v-for="player in lostTeam.players" :key="player.player_id">
                    <td align="center">{{player.nickname}}</td>
                    <td align="center">{{player.player_stats.Kills}}</td>
                    <td align="center">{{player.player_stats.Assists}}</td>
                    <td align="center">{{player.player_stats.Deaths}}</td>
                    <td align="center">{{player.player_stats.MVPs}}</td>
                    <td align="center">{{player.player_stats.Headshot}}</td>
                    <td align="center">{{player.player_stats['Headshots %']}}</td>
                    <td align="center">{{player.player_stats['K/D Ratio']}}</td>
                    <td align="center">{{player.player_stats['Penta Kills']}}</td>
                    <td align="center">{{player.player_stats['Quadro Kills']}}</td>
                    <td align="center">{{player.player_stats['Triple Kills']}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div style="display: flex; flex-wrap: wrap; justify-content: space-around">
            <div class="chart" v-for="item in chartData" v-bind:key="item[0]">
                <LineChart v-if="chartData !== null"
                           :chartdata="item"
                           :options="{responsive: true}"
                ></LineChart>
            </div>
        </div>
    </div>
</template>

<script>
    import { getDataFromEndpoint } from '../requests';
    import LineChart from '../components/common/LineChart';

    export default {
        name: "MatchSite",
        props: ['id'],
        components: { LineChart },
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
        },
        computed: {
            chartData: function () {
                if (!this.winnerTeam.team_stats) {
                    return null;
                }
                const wPlayers = this.winnerTeam.players;
                const lPlayers = this.lostTeam.players;
                const wName = this.winnerTeam.team_stats.Team.join(' ');
                const lName = this.lostTeam.team_stats.Team.join(' ');

                const labels = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5'];
                let datasets;
                const sets = {};

                const keys = Object.keys(wPlayers[0].player_stats).filter(key =>
                    key === 'Kills' ||
                    key === 'Assists' ||
                    key === 'Deaths' ||
                    key === 'Headshot' ||
                    key === 'K/D Ratio'
                );
                keys.forEach(key => {
                    datasets = [];
                    datasets.push({
                        label: wName + ': ' + key,
                        fill: false,
                        backgroundColor: 'green',
                        borderColor: 'green',
                        data: wPlayers.map(({ player_stats }) => parseInt(player_stats[key])),
                        lineTension: 0
                    });
                    datasets.push({
                        label: lName + ': ' + key,
                        fill: false,
                        backgroundColor: 'red',
                        borderColor: 'red',
                        data: lPlayers.map(({ player_stats }) => parseInt(player_stats[key])),
                        lineTension: 0
                    });
                    sets[key] = {
                        labels,
                        datasets
                    }
                });

                return sets;
            }
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

    .match-table tr:nth-child(2n) {
        background-color: rgba(10, 10, 10, .05);
    }

    .match-table td:first-child {
        min-width: 110px;
    }

    .match-row td {
        border: none;
    }

    .match-row td:nth-child(n + 6) {
        display: none;
    }

    @media (min-width: 1000px) {
        .match-row td:nth-child(n + 6) {
            display: table-cell;
        }
    }

    .match-row.header td {
        border-bottom: 1px solid #dbdbdb;
    }

    .content {
        overflow: scroll;
    }

    .winner {
        color: green;
    }

    .loser {
        color: red;
    }
</style>

<style>
    @media (max-width: 700px) {
        #line-chart {
            width: 90vw !important;
            height: 90vw !important;
            margin-bottom: .5em;
        }
    }

</style>
