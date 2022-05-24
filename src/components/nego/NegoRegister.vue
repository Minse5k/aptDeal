<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글작성</h3></b-alert>
      </b-col>
    </b-row>
    <board-input-item type="register" />
  </b-container>
</template>

<script>
import BoardInputItem from "@/components/nego/item/NegoInputItem.vue";

export default {
  name: "negoWrite",
  components: {
    BoardInputItem,
  },
};
</script>

<style></style>
