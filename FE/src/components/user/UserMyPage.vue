<template>
  <v-card>
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>내정보</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron>
          <template #lead> 내 정보 확인페이지입니다. </template>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">아이디</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.userid }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이름</b-col
              ><b-col cols="4" align-self="start">{{
                userInfo.username
              }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이메일</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.email }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">가입일</b-col
              ><b-col cols="4" align-self="start">{{
                userInfo.joindate
              }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <v-btn
            color="primary"
            href="#"
            class="mr-1"
            @click="moveModifyUserInfo"
            >정보수정</v-btn
          >
          <v-btn color="danger" href="#" @click="removeUserInfo"
            >회원탈퇴</v-btn
          >
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import httpCommon from "../../util/http-common";
const userStore = "userStore";
export default {
  name: "UserMyPage",
  components: {},
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  methods: {
    ...mapMutations(userStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    moveIndex() {
      this.$router.push({ name: "home" });
    },
    moveModifyUserInfo() {
      this.$router.replace({
        name: "userupdate",
        params: { userid: this.userInfo.userid },
      });
    },
    removeUserInfo() {
      if (confirm("정말로 탈퇴하시겠습니까?")) {
        httpCommon.delete(`/user/${this.userInfo.userid}`).then(({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "회원 탈퇴가 완료되었습니다.";
          }
          this.SET_IS_LOGIN(false);
          this.SET_USER_INFO(null);
          sessionStorage.removeItem("access-token");
          alert(msg);
          this.$router.push({ name: "home" });
        });
      }
    },
  },
};
</script>

<style></style>
