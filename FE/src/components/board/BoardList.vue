<template>
  <div>
    <h2 class="qna"><b-icon icon="journals"></b-icon> Q&A</h2>
    <v-btn color="primary" variant="outline-primary" @click="moveWrite()"
      >Q&A쓰기</v-btn
    >
    <v-data-table
      :headers="headers"
      :items="articles"
      :items-per-page="5"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
      @click:row="moveDetail"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search(ID)"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { listArticle } from "@/api/qna.js";
import BoardListItem from "@/components/board/item/BoardListItem";

export default {
  name: "BoardList",
  components: {
    BoardListItem,
  },
  data() {
    return {
      articles: [],
      headers: [
        {
          text: "글번호",
          align: "start",
          sortable: false,
          value: "articleno",
        },
        { text: "제목", value: "subject" },
        { text: "작성자(ID)", value: "userid" },
        { text: "조회수", value: "hit" },
        { text: "작성일", value: "regtime" },
      ],
      search: "",
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    listArticle(
      param,
      (response) => {
        this.articles = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardRegister" });
    },
    moveDetail(row) {
      this.$router.push({
        name: "boardDetail",
        params: { articleno: row.articleno },
      });
    },
    filterOnlyCapsText(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().indexOf(search) !== -1
      );
    },
  },
};
</script>

<style scope>
.qna {
  text-align: left;
  font-size: 40px;
}
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
