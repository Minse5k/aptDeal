<template>
  <b-container class="bv-example-row mt-3">
    <div>
      <b-row>
        <b-col>
          <b-alert variant="secondary" show><h1>회원정보 수정</h1></b-alert>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="col-3"></b-col>
        <b-col class="col-6">
          <v-card class="text-center">
            <v-form>
              <v-col>
                <v-row class="ma-3">
                  <v-text-field
                    v-model="userInfo.userid"
                    label="ID"
                    required
                    id="userid"
                    name="userid"
                    @keyup="idcheck"
                  ></v-text-field>
                </v-row>
                <div class="mt-1" style="font-size: 10px">{{ idresult }}</div>

                <v-row class="ma-3">
                  <v-text-field
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="userInfo.userpwd"
                    label="PASSWORD"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    required
                    id="userpwd"
                    name="userpwd"
                  ></v-text-field>
                </v-row>

                <v-row class="ma-3">
                  <v-text-field
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    label="CHECK PASSWORD"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    required
                    v-model="pwdcheck"
                    id="pwdcheck"
                    name="pwdcheck"
                  ></v-text-field>
                </v-row>

                <!-- 이름 한글 입력이 안됨,, -->
                <!-- https://yado.tistory.com/31 한글..?? -->
                <v-row class="ma-3">
                  <v-text-field
                    v-model="userInfo.username"
                    label="NAME"
                    type="String"
                    required
                  ></v-text-field>
                </v-row>

                <v-row class="ma-3">
                  <v-text-field
                    v-model="userInfo.email"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-row>
                <div class="text-sm-center">
                  <v-btn
                    color="primary"
                    elevation="2"
                    class="m-1 ma-3"
                    id="submitbtn"
                    @click="updateUserInfo"
                    >수정</v-btn
                  >
                  <v-btn
                    color="second"
                    elevation="2"
                    class="m-1 ma-3"
                    id="resetBrn"
                    type="reset"
                    @click="moveMyPage"
                    >취소</v-btn
                  >
                </div>
              </v-col>
            </v-form>
          </v-card>
        </b-col>
        <b-col class="col-3"></b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import http from "@/util/http-common";
const userStore = "userStore";
export default {
  name: "userupdate",
  data() {
    return {
      show1: false,
      show2: false,
      username: "",
      userid: "",
      email: "",
      userpwd: "",
      pwdcheck: "",
      isId: false,
      isPwd: false,
      idresult: "",
    };
  },
  components: {},
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  methods: {
    idcheck() {
      //id체크하는 api 필요
      http.get(`/user/idcheck/${this.userid}`).then(({ data }) => {
        if (data === "success") {
          this.idresult = "사용가능한 아이디입니다.";
          this.isId = true;
        } else {
          this.idresult = "사용중인 아이디입니다.";
          this.isId = false;
        }
      });
    },
    checkValue() {
      let err = true;
      let msg = "";
      err &&
        this.userPwd != this.pwdcheck &&
        ((msg = "입력하신 비밀번호가 다릅니다."), (err = false));
      if (!err) alert(msg);
      else this.registUser();
    },
    moveMyPage() {
      this.$router.push({ name: "mypage" });
    },
    updateUserInfo() {
      if (!this.userInfo.userpwd) {
        alert("수정할 비밀번호를 입력하세요");
      } else {
        http
          .put(`/user/`, {
            userid: this.userInfo.userid,
            userpwd: this.userInfo.userpwd,
            username: this.userInfo.username,
            email: this.userInfo.email,
          })
          .then(({ data }) => {
            let msg = "수정 처리시 문제가 발생했습니다.";
            if (data === "success") {
              msg = "수정이 완료되었습니다.";
            }
            alert(msg);
            this.$router.push({ name: "mypage" });
          });
      }
    },
  },
};
</script>

<style scoped></style>
