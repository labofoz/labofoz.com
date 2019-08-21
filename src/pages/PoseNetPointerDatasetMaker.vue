<template lang="pug">
q-page.q-pa-md
  .container
    .flex.row.q-col-gutter-lg.items-center(style='margin-top: 100px')
      .col-xs-12.col-sm-6
        h1.text-h4 PoseNet Pointer Dataset Maker
        p.text-h5.text-grey A tool to quickly create labeled datasets from PoseNet pose keypoints
        p
          q-input(v-model='sampleSize' label='Number of samples')
        p
          q-btn(v-if='!isCollecting' size='lg' color='primary' @click='startPosenet' :loading='isLoadingPosenet') Start Collecting Data
          q-btn(v-else size='lg' color='negative' @click='isCollecting = false') Stop
      .col-xs-12.col-sm-6
        q-card
          q-card-section
            #scene-wrap
              canvas#scene(ref='scene' width=640 height=480)
              canvas#overlay(ref='overlay' width=640 height=480)
</template>

<script>
import SceneSetup from "../assets/js/scene-setup.js";
import * as Posenet from "@tensorflow-models/posenet";

export default {
  name: "PoseNetPointerDatasetMaker",

  data: () => ({
    isCollecting: false,

    sampleSize: 1000,

    isLoadingPosenet: false,

    posenet: null,

    samples: [],

    // Synthetic data
    synthetic: {
      yaw: 0,
      pitch: 0,
      roll: 0,
      x: 0,
      y: 0,
      z: 0
    },

    // The Babylon scene
    Scene: null
  }),

  mounted() {
    this.Scene = new SceneSetup(this.$refs.scene);
    this.$inferCtx = this.$refs.overlay.getContext("2d");
  },

  methods: {
    /**
     * Starts posenet and draws keypoints on every frame
     */
    async startPosenet() {
      let hasError = false;
      if (this.posenet) {
        this.isCollecting = true;
        return;
      }

      // Load posenet and bail if no connection
      this.isLoadingPosenet = true;
      try {
        // eslint-disable-next-line
        this.posenet = await new Posenet.load();
      } catch (e) {
        hasError = true;
        this.$q.notify({
          message: `😔 Error loading posenet, please try again => ${e}`,
          color: "negative"
        });
      }
      this.isLoadingPosenet = false;
      this.isCollecting = true;
      if (hasError) return;

      // Make sure overlay's canavas matches babylon's
      this.$refs.overlay.width = this.$inferCtx.width = this.$refs.scene.width;
      this.$refs.overlay.height = this.$inferCtx.height = this.$refs.scene.height;

      // Use PoseNet
      this.Scene.use("getPose", async () => {
        if (this.isCollecting & (this.samples.length < this.sampleSize)) {
          // Reposition head
          this.Scene.head.rotation.x =
            ((Math.random() * 70 - 35) * Math.PI) / 180;
          this.Scene.head.rotation.y =
            ((Math.random() * 70 - 35) * Math.PI) / 180;
          this.Scene.head.rotation.z =
            ((Math.random() * 70 - 35) * Math.PI) / 180;
          this.Scene.head.position.x = Math.random() * -10 + 5;
          this.Scene.head.position.y = Math.random() * -6 + 3;
          this.Scene.head.position.z = Math.random() * -20;

          this.Scene.scene.render();

          this.pose = await this.posenet.estimateSinglePose(this.$refs.scene);
          this.drawKeypoints();
        }
      });
    },

    /**
     * Draws the detected keypoints
     */
    drawKeypoints() {
      this.$inferCtx.clearRect(
        0,
        0,
        this.$refs.overlay.width,
        this.$refs.overlay.height
      );
      for (let i = 0; i < 5; i++) {
        // @TODO make this configurable
        if (this.pose.keypoints[i].score > 0.7) {
          switch (i) {
            case 0:
              this.$inferCtx.fillStyle = "#f00";
              break;
            case 1:
              this.$inferCtx.fillStyle = "#0f0";
              break;
            case 2:
              this.$inferCtx.fillStyle = "#00f";
              break;
            case 3:
              this.$inferCtx.fillStyle = "#ff0";
              break;
            case 4:
              this.$inferCtx.fillStyle = "#f0f";
              break;
          }

          this.$inferCtx.beginPath();
          this.$inferCtx.arc(
            this.pose.keypoints[i].position.x,
            this.pose.keypoints[i].position.y,
            8,
            0,
            2 * Math.PI
          );
          this.$inferCtx.fill();
        }
      }
    }
  }
};
</script>


<style lang="stylus">
canvas {
  width: 100%;
  height: 100%;
  position: relative;
}

#babylonjsLoadingDiv {
  display: none !important;
}

#scene-wrap {
  position: relative;
}

#overlay {
  position: absolute;
  top: 0;
  left: 0;
}
</style>