<template>
  <v-container>
    <D3BarChart
      ref="realtimeChart"
      :config="chart_config"
      :datum="chart_data"
      :title="chart_title"
      v-if="chart_data"
    ></D3BarChart>
    <div class="text-center loader">
      <v-progress-circular
        indeterminate
        v-if="loading"
        color="#E7B31F"
        size="150"
      ></v-progress-circular>
    </div>
  </v-container>
</template>

<script>
import { D3BarChart } from "vue-d3-charts";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      chart_title: "Top 10 Movies",

      chart_config: {
        key: "title",
        currentKey: "2004",
        values: ["vote_average"],
        axis: {
          yTicks: 3,
        },
        color: {
          default: "#E7B31F",
          current: "#E7B31F",
        },
      },
      chart_data: [],
      dummy: [
        { Rating: 1, production: 9613, year: "lagaan" },
        { Rating: 2, production: 6315, year: "2008" },
      ],
    };
  },
  methods: {
    ...mapActions(["getTopRatedMovies"]),
    topRatedMovies() {
      this.loading = true;
      this.getTopRatedMovies()
        .then((response) => {
          let array = response.data.results;
          for (let i = 0; i <= 10; i++) {
            this.chart_data.push(array[i]);
          }

          this.loading = false;
          this.snackbar = true;
          this.text = "Movies Found Successfully";
          this.color = "green";
        })
        .catch((error) => {
          this.loading = false;
          if (error.response.data.errors) {
            let errors = error.response.data.errors;

            for (const property in errors) {
              this.snackbar = true;
              this.text = error.response.data.status_message;
              this.color = "red";
            }
          } else {
            this.snackbar = true;
            this.text = error.response.data.status_message;
            this.color = "red";
          }
        });
    },
    sort() {},
  },
  components: {
    D3BarChart,
  },
  created() {
    this.topRatedMovies();
  },
  watch: {
    chart_data() {
      this.drawChart();
    },
  },
};
</script>

<style lang="scss" scoped>
.loader {
  margin-top: 200px;
}
</style>
