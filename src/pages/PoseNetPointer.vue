<template lang="pug">
q-page.q-pa-md
  .container
    .flex.row.q-col-gutter-lg.items-center(style='margin-top: 100px')
      .col-xs-12.col-sm-6
        h1.text-h4 PoseNet Pointer
        p.text-h5.text-grey A set of tools to help you interact with the web and connected devices handsfree using your head.
        p
          q-btn(color='primary' size='xl' icon='videocam' label='Try It' @click='startPosenetPointer')
      .col-xs-12.col-sm-6
</template>

<script>
import PosenetPointer from "../projects/posenet-pointer";
import { mapState } from "vuex";

export default {
  name: "PoseNetPointer",

  computed: mapState(["posenetPointer"]),

  methods: {
    startPosenetPointer() {
      if (!this.posenetPointer) {
        const pointer = new PosenetPointer();
        this.$store.commit("set", ["posenetPointer", pointer]);

        pointer.start();
      }
    }
  }
};
</script>