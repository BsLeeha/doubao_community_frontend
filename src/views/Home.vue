<template>
  <div>
    <div class="box">🔔 {{ billboard.content }}</div>
    <div class="columns">
      <div class="column is-three-quarters">
        <ArticleList></ArticleList>
      </div>
      <div class="column">
        <CardBar></CardBar>
      </div>
    </div>
  </div>
</template>

<script>
import { getBillboard } from "@/api/billboard";
import CardBar from "@/views/card/CardBar"
import ArticleList from '@/views/article/Index'

export default {
  name: "Home",
  components: {CardBar, ArticleList: ArticleList},
  data() {
    return {
      billboard: {
        content: "",
      },
    };
  },
  created() {
    this.fetchBillboard();
  },
  methods: {
    async fetchBillboard() {
      getBillboard().then((value) => {
        const { data } = value;
        this.billboard = data;
      });
    },
  },
};
</script>
