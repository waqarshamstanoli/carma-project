<template>
<v-container>
  <v-card tile width="100%"  color="transparent" class="mt-16" v-if="movie" >
  <v-img
              :src="require('../../src/assets/card2.jpg')"
              class=""
              width="100%"
              height="100%"
            >
<div  class="glass">
  <v-row>
    <v-col  cols="12" lg="3" md="12" sm="12">
       <v-img src="../../src/assets/fast.jpg"  width="100%"></v-img>
    </v-col>
    <v-col  cols="12" lg="9" md="12" sm="12">
       <v-card-title class="white--text">{{movie.title}}<span class="ml-2">({{movie.release_date.split("-")[0]}})</span> <v-chip color="#E7B31F" class="ml-2 px-5">{{movie.status}}</v-chip><span class="ml-5"> {{movie.runtime}}</span> </v-card-title>
       <v-card-subtitle  class="white--text">{{movie.original_language}}</v-card-subtitle>
       <v-card-actions> <v-rating
                
                color="#E7B31F"
        v-model="movie.vote_average"
        size="15"
        class="ml-auto"
        
      ></v-rating> <v-btn  tile class="text-capitalize pb-2 pt-2  white--text ml-auto px-6 mr-5 button" @click="submitRating(movie.id)"  color="#E7B31F">Submit</v-btn></v-card-actions>
       
  <v-card tile width="80%" class="elevation-0 ml-5" color="transparent"><p class="white--text">{{movie.overview}}</p></v-card>
 
    </v-col>
  </v-row>

 
</div>
</v-img>
  </v-card>
  <v-card tile width="100%" height="300" color="transparent" v-else>
    <v-card-title class="justify-center white--text">No items were found</v-card-title>
    </v-card>
  <div class="text-center loader"> <v-progress-circular
      indeterminate
      v-if="loading"
       color="#E7B31F"
      size="150"
      
    ></v-progress-circular> </div>
 <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      :color="color"
    > {{ text }}</v-snackbar>
 
</v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      movie: "",
      snackbar: false,
      loading: false,
      text: "My timeout is set to 2000.",
      timeout: 2000,
      color: "",
      rating: {
        value: "",
      },
    };
  },
  methods: {
    ...mapActions(["getMoviesDetails", "rateMovie"]),
    showDetails(movieID) {
      this.loading = true;
      this.getMoviesDetails(movieID)
        .then((response) => {
          this.loading = false;
          this.movie = response.data;
          this.snackbar = true;
          this.text = "Found Successfully";
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
    submitRating(id) {
      this.loading = true;

      // this.rating.value=this.movie.vote_average
      let data = {
        value: this.movie.vote_average,
        id: id,
      };
      console.log(data);
      this.rateMovie(data)
        .then((response) => {
          this.loading = false;
          this.movie = response.data;
          this.snackbar = true;
          this.text = "Found Successfully";
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
  },
  mounted() {
    let movieID = this.$route.params.id;
    this.showDetails(movieID);
  },
};
</script>
<style>
.glass {
  position: relative;
  background: inherit;
  overflow: hidden;
  top: 150px;
  width: 80%;
  height: 50%;
  border-radius: 1px;
  box-shadow: 0 6px 0px rgba(0, 0, 0, 0.1), 0 6px 0px rgba(0, 0, 0, 0.1);
  z-index: 1;
}
.glass:before {
  content: "";
  position: absolute;
  background: inherit;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: -20px;
  box-shadow: inset 0 0 500px rgba(255, 255, 255, 0.4);
  filter: blur(10px);
  z-index: -1;
}
.loader {
  margin-top: 200px;
}
</style>
