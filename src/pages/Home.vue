<template lang="pug">
q-page.q-pa-md
  .container
    .flex.row.q-col-gutter-lg.items-center(style='margin-top: 100px')
      .col-xs-12.col-sm-6
        .text-center
          img(style='margin-top: -100px' src='~/src/statics/favicon.png')
        h1.text-h4.text-center Hi there I'm Oz Ramos 👋
        p.text-h5 I like <strong>JavaScript</strong> and <strong>Computer Vision</strong> and I'm using this site to share my Projects, Notes, Models, Dailies, and more!
      .col-xs-12.col-sm-6
        iframe(height="315" src="https://www.youtube.com/embed/5z9nPtM-_l4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)

    .note(style='margin-top: 100px')
      p.note-title More coming soon
      p I'm still getting everything put together. Come back soon or follow me on <a href="https://twitter.ozramos.com">Twitter @HeyOzRamos</a>

  .container
    h2 Recent Projects
    .row.q-col-gutter-lg
      .col-xs-12.col-sm-6.col-lg-4
        PoseNetPointerCard
      .col-xs-12.col-sm-6.col-lg-4
        ClassyImageURLGetter
      .col-xs-12.col-sm-6.col-lg-4
        PoseNetPointerDatasetMakerCard
</template>

<script>
import TensorMonkey from "../components/TensorMonkey.vue";
import PoseNetPointerCard from "../components/cards/PoseNetPointerCard";
import ClassyImageURLGetter from "../components/cards/ClassyImageURLGetter";
import PoseNetPointerDatasetMakerCard from "../components/cards/PoseNetPointerDatasetMakerCard";

export default {
  name: "PageIndex",
  components: {
    TensorMonkey,
    PoseNetPointerCard,
    ClassyImageURLGetter,
    PoseNetPointerDatasetMakerCard
  }
};
</script>

<style lang="stylus">
iframe {
  width: 100%;
}
</style>