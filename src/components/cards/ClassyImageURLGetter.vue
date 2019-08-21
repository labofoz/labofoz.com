<template lang="pug">
q-card
  q-card-section(style='padding: 0')
    <iframe height=200 src="https://www.youtube.com/embed/XrvAm9VQhgU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  q-separator
  q-card-section.bg-primary
    .text-h6 Classy Image URL Getter
    .text-subtitle2 A bookmarklet to quickly scrape URLs from Google image results for classification problems and more!
  q-card-section
    .q-pt-lg
      a.q-pr-sm(href="https://github.com/ozramos/classy-image-url-getter")
        img(src="https://img.shields.io/github/release/ozramos/classy-image-url-getter")
      a.q-pr-sm(href="https://github.com/ozramos/classy-image-url-getter")
        img(src="https://img.shields.io/github/last-commit/ozramos/classy-image-url-getter")
      a.q-pr-sm(href='https://github.com/ozramos/classy-image-url-getter')
        img(src='https://img.shields.io/github/stars/ozramos/classy-image-url-getter?style=social')
  q-separator
  q-card-actions
    q-space
    q-btn(type='a' color='primary' href='https://forums.fast.ai/t/classy-image-url-getter-bookmarklet/52761/2') Explore This
</template>

<script>
export default {
  name: "ClassyImageURLGetter"
};
</script>