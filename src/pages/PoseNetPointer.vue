<template lang="pug">
q-page.q-pa-md
  .container
    .flex.row.q-col-gutter-lg.items-center(style='margin-top: 100px')
      .col-xs-12.col-sm-6
        h1.text-h4 PoseNet Pointer
        p.text-h5.text-grey A set of tools to help you interact with the web and connected devices handsfree using your head.
        p
          q-btn(color='primary' size='xl' icon='videocam' label='Try It' @click='startPosenetPointer' :loading='isBusy.posenet')
      .col-xs-12.col-sm-6
</template>

<script>
import PosenetPointer from "../projects/posenet-pointer";
import { mapState } from "vuex";

export default {
  name: "PoseNetPointer",

  computed: mapState(["posenetPointer", "isBusy"]),

  data: () => ({}),

  methods: {
    /**
     * Initializes PoseNet Pointer
     */
    startPosenetPointer() {
      if (!this.posenetPointer) {
        let pointer = new PosenetPointer({ debug: true });

        if (pointer.isSupported) {
          this.$store.commit("set", ["posenetPointer", pointer]);
          this.$store.commit("set", ["isBusy.posenet", true]);

          pointer.start(() => {
            this.$store.commit("set", ["isBusy.posenet", false]);
          });
        } else {
          this.$q.notify({
            message: "WebGL is not supported on your device",
            color: "negative"
          });
        }
      }
    }
  }
};
</script>