<template lang="pug">
q-page.q-pa-md
  #pointer(ref='pointer')
  .container
    .flex.row.q-col-gutter-lg.items-center(style='margin-top: 100px')
      .col-xs-12.col-sm-6
        h1.text-h4
          | PoseNet Pointer 
          a.q-pl-sm(href='https://npmjs.com/package/posenet-pointer' target='_blank')
            img(src='https://img.shields.io/npm/v/posenet-pointer')
        p.text-h5.text-grey Quickly add "face pointers" to your projects with TensorFlow's PoseNet
        p
          q-btn(color='primary' size='xl' icon='videocam' label='Try It' @click='startPosenetPointer' :loading='isBusy.posenet')
        p
          a.q-pr-sm(href='https://github.com/ozramos/posenet-pointer')
            img(src='https://img.shields.io/github/last-commit/ozramos/posenet-pointer')
          a.q-pr-sm(href='https://npmjs.com/package/posenet-pointer')
            img(src='https://img.shields.io/bundlephobia/min/posenet-pointer')
          a(href='https://github.com/ozramos/posenet-pointer')
            img(src='https://img.shields.io/github/stars/ozramos/posenet-pointer?style=social')
        p.text-grey Special thanks to <a href="http://studioforcreativeinquiry.org/">The Studio for Creative Inquiry</a> for their<br>support for Handsfree.js, my other related project
      .col-xs-12.col-sm-6
        video(v-if='!posenetLoaded' src='https://i.imgur.com/3lBstel.mp4' style='width: 100%' controls loop autoplay)
        #debug-wrap(ref='debug')

  .container(style='margin-top: 200px')
    .flex.row.q-col-gutter-lg
      .col
        q-card
          q-card-section.bg-primary
            h2 Getting Started
          q-card-section.text-body1(style='padding-top: 20px')
            p <strong>PoseNet Pointer</strong> is a JavaScript library that adds face-controlled pointers ("face pointers") to your projects in just a few lines of code. It sits on top of <a href="https://github.com/tensorflow/tfjs-models/tree/master/posenet">PoseNet, a human pose estimator</a> which among other things returns 5 head keypoints for your eyes, ears, and nose. From these 5 keypoints, PoseNet Pointer is able to roughly determine your head's pose - it's Yaw, Pitch, and Roll - which is what allows us to do interesting things like determine where on the screen to place the pointer!

          .row.q-col-gutter-lg(style='padding: 20px')
            .col-xs-12.col-sm-6.col-md-4
              q-list(bordered separator)
                q-item(clickable ripple :active='subroute === "install"' @click='subroute = "install"')
                  q-item-section Installing
                q-item(clickable ripple :active='subroute === "configure"' @click='subroute = "configure"')
                  q-item-section Configuring
            .col-xs-12.col-sm-6.col-md-8
              q-card
                q-card-section(v-if='subroute === "install"')
                  h5 Getting Started
                  p via HTML (adds <code>PosenetPointer</code> to global namespace)
                  highlight-code(lang='html').
                    &lt;!-- Either load a specific version (recommended)... --&gt;
                    &lt;script defer src="https://unpkg.com/posenet-pointer@0.0.1"&gt;&lt;/script&gt;

                    &lt;!-- ...or use the latest (not recommended yet 😅) --&gt;
                    &lt;script defer src="https://unpkg.com/posenet-pointer"&gt;&lt;/script&gt;

                  p or via Node
                  highlight-code(lang='javascript').
                    import PosenetPointer from 'posenetPointer'

                  q-separator.q-mt-xl
                  p.q-mt-xl In either case, you can then get started with
                  highlight-code(lang='javascript').
                    // Instantiate and start
                    const pointer = new PosenetPointer()
                    pointer.start()

                    // Grab a reference to a pointer element
                    $pointer = document.querySelector('#pointer')

                    // Adds a callback called "placePointer" that's called on every frame
                    pointer.use('placePointer', poses => {
                      $pointer.style.top = `${poses[0].pointedAt.y}px`;
                      $pointer.style.left = `${poses[0].pointedAt.x}px`;
                    })

                q-card-section(v-if='subroute === "configure"')
                  h5 Configure
                  highlight-code(lang='javascript').
                    {
                      // The video tag to contain the webcam stream
                      // - If null, one will be created
                      video: document.createElement('video'),

                      // The canvas tag to contain the green/magenta debug info
                      // - If null, one will be created
                      canvas: document.createElement('canvas'),

                      // The container element that contains both the video/canvas
                      // - If null, one will be created
                      target: document.createElement('p'),

                      // Whether or not to display the video tag and debug canvas
                      debug: false,

                      // Which camera to use
                      // @see https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode
                      facingMode: "user",

                      // How many poses to use as a "buffer" for smoothing
                      // lower number use less smoothing
                      poseStackSize: 8,

                      // Posenet config
                      // @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
                      posenet: {
                        architecture: "MobileNetV1",
                        multiplier: 0.75,
                        maxUsers: 1,
                        minPoseConfidence: 0.1,
                        minPartConfidence: 0.5,
                        outputStride: 16,
                        inputResolution: 257,
                        nmsRadius: 20,
                        scoreThreshold: 0.5
                      }
                    }                  

  .container
    .flex.row.q-col-gutter-lg
      .col-xs12.col-sm-6.col-lg-4
        q-card
          q-card-section.bg-primary
            .text-h6 👨‍💻 Roadmap
            .text-subtitle2 These should be finished during <a href="https://twitter.com/search?q=(%23100DaysofCode)%20(from%3Aheyozramos)&src=typed_query">my #100DaysOfCode challenge</a>
          q-card-section
            ul
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
            ul
              li <strong>8/16</strong> - Start documentation
              li <strong>8/16</strong> - Publish code to NPM
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
import PosenetPointer from "posenet-pointer";
import { mapState } from "vuex";

export default {
  name: "PoseNetPointer",

  computed: mapState(["posenetPointer", "isBusy"]),

  data: () => ({
    posenetLoaded: false,
    subroute: "install"
  }),

  methods: {
    /**
     * Initializes PoseNet Pointer
     */
    startPosenetPointer() {
      // @FIXME We shouldn't need this to do this
      if (!window.pointer || !window.pointer.options) {
        this.posenetLoaded = true;
        let pointer = new PosenetPointer({
          debug: true,
          target: this.$refs.debug
        });

        if (pointer.isSupported) {
          window.pointer = pointer;
          this.$store.commit("set", ["isBusy.posenet", true]);

          // Start Posenet
          pointer.start(() => {
            this.$store.commit("set", ["isBusy.posenet", false]);
            pointer.options.canvas.style.height = `${pointer.options.video.clientHeight}px`;
          });

          // Window listener
          window.addEventListener("posenetPointerUpdated", context => {
            this.onUpdate(context);
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
      this.$refs.pointer.style.left = `${window.pointer.poses[0].pointedAt.x}px`;
      this.$refs.pointer.style.top = `${window.pointer.poses[0].pointedAt.y}px`;
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