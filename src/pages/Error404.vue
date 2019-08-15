<template lang="pug">
.fixed-center.text-center
  p
    TensorMonkey
  p.text-faded
    | Sorry, nothing here...
    strong (404)
  q-btn(color='secondary' style='width:200px;' @click="$router.push('/')") Go back
</template>

<script>
import TensorMonkey from "../components/TensorMonkey";

export default {
  name: "Error404",

  components: { TensorMonkey }
};
</script>
