<template lang="pug">
q-page.q-pa-md
  #pointer(ref='pointer')
  .container
    .flex.row.q-col-gutter-lg.items-center(style='margin-top: 100px')
      .col-xs-12.col-sm-6
        h1.text-h4 PoseNet Pointer <small style='font-size: 14px'>👷‍♂️ work in progress</small>
        p.text-h5.text-grey A set of tools to help you interact with the web and connected devices handsfree using your head!
        p
          q-btn(color='primary' size='xl' icon='videocam' label='Try It' @click='startPosenetPointer' :loading='isBusy.posenet')
        p.text-grey Special thanks to <a href="http://studioforcreativeinquiry.org/">The Studio for Creative Inquiry</a> for their<br>support for Handsfree.js, my other related project
      .col-xs-12.col-sm-6
        video(v-if='!posenetLoaded' src='https://i.imgur.com/3lBstel.mp4' style='width: 100%' controls loop autoplay)
        #debug-wrap(ref='debug')

  .container(style='margin-top: 200px')
    .flex.row.q-col-gutter-lg
      .col-xs12.col-sm-6.col-lg-4
        q-card
          q-card-section.bg-primary
            .text-h6 👨‍💻 Roadmap
            .text-subtitle2 These should be finished during <a href="https://twitter.com/search?q=(%23100DaysofCode)%20(from%3Aheyozramos)&src=typed_query">my #100DaysOfCode challenge</a>
          q-card-section
            ul
              li Publish code to NPM
              li Start documentation
              li Add page scrolling
              li Add custom face gesture recognition
              li Add custom hand gesture recognition
              li Create workshops or starter kits
              li Wrap as a Chrome Extension
              li Wrap as a mobile app
              li Integrate with P5.js
              li Integrate with A-Frame
              li Integrate with Babylon.js
              li Integrate with LMMS, FLStudio, or Ableton Live
              li Use deep learning to "learn" cursor position
              li Use deep learning to "learn" head pose
              li Use deep learning to add finger pointers
      .col-xs12.col-sm-6.col-lg-4
        q-card
          q-card-section.bg-primary
            .text-h6 📜 Changelog
            .text-subtitle2 Coming soon
          q-card-section
      .col-xs12.col-sm-6.col-lg-4
        q-card
          q-card-section.bg-primary
            .text-h6 🌐 Links
            .text-subtitle2 Take it further
          q-card-section
            ul
              li <a href="https://github.com/tensorflow/tfjs-models/tree/master/posenet">PoseNet on GitHub</a>
</template>

<script>
import PosenetPointer from "../projects/posenet-pointer";
import { mapState } from "vuex";

export default {
  name: "PoseNetPointer",

  computed: mapState(["posenetPointer", "isBusy"]),

  data: () => ({
    posenetLoaded: false
  }),

  methods: {
    /**
     * Initializes PoseNet Pointer
     */
    startPosenetPointer() {
      if (!this.posenetPointer) {
        this.posenetLoaded = true;
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