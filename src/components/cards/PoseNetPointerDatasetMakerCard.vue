<template lang="pug">
q-card
  q-card-section(style='padding: 0')
    video(src='https://i.imgur.com/3fGGt1T.mp4' style='width: 100%' height=200 controls loop autoplay)
  q-separator
  q-card-section.bg-primary
    .text-h6 PoseNet Pointer Dataset Maker
    .text-subtitle2 A tool to quickly create labeled datasets from PoseNet pose keypoints
  q-separator
  q-card-actions
    q-space
    q-btn(color='primary' :to='{name: "PoseNetPointerDatasetMaker"}') Explore This
</template>

<script>
export default {
  name: "PoseNetPointerDatasetMakerCard"
};
</script>