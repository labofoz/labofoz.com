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
      q-btn(color='secondary' @click='isVisible.login = true') Login
  
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
        q-btn(color='primary') Login with Firebase
  
  //- Route
  q-page-container
    router-view
</template>

<script>
import { openURL } from "quasar";
import pkg from "../../package.json";

export default {
  name: "Main",
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
    openURL
  }
};
</script>

<style>
</style>
