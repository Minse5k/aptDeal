<template>
  <v-card class="mg">
    <v-row>
      <b-col>
        <b-alert show class="tit"><h3>글보기</h3></b-alert>
      </b-col>
    </v-row>
    <v-row>
      <v-col>
        <v-list class="txt">
          <v-list-item>
            <v-list-item-content>글번호 :</v-list-item-content>
            <v-list-item-content class="align-center">
              {{ article.articleno }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>ID :</v-list-item-content>
            <v-list-item-content class="align-end">
              {{ article.userid }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>제목 :</v-list-item-content>
            <v-list-item-content class="align-end">
              {{ article.subject }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>내용 :</v-list-item-content>
            <v-list-item-content class="align-end">
              {{ article.content }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>추천수 :</v-list-item-content>
            <v-list-item-content class="align-end">
              {{ article.like }}
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>작성일 :</v-list-item-content>
            <v-list-item-content class="align-end">
              {{ article.regtime }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row>
      <v-col align-self="start">
        <v-btn color="primary" id="board-btn" @click="listArticle">목록</v-btn>
        <v-btn color="primary" id="board-btn" @click="like">추천</v-btn>
        <v-btn color="primary" id="board-btn" @click="deleteArticle"
          >삭제</v-btn
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
// import moment from "moment";
import { getArticle, deleteArticle, getLike } from "@/api/board";
import { mapState } from "vuex";
import httpCommon from "../../util/http-common";

export default {
  name: "negoDetail",
  data() {
    return {
      article: {},
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),

    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    getArticle(
      this.$route.params.articleno,
      (response) => {
        this.article = response.data;
      },
      (error) => {
        console.log("삭제시 에러발생!!", error);
      }
    );
    console.log(this.article.like);
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "negoList" });
    },
    like() {
      getLike(
        this.article,
        ({ data }) => {
          let msg = "이미 추천한 게시글입니다.";
          if (data === "success") {
            msg = "추천이 완료됐습니다.";
          }
          alert(msg);
          console.log(this.article);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        deleteArticle(this.article.articleno, () => {
          this.$router.push({ name: "negoList" });
        });
      }
    },
  },
};
</script>

<style scoped>
.mg {
  margin: 100px;
}
.txt {
  font-size: 17px;
}
#board-btn {
  margin: 5px;
}
.tit {
  font-size: 30px;
}
</style>
