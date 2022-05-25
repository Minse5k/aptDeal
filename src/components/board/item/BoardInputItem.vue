<template>
  <v-row>
    <v-col cols="100">
      <v-form @submit="onSubmit" @reset="onReset">
        <v-text-field
          id="userid"
          v-model="article.userid"
          label="작성자"
          placeholder="작성자를 입력하세요."
          outlined
        ></v-text-field>

        <v-text-field
          id="subject"
          v-model="article.subject"
          label="제목"
          placeholder="제목 입력하세요."
          outlined
        ></v-text-field>
        <v-textarea
          id="content"
          v-model="article.content"
          label="내용"
          placeholder="제목 입력하세요."
          outlined
        ></v-textarea>
        <v-btn
          color="primary"
          id="board-btn"
          type="submit"
          v-if="this.type === 'register'"
          >작성</v-btn
        >
        <v-btn color="primary" id="board-btn" type="onRest">수정</v-btn>
        <v-btn color="primary" id="board-btn" type="reset">초기화</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { writeArticle, getArticle, modifyArticle } from "@/api/qna";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardInputItem",
  data() {
    return {
      article: {
        articleno: 0,
        userid: "",
        subject: "",
        content: "",
        like: 0,
      },
    };
  },
  props: {
    type: { type: String },
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  created() {
    if (this.type === "modify") {
      getArticle(
        this.$route.params.articleno,
        ({ data }) => {
          this.article = data;
        },
        (error) => {
          console.log(error);
        }
      );
      this.isUserid = true;
    } else {
      this.article.userid = this.userInfo.userid;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.article.userid &&
        ((msg = "작성자 입력해주세요"),
        (err = false),
        this.$refs.userid.focus());
      err &&
        !this.article.subject &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else
        this.type === "register" ? this.registArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleno = 0;
      this.article.subject = "";
      this.article.content = "";
      this.$router.push({ name: "boardList" });
    },
    registArticle() {
      writeArticle(
        {
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
        },
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    modifyArticle() {
      modifyArticle(
        {
          articleno: this.article.articleno,
          userid: this.article.userid,
          subject: this.article.subject,
          content: this.article.content,
        },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "boardList" });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.push({ name: "boardList" });
    },
  },
};
</script>

<style scoped>
#board-btn {
  margin: 5px;
}
</style>
