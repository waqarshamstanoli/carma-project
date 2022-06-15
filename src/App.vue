<template>
  <v-app>
    <v-app-bar app color="#000" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/unnamed-removebg-preview.png"
          transition="scale-transition"
          width="170"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/" tile text> Home </v-btn>
      <v-btn to="/details/15037" text tile> Details </v-btn>
      <v-btn to="/stats" text tile> Stats </v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="background">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style>
.background {
  background-image: url("../src/assets/Dark.webp");
  background-size: cover;
  /* opacity:0.5 */
}
.v-text-field--outlined fieldset {
  color: #ffffff !important;
  border-radius: 0px !important;
}
.v-input input {
  max-height: 32px;
  color: #ffffff !important;
}
.date.v-input input {
  max-height: 32px;
  color: #ffffff !important;
}
.v-select__selection,
.v-select__selection--comma,
.v-select.v-text-field input {
  color: #ffffff !important;
}
.v-text-field--outlined.v-input--dense .v-label {
  color: #ffffff !important;
}
.v-icon.notranslate.mdi.mdi-menu-down.theme--light {
  color: #ffffff !important;
}
</style>
