<template lang="pug">
q-card
  q-card-section(style='padding: 0')
    video(src='https://i.imgur.com/3lBstel.mp4' style='width: 100%' controls loop autoplay)
  q-separator
  q-card-section.bg-primary
    .text-h6 PoseNet Pointer
    .text-subtitle2 Add "face pointers" to your projects with TensorFlow's PoseNet
  q-card-section
    .q-pt-lg
      a.q-pr-sm(href='https://npmjs.com/package/posenet-pointer' target='_blank')
        img(src='https://img.shields.io/npm/v/posenet-pointer')
      a.q-pr-sm(href='https://github.com/ozramos/posenet-pointer')
        img(src='https://img.shields.io/github/last-commit/ozramos/posenet-pointer')
      a(href='https://github.com/ozramos/posenet-pointer')
        img(src='https://img.shields.io/github/stars/ozramos/posenet-pointer?style=social')
  q-separator
  q-card-actions
    q-space
    q-btn(color='primary' :to='{name: "PoseNetPointer"}') Explore This
</template>

<script>
export default {
  name: "PoseNetPointerCard"
};
</script>