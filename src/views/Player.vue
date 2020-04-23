<template>
   <div v-if="faceit_elo" class="player_screen">
        <Avatar v-bind:avatar-url="avatar"/>
        <div class="nickname_flag">
            <img class="flag"
                 v-bind:src="'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/1x1/' + country.toLowerCase() + '.svg'"/>
            <span class="nickname">{{nickname}}</span>
        </div>
        <div class="stars">
          <span v-for="(item, index) in stars" :key="index" class="fa" :class="index < skill_level ? 'fa-star checked' : 'fa-star-o'"/>
        </div>
        <h6 class="elo_score">{{faceit_elo}}/2000</h6>
        <div class="progress-bar">
          <div class="progress" :style="{ width: progress_width + 'px' }"/>
        </div>


        <button class="accordion" @click="setCurrentPanel(1)"><i class="fa" :class="selected_panel === 1 ? 'fa-chevron-down' : 'fa-chevron-right'" aria-hidden="true"></i>Stats</button>
        <div class="panel" :style="{ display: selected_panel === 1 ? 'block' : 'none' }">
          <p>
            Stat 1
          </p>
        </div>
        <div class="separator"></div>
        <button class="accordion" @click="setCurrentPanel(2)"><i class="fa" :class="selected_panel === 2 ? 'fa-chevron-down' : 'fa-chevron-right'" aria-hidden="true"></i>Matches</button>
        <div class="panel" :style="{ display: selected_panel === 2 ? 'block' : 'none' }">
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
              <tr v-for="match in matches" :key="match.id" class="match-row">
                <td align="left"><i class="fa" :class="match.didWin ? 'fa-angle-double-up' : 'fa-angle-double-down'" aria-hidden="true"></i></td>
                <td align="left">{{match.game_mode}}</td>
                <td align="left">{{match.game}}</td>
                <td align="left"><img class="flag" v-bind:src="match.teams.faction1.avatar"/>{{match.teams.faction1.nickname}}</td>
                <td align="left"><img class="flag" v-bind:src="match.teams.faction2.avatar"/>{{match.teams.faction2.nickname}}</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
</template>

<script>
    import { getDataFromEndpoint } from "../requests";
    import Avatar from "../components/common/Avatar";

    export default {
        name: "Player",
        props: ['id'],
        components: {Avatar},
        data() {
          return {
            faceit_elo: 0,
            skill_level: 0,
            avatar: null,
            country: null,
            stars: new Array(10),
            nickname: null,
            selected_panel: 0,
            matches: []
          }
        },
        computed: {
          progress_width: function () {
            return this.faceit_elo >= 2000 ? 260 : this.faceit_elo/2000 * 260
         }
        },
        methods: {
          setCurrentPanel(panel) {
              if(this.selected_panel === panel) this.selected_panel = 0;
              else {
                this.selected_panel = panel
              }
          },
        },
        mounted: function () {
            this.$nextTick(() => {
                getDataFromEndpoint(`players/${this.id}/history`)
                  .then(data => {
                    const matches = data.data.items.map((match) => ({
                      game_mode: match.game_mode,
                      game: match.game_id,
                      teams: match.teams,
                      results: match.results,
                      id: match.match_id,
                      didWin: match.teams[match.results.winner].players.map(player=> player.player_id).includes(this.id)
                    }))
                    this.matches = matches
                  })

                getDataFromEndpoint(`players/${this.id}`)
                    .then(({ data: { games: { csgo: { faceit_elo, skill_level } }, avatar, country, nickname  } }) => {
                        this.faceit_elo = faceit_elo;
                        this.skill_level = skill_level;
                        this.avatar = avatar;
                        this.country = country;
                        this.nickname = nickname;
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
      margin-top: 2px;
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
        margin-top: .2em;
        padding-bottom: .4em;
        font-size: 16px;
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

    .card .subtitle {
        margin-top: .3em;
    }

    .checked {
      color: #121232;
    }

  .player_screen {
    display: flex;
    flex-direction: column;
    align-items: center;
  }



  /* Style the buttons that are used to open and close the accordion panel */
  .accordion {
    background-color: #FFF;
    color: #000000;
    cursor: pointer;
    padding: 18px;
    width: 90%;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.4s;
  }

  /* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
  .active, .accordion:hover {
    background-color: #ccc;
  }

  /* Style the accordion panel. Note: hidden by default */
  .panel {
    padding: 0 18px;
    background-color: white;
    display: none;
    overflow: hidden;
    width: 90%
  }

  .separator {
      height: 17px;
  }

  .match-row {
    display: flex;
    justify-content: space-between
  }

  .match-table {
    width: 100%
  }

  .match-table td {
    width: 20%;
    margin: 10px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
  }

  .match-table .fa-angle-double-up{
    color: green
  }

  .match-table .fa-angle-double-down{
    color: red
  }
  .match-table .header {
    font-size: 16;
    font-weight: 500;
  }
</style>
