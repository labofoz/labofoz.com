<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase.config.json";

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

export default {
  name: "App",

  mounted() {
    window.app = this;
    this.$root.$on("firebaseLogin", this.firebaseLogin);
  },

  methods: {
    firebaseLogin() {
      this.$store.commit("set", ["isBusy.app", true]);

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // let token = result.credential.accessToken;
          // let user = result.user;
        })
        .catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;

          console.log(`{${errorCode}} Error signing in: ${errorMessage}`);
        })
        .finally(() => {
          this.$store.commit("set", ["isBusy.app", false]);
        });
    }
  }
};
</script>

<style>
</style>
