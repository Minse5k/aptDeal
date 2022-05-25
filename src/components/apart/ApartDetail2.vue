<template>
  <v-card v-if="nameApt">
    <v-card-title class="subheading font-weight-bold">
      {{ nameApt.apartmentname }} 아파트
    </v-card-title>
    <v-list dense>
      <v-list-item>
        <v-list-item-content>법정동:</v-list-item-content>
        <v-list-item-content class="align-end">
          {{ nameApt.dong }}
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>층 수:</v-list-item-content>
        <v-list-item-content class="align-end">
          {{ nameApt.floor }}층
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>거래금액:</v-list-item-content>
        <v-list-item-content class="align-end">
          {{ nameApt.dealamount }}만 원
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
const apartStore = "apartStore";
export default {
  name: "ApartDetail",
  computed: {
    ...mapState(apartStore, ["nameApt"]),
    // house() {
    //   return this.$store.state.house;
    // },
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style></style>
