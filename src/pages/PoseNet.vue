<template lang="pug">
q-page.q-pa-md
  .container
    h1 PoseNet
    p.text-h4.text-grey The following is a collection of some of my <a href="https://github.com/tensorflow/tfjs-models/tree/master/posenet">PoseNet</a>-related projects.

  .container
    .row.q-col-gutter-lg
      .col-xs-12.col-sm-6.col-lg-4
        q-card
          q-card-section.bg-primary
            .text-h6 PoseNet Pointer
            .text-subtitle2 A set of tools to help you interact with the web and connected devices handsfree using your head.
          q-seperator
          q-card-actions
            q-space
            q-btn(color='primary' :to='{name: "PoseNetPointer"}') Explore This
</template>

<script>
export default {
  name: "PoseNet"
};
</script>