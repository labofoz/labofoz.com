<template lang="pug">
q-page.q-pa-md
  #pointer(ref='pointer')
  .container
    .flex.row.q-col-gutter-lg.items-center(style='margin-top: 100px')
      .col-xs-12.col-sm-6
        h1.text-h4 PoseNet Pointer
        p.text-h5.text-grey A set of tools to help you interact with the web and connected devices handsfree using your head.
        p
          q-btn(color='primary' size='xl' icon='videocam' label='Try It' @click='startPosenetPointer' :loading='isBusy.posenet')
      .col-xs-12.col-sm-6
        #debug-wrap(ref='debug')
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
        let pointer = new PosenetPointer({
          debug: true,
          target: this.$refs.debug
        });

        if (pointer.isSupported) {
          this.$store.commit("set", ["posenetPointer", pointer]);
          this.$store.commit("set", ["isBusy.posenet", true]);

          // Start Posenet
          pointer.start(() => {
            this.$store.commit("set", ["isBusy.posenet", false]);
            pointer.options.canvas.style.height = `${pointer.options.video.clientHeight}px`;
            window.addEventListener("posenetPointerUpdated", context =>
              this.onUpdate(context)
            );
          });
        } else {
          this.$q.notify({
            message: "WebGL is not supported on your device",
            color: "negative"
          });
        }
      }
    },

    /**
     * onUpdate
     */
    onUpdate(ev) {
      this.$refs.pointer.style.left = `${this.posenetPointer.poses[0].pointedAt.x}px`;
      this.$refs.pointer.style.top = `${this.posenetPointer.poses[0].pointedAt.y}px`;
    }
  }
};
</script>

<style lang="stylus">
#debug-wrap {
  position: relative;

  video, canvas {
    width: 100%;
    height: auto;
  }
}

#pointer {
  background: red;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  position: fixed;
  z-index: 99999;
}
</style>