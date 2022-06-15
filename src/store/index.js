import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
     getMovies({ commit, state }, ) {
       let url = "https://api.themoviedb.org/3/movie/5/lists"
      return new Promise((resolve, reject) => {
        axios
        .get(url, { params: {
          
          api_key: '5769d2616ceafd39180c415c96fb4294',
          language:'en-US',
          page:1
        }}   )
          .then(function (response) {
            resolve(response);
            
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    getMoviesDetails({ commit, state },movieID ) {
      let id =movieID
      let url = "https://api.themoviedb.org/3/movie/" + id
      return new Promise((resolve, reject) => {
        axios
        .get( url, { params: {
          
          api_key: '5769d2616ceafd39180c415c96fb4294',
          language:'en-US',
        }}  )
          .then(function (response) {
            resolve(response);
          
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    getTopRatedMovies({ commit, state } ) {
      
      let url = "https://api.themoviedb.org/3/movie/top_rated" 
      return new Promise((resolve, reject) => {
        axios
        .get( url, { params: {
          
          api_key: '5769d2616ceafd39180c415c96fb4294',
          language:'en-US',
          page:1
        }}  )
          .then(function (response) {
            resolve(response);
          
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    searchMovies({ commit, state },movie ) {
      let query=movie
      let url = "https://api.themoviedb.org/3/search/" +query 
      return new Promise((resolve, reject) => {
        axios
        .get( url, { params: {
          api_key: '5769d2616ceafd39180c415c96fb4294',
          // language:'en-US',
          page:1,
          include_adult:false
        }}  )
          .then(function (response) {
            resolve(response);
          
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
    rateMovie({ commit, state },payload ) {
      let config = {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          api_key: '5769d2616ceafd39180c415c96fb4294',
        },
      };
      let movie_id=payload.id
      delete payload["id"];
      console.log("payload",payload,movie_id)
     
      let url = "https://api.themoviedb.org/3/search/"+ movie_id  
      return new Promise((resolve, reject) => {
        axios
        .post( url, payload,config )
          .then(function (response) {
            resolve(response);
          
          })
          .catch(function (error) {
            reject(error);
          });
      });
    }
  },
  modules: {
  }
})
