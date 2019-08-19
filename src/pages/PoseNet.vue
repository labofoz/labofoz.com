<template lang="pug">
q-page.q-pa-md
  .container
    h1 PoseNet
    p.text-h4.text-grey The following is a collection of some of my <a href="https://github.com/tensorflow/tfjs-models/tree/master/posenet">PoseNet</a>-related projects.

  .container
    .row.q-col-gutter-lg
      .col-xs-12.col-sm-6.col-lg-4
        PoseNetPointerCard
      .col-xs-12.col-sm-6.col-lg-4
        PoseNetPointerDatasetMakerCard
</template>

<script>
import PoseNetPointerCard from "../components/cards/PoseNetPointerCard";
import PoseNetPointerDatasetMakerCard from "../components/cards/PoseNetPointerDatasetMakerCard";

export default {
  name: "PoseNet",

  components: { PoseNetPointerCard, PoseNetPointerDatasetMakerCard }
};
</script>