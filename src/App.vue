<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { pick } from "lodash";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebase.config.json";
import { mapState } from "vuex";

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

export default {
  name: "App",

  computed: mapState(["user"]),

  /**
   * Handle autologin/out
   */
  mounted() {
    window.app = this;
    this.$root.$on("firebaseLogin", this.firebaseLogin);
    this.$root.$on("firebaseLogout", this.firebaseLogout);
    firebase.auth().onAuthStateChanged(user => this.onFirebaseAuthChange(user));
  },

  methods: {
    /**
     * Manually log into Firebase
     */
    firebaseLogin() {
      this.$store.commit("set", ["isBusy.app", true]);

      firebase
        .auth()
        .signInWithPopup(provider)
        .catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;

          this.$q.notify({
            message: `{${errorCode}} Error signing in: ${errorMessage}`,
            color: "negative"
          });
        })
        .finally(() => {
          this.$store.commit("set", ["isBusy.app", false]);
        });
    },

    /**
     * Logout
     */
    firebaseLogout() {
      firebase
        .auth()
        .signOut()
        .catch(error => {
          let errorCode = error.code;
          let errorMessage = error.message;

          this.$q.notify({
            message: `{${errorCode}} Error signing in: ${errorMessage}`,
            color: "negative"
          });
        });
    },

    /**
     * Handle login and auto
     */
    onFirebaseAuthChange(user) {
      if (user) {
        this.$store.commit("set", [
          "user",
          pick(user, ["displayName", "photoURL", "uid"])
        ]);

        this.$q.notify({
          message: `Welcome back ${user.displayName}`,
          avatar: user.photoURL,
          color: "positive"
        });

        this.$root.$emit("firebaseLoggedIn");
      } else {
        if (this.user.uid) {
          this.$q.notify({
            message: `You have been logged out`,
            color: "positive"
          });
        }
        this.$store.commit("set", ["user", {}]);
      }
    }
  }
};
</script>