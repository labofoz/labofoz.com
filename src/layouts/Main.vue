<template lang="pug">
q-layout(view='lHh Lpr lFf')
  //- Appbar
  q-header(elevated)
    q-toolbar
      q-btn(flat dense round @click='isVisible.sidebar = !isVisible.sidebar' aria-label='Menu')
        q-icon(name='menu')
      q-toolbar-title
        span Lab of Oz
        small(style='font-size: 12px; margin-left: 10px;') v{{ pkg.version }}
      q-btn(v-if='!user.uid' color='secondary' @click='isVisible.login = true') Login
      q-btn(v-else color='secondary' @click='firebaseLogout')
        q-avatar.q-mr-sm(size=20)
          img(:src='user.photoURL')
        | Logout
  
  //- Sidebar
  q-drawer(v-model='isVisible.sidebar' bordered content-class='bg-grey-2')
    q-list
      q-item-label(header) Essential Links
      q-item(v-for='(menu, key) in sidebar.menu' :key='key' :to='menu.to')
        q-item-section(avatar)
          q-icon(:name='menu.icon')
        q-item-section
          q-item-label {{menu.label}}
          q-item-label(v-if='menu.caption' caption) {{menu.caption}}
  
  //- Login
  q-dialog(v-model='isVisible.login')
    q-card
      q-card-section
        .text-h6 Login
      q-card-section
        p Registration is currently closed. If you'd like access then contact Oz on <a href="https://twitter.ozramos.com">Twitter @HeyOzRamos</a>
      q-card-actions
        q-btn(@click='isVisible.login = false') Cancel
        q-space
        q-btn(color='primary' :loading='isBusy.app' @click='firebaseLogin') Login with Firebase
  
  //- Route
  q-page-container
    router-view
</template>

<script>
import pkg from "../../package.json";
import { mapState } from "vuex";

export default {
  name: "Main",

  computed: mapState(["isBusy", "user"]),

  data() {
    return {
      pkg,
      isVisible: {
        login: false,
        sidebar: this.$q.platform.is.desktop
      },

      sidebar: {
        menu: [{ label: "Home", icon: "home", to: { name: "Home" } }]
      }
    };
  },

  methods: {
    firebaseLogin() {
      this.$root.$emit("firebaseLogin");
    },
    firebaseLogout() {
      this.$root.$emit("firebaseLogout");
    }
  }
};
</script>