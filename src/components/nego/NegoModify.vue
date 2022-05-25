<template>
  <v-card
    ><b-row>
      <b-col>
        <b-alert show><h3>글수정</h3></b-alert>
      </b-col>
    </b-row>
    <board-input-item type="modify" />
  </v-card>
</template>

<script>
import negoInputItem from "@/components/nego/item/NegoInputItem.vue";

export default {
  name: "negoModify",
  components: {
    negoInputItem,
  },
};
</script>

<style></style>
