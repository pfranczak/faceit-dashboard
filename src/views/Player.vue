<template>
    <div v-if="faceit_elo" class="player_screen">
        <Avatar v-bind:avatar-url="avatar"/>
        <div class="nickname_flag">
            <img class="flag"
                 v-bind:src="'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/1x1/' + country.toLowerCase() + '.svg'"/>
            <span class="nickname">{{nickname}}</span>
        </div>
        <div class="stars">
            <span v-for="(item, index) in stars" :key="index" class="fa"
                  :class="index < skill_level ? 'fa-star checked' : 'fa-star-o'"/>
        </div>
        <h6 class="elo_score">{{faceit_elo}}/2000</h6>
        <div class="progress-bar">
            <div class="progress" :style="{ width: progress_width + 'px' }"/>
        </div>


        <b-collapse
                class="card"
                animation="slide"
                :open="isOpen == 0"
                @open="isOpen = 0">
            <div slot="trigger"
                 slot-scope="props"
                 class="card-header"
                 role="button"
            >
                <p class="card-header-title">
                    Stats
                </p>
                <a class="card-header-icon">
                    <i v-bind:class="props.open ? 'fas fa-caret-up' : 'fas fa-caret-down'"></i>
                </a>
            </div>
            <div class="card-content card-content--stats">
                <div class="content level">
                    <div class="level-item has-text-centered" v-for="(value, key) in stats" v-bind:key="key">
                        <div>
                            <p class="heading">{{key}}</p>
                            <p class="title">{{value}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </b-collapse>
        <b-collapse
                class="card"
                animation="slide"
                :open="isOpen === 1"
                @open="isOpen = 1">
            <div slot="trigger"
                 slot-scope="props"
                 class="card-header"
                 role="button"
            >
                <p class="card-header-title">
                    Matches
                </p>
                <a class="card-header-icon">
                    <i v-bind:class="props.open ? 'fas fa-caret-up' : 'fas fa-caret-down'"></i>
                </a>
            </div>
            <div class="card-content card-content--table">
                <div class="content">
                    <table class="match-table">
                        <thead>
                        <tr class="match-row header">
                            <td>Result</td>
                            <td>Type</td>
                            <td>Game</td>
                            <td>Team 1</td>
                            <td>Team 2</td>
                        </tr>
                        </thead>
                        <tbody>
                        <router-link :to="{ name: 'match', params: { id: match.id}}" v-for="match in matches"
                                     :key="match.id">
                            <tr class="match-row">
                                <td align="center"><i class="fa"
                                                      :class="match.didWin ? 'fa-angle-double-up' : 'fa-angle-double-down'"
                                                      aria-hidden="true"></i></td>
                                <td align="left">{{match.game_mode}}</td>
                                <td align="left">{{match.game}}</td>
                                <td align="left"><img class="flag" v-bind:src="match.teams.faction1.avatar"/>{{match.teams.faction1.nickname}}
                                </td>
                                <td align="left"><img class="flag" v-bind:src="match.teams.faction2.avatar"/>{{match.teams.faction2.nickname}}
                                </td>
                            </tr>
                        </router-link>
                        </tbody>
                    </table>
                </div>
            </div>
        </b-collapse>
        <div v-if="mapChartData !== null" class="charts-wrapper">
            <div v-for="item in mapChartData.datasets" :key="item[0].label" style="margin-top: 2em">
                <h1>{{item[0].label}} by maps</h1>
                <PieChart :chartdata="{labels: mapChartData.labels, datasets: item}"></PieChart>
            </div>
        </div>
    </div>
</template>
<script>
    import { getDataFromEndpoint } from "../requests";
    import Avatar from "../components/common/Avatar";
    import PieChart from "../components/common/PieChart";

    export default {
        name: "Player",
        props: ['id'],
        components: { Avatar, PieChart },
        data() {
            return {
                faceit_elo: 0,
                skill_level: 0,
                avatar: null,
                country: null,
                stars: new Array(10),
                nickname: null,
                selected_panel: 0,
                matches: [],
                isOpen: 0,
                stats: {},
                toCharts: null
            }
        },
        computed: {
            progress_width: function () {
                return this.faceit_elo >= 2000 ? 260 : this.faceit_elo / 2000 * 260
            },
            mapChartData: function () {
                function dynamicColors() {
                    const r = Math.floor(Math.random() * 255);
                    const g = Math.floor(Math.random() * 255);
                    const b = Math.floor(Math.random() * 255);
                    return "rgb(" + r + "," + g + "," + b + ")";
                }

                if (this.toCharts === null) {
                    return null;
                }

                const labels = [];
                const data = {
                    Matches: [],
                    Kills: [],
                    Deaths: [],
                    Assists: [],
                    MVPs: [],
                    Aces: []
                };
                const backgroundColor = [];

                this.toCharts.forEach(item => {
                    labels.push(item.label);
                    data.Matches.push(item.stats.Matches);
                    data.Kills.push(item.stats.Kills);
                    data.Deaths.push(item.stats.Deaths);
                    data.Assists.push(item.stats.Assists);
                    data.MVPs.push(item.stats.MVPs);
                    data.Aces.push(item.stats['Penta Kills']);

                    backgroundColor.push(dynamicColors());
                });

                const datasets = {};
                Object.keys(data).forEach(key => {
                    datasets[key] = [{
                        label: key,
                        data: data[key],
                        backgroundColor
                    }];
                });

                return {
                    labels,
                    datasets
                };
            }
        },
        mounted: function () {
            this.$nextTick(() => {
                getDataFromEndpoint(`players/${this.id}/history`)
                    .then(data => {
                        this.matches = data.data.items.map((match) => ({
                            game_mode: match.game_mode,
                            game: match.game_id,
                            teams: match.teams,
                            results: match.results,
                            id: match.match_id,
                            didWin: match.teams[match.results.winner].players.map(player => player.player_id).includes(this.id)
                        }));
                    });

                getDataFromEndpoint(`players/${this.id}`)
                    .then(({ data: { games: { csgo: { faceit_elo, skill_level } }, avatar, country, nickname } }) => {
                        this.faceit_elo = faceit_elo;
                        this.skill_level = skill_level;
                        this.avatar = avatar;
                        this.country = country;
                        this.nickname = nickname;
                    });

                getDataFromEndpoint(`players/${this.id}/stats/csgo`)
                    .then(({ data: { lifetime, segments } }) => {
                        const stats = {};
                        Object.entries(lifetime).forEach(([key, value]) => {
                            if (key !== 'Total Headshots %'
                                && key !== 'Recent Results'
                                && key !== 'K/D Ratio'
                            ) {
                                stats[key] = value;
                            }
                        });
                        this.stats = stats;
                        this.toCharts = segments;
                    });
            });
        }
    }
</script>


<style scoped>
    .progress-bar {
        height: 4px;
        width: 260px;
        background-color: #A1A4B1;
        margin-top: 5px;
        position: relative;
        margin-bottom: 30px;
    }

    .progress {
        background-color: #000000;
        position: static;
        left: 0;
        height: 4px;
        width: 0;
    }

    .elo_score {
        color: #000000
    }

    .nickname_flag {
        display: flex;
        align-items: baseline;
        justify-content: center;
    }

    .nickname {
        align-items: center;
        display: flex;
        justify-content: center;
        margin-top: .7em;
        font-size: 24px;
        font-weight: normal
    }

    .flag {
        margin-right: .4em;
        width: 18px;
        height: 18px;
    }

    .stars {
        margin: 20px 0;
    }

    .card {
        width: 95%;
    }

    .card .subtitle {
        margin-top: .3em;
    }

    .card-content--table {
        overflow: scroll;
        padding: 0;
        max-height: 250px;
    }

    @media (min-width: 1000px) {
        .card-content--table {
            max-height: 400px;
        }
    }

    .card-content--stats {
        flex-direction: column;
    }

    .checked {
        color: #121232;
    }

    .player_screen {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* Style the accordion panel. Note: hidden by default */
    .panel {
        padding: 0 18px;
        background-color: white;
        display: none;
        overflow: hidden;
        width: 90%
    }

    .match-row {
        display: flex;
        justify-content: space-between
    }

    .match-table {
        width: 100%
    }

    .match-table td {
        min-width: 70px;
        margin: 10px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: initial;
    }

    .match-table td:nth-child(n + 4) {
        width: 80%;
    }

    .match-table td:nth-child(n + 2) {
        display: flex;
    }

    .match-table .fa-angle-double-up {
        color: green
    }

    .match-table .fa-angle-double-down {
        color: red
    }

    .match-table .header {
        font-weight: 500;
    }

    .charts-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>
