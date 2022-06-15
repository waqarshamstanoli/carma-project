<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="3" md="12" sm="12" offset-lg="5">
        <v-text-field
          outlined
          dense
          label="Search Movies"
          v-model="searchMovie"
        ></v-text-field>
      </v-col>
      <v-col cols="12" lg="2" md="12" sm="12">
        <v-btn
          block
          tile
          class="text-capitalize pb-2 pt-2 white--text ml-auto px-6 mr-5 button"
          @click="search()"
          color="#E7B31F"
          >Search</v-btn
        >
      </v-col>
      <v-col cols="12" lg="2" md="12" sm="12">
        <v-select
          :items="items"
          outlined
          dense
          v-model="selected"
          label="Sort By"
          @input="sort()"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        lg="4"
        md="3"
        sm="6"
        v-for="(movie, index) in movies"
        :key="index"
      >
        <v-card
          tile
          color="rgb(222, 222, 222, 0.2)"
          class="card-outer"
          height="100%"
        >
          <v-img
            :src="require('../../src/assets/card.png')"
            class=""
            width="100%"
            height="200"
          >
            <v-card-title class="white--text">{{ movie.name }} </v-card-title>
            <v-card-subtitle>
              <span class="white--text mt-5" v-if="movie.description">
                {{ movie.description }}
              </span>
              <span class="white--text mt-5" v-else
                >Description not available</span
              >
            </v-card-subtitle>

            <v-card-actions class="card-actions">
              <v-btn
                color="#E7B31F"
                small
                tile
                class="white--text px-6 text-capitalize ml-auto mr-2"
                @click="changeRoute(movie.id)"
                >View Details</v-btn
              >
            </v-card-actions>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center loader">
      <v-progress-circular
        indeterminate
        v-if="loading"
        color="#E7B31F"
        size="150"
      ></v-progress-circular>
    </div>

    <v-snackbar v-model="snackbar" :timeout="timeout" :color="color">
      {{ text }}</v-snackbar
    >
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      searchMovie: "",
      items: ["A-Z"],
      colorr: "green",

      selected: "",
      movies: [],
      snackbar: false,
      text: "My timeout is set to 2000.",
      timeout: 2000,
      color: "",
      loading: "false ",
    };
  },
  methods: {
    ...mapActions(["getMovies", "searchMovies"]),

    sort() {
      if (this.selected == "A-Z") {
        this.sortA_Z();
      }
    },
    sortA_Z() {
      const sort_by = (field, reverse, primer) => {
        const key = primer
          ? function (x) {
              return primer(x[field]);
            }
          : function (x) {
              return x[field];
            };

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
          return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
        };
      };
      console.log(
        this.movies.sort(sort_by("name", false, (a) => a.toUpperCase()))
      );
    },

    showMovies() {
      this.loading = true;
      this.getMovies()
        .then((response) => {
          this.loading = false;
          this.movies = response.data.results;

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
    search() {
      this.loading = true;
      this.searchMovies(this.searchMovie)
        .then((response) => {
          this.loading = false;
          this.movies = response.data.results;
          this.movies2 = response.data.results;
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
    changeRoute(id) {
      this.$router.push({
        path: "/details/" + id,
        params: {
          movie_Id: id,
        },
      });
    },
  },
  mounted() {
    this.showMovies();
  },
};
</script>
<style scoped>
.card-outter {
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  bottom: 0;
  right: 0;
}
.loader {
  margin-top: 200px;
}
</style>
