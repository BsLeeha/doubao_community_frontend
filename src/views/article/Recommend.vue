<template>
  <el-card class="" shadow="never">
    <div slot="header">
      <span class="has-text-weight-bold">🧐 随便看看</span>
    </div>
    <div>
      <p v-for="(item,index) in recommend" :key="index" :title="item.title" class="block ellipsis is-ellipsis-1">
        <router-link :to="{name:'article-detail',params: { id: item.id }}">
          <span v-if="index<9" class="tag">
            0{{ parseInt(index) + 1 }}
          </span>
          <span v-else class="tag">
            {{ parseInt(index) + 1 }}
          </span>
          {{ item.title }}
        </router-link>
      </p>
    </div>
  </el-card>
</template>

<script>
import { getRecommendArticles } from '@/api/article'

export default {
  name: 'Recommend',
  props: {
    articleId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      recommend: []
    }
  },
  created() {
    this.fetchRecommendTopics()
  },
  methods: {
    fetchRecommendTopics() {
      getRecommendArticles(this.articleId).then(value => {
        const { data } = value
        this.recommend = data
      })
    }
  }
}
</script>

<style scoped>

</style>
