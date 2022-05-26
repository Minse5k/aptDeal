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
        <v-btn color="primary" id="board-btn" @click="moveModifyArticle"
          >수정</v-btn
        >
        <v-btn color="primary" id="board-btn" @click="deleteArticle"
          >삭제</v-btn
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
// import moment from "moment";
import { getArticle, deleteArticle } from "@/api/qna";

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
    };
  },
  computed: {
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
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "boardList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "boardModify",
        params: { articleno: this.article.articleno },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        deleteArticle(this.article.articleno, () => {
          this.$router.push({ name: "boardList" });
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
