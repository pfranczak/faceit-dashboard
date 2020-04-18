<template>
    <BarChart v-if="chartdata !== null" :chartdata="chartdata" :options="{responsive: true}"/>
</template>

<script>
    import {getDataFromEndpoint} from "../requests";
    import BarChart from "../components/common/BarChart";

    export default {
        name: "Comparison",
        components: {BarChart},
        data() {
            return {
                chartdata: null
            }
        },
        computed: {
            labels() {
                return this.$store.getters.playersToCompare.map(({name}) => name);
            },
            players() {
                return this.$store.getters.playersToCompare;
            }
        },
        mounted: function () {
             function dynamicColors () {
                const r = Math.floor(Math.random() * 255);
                const g = Math.floor(Math.random() * 255);
                const b = Math.floor(Math.random() * 255);
                return "rgb(" + r + "," + g + "," + b + ")";
            }

            this.$nextTick(() => {
                Promise.all(this.players.map(({id}) => getDataFromEndpoint(`players/${id}/stats/csgo`)))
                  .then(values => {
                      const data = [];
                      values.forEach((res) => data.push(res.data));
                      const keys = Object.keys(data[0].lifetime).filter(key => key !== 'Recent Results' && key !== 'Total Headshots %');
                      const datasets = {};

                      keys.forEach((key) => {
                          datasets[key] = {
                              label: key,
                              data: [],
                              backgroundColor: dynamicColors()
                          }
                      });

                      data.forEach(({lifetime}) => {
                          keys.forEach(key => {
                              datasets[key].data.push(Number(lifetime[key]));
                          })
                      });

                      this.chartdata = {
                          labels: this.labels,
                          datasets: Object.values(datasets)
                      }
                  });
            });
        },
    }
</script>

<style scoped>

</style>