<template>
  <b-container class="bv-example-row mt-3 text-center">
    <h1 class="underline-hotpink">Apart</h1>
    <v-row>
      <v-col cols="12">
        <apart-search-bar></apart-search-bar>
      </v-col>
    </v-row>
    <v-row rows="100">
      <v-col cols="6" align="center">
        <apart-map class="map"></apart-map>
      </v-col>
      <v-col cols="6" align="left">
        <apart-list />
        <apart-detail />
        <apart-detail2 />
      </v-col>
    </v-row>
  </b-container>
</template>

<script>
import ApartSearchBar from "@/components/apart/ApartSearchBar.vue";
import ApartList from "@/components/apart/ApartList.vue";
import ApartDetail from "@/components/apart/ApartDetail.vue";
import ApartDetail2 from "@/components/apart/ApartDetail2.vue";
import ApartMap from "@/components/apart/ApartMap.vue";
export default {
  name: "ApartView",
  components: {
    ApartSearchBar,
    ApartList,
    ApartDetail,
    ApartDetail2,
    ApartMap,
  },
  data() {
    return {
      map: null,
    };
  },
};
</script>
<style scoped>
#map {
  width: 100%;
  height: 100%;
}
/* .underline-hotpink {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(231, 27, 139, 0.3) 30%
  );
} */
</style>
