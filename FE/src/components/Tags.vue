<template></template>

<script>
// Utilities
import { mapGetters } from "vuex";

export default {
  name: "Tags",

  computed: {
    ...mapGetters(["categories"]),
  },
};
</script>
