<template>
  <base-card dark>
    <v-img
      :src="require('@/assets/img/banner.jpg')"
      class="grey lighten-2"
      height="600"
      width="100%"
    >
      <v-row class="fill-height pa-3" align="center">
        <v-col cols="10" md="7" offset-md="1">
          <h1 class="display-3 font-weight-bold" id="font-text">AptDeal</h1>

          <div class="subheading pl-2 pt-5 display-1" id="font-text">
            Apart 시세 및 주변 편의시설까지 한 눈에 확인하세요! <br />
          </div>
        </v-col>
      </v-row>
    </v-img>
  </base-card>
</template>

<script>
export default {
  name: "HomeBanner",
};
</script>

<style scoped>
#font-text {
  color: #000000;
}
</style>
