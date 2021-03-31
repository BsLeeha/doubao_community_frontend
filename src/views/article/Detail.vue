<template>
  <div class="columns">
    <!--文章详情-->
    <div class="column is-three-quarters">
      <!--主题-->
      <el-card
        class="box-card"
        shadow="never"
      >
        <div
          slot="header"
          class="has-text-centered"
        >
          <p class="is-size-5 has-text-weight-bold">{{ article.title }}</p>
          <div class="has-text-grey is-size-7 mt-3">
            <span>{{ dayjs(article.createTime).format('YYYY/MM/DD HH:mm:ss') }}</span>
            <el-divider direction="vertical" />
            <span>发布者：{{ author.alias }}</span>
            <el-divider direction="vertical" />
            <span>查看：{{ article.viewCnt }}</span>
          </div>
        </div>

        <!--Markdown-->
        <div id="preview" />

        <!--标签-->
        <nav class="level has-text-grey is-size-7 mt-6">
          <div class="level-left">
            <p class="level-item">
              <b-taglist>
                <router-link
                  v-for="(tag, index) in tags"
                  :key="index"
                  :to="{ name: 'tag', params: { name: tag.tagName } }"
                >
                  <b-tag type="is-info is-light mr-1">
                    {{ "#" + tag.tagName }}
                  </b-tag>
                </router-link>
              </b-taglist>
            </p>
          </div>
          <div
            v-if="token && user.id === author.id"
            class="level-right"
          >
            <router-link
              class="level-item"
              :to="{name:'article-edit',params: {id:article.id}}"
            >
              <span class="tag">编辑</span>
            </router-link>
            <a class="level-item">
              <span
                class="tag"
                @click="handleDelete(article.id)"
              >删除</span>
            </a>
          </div>
        </nav>
      </el-card>

      <lv-comments :slug="article.id" />
    </div>

    <div class="column">
      <!--作者-->
      <Author
        v-if="flag"
        :user="author"
      />
      <!--推荐-->
      <recommend
        v-if="flag"
        :article-id="article.id"
      />
    </div>
  </div>
</template>

<script>
import { deleteArticle, getArticle } from '@/api/article'
import { mapGetters } from 'vuex'
import Author from '@/views/article/Author'
import Recommend from '@/views/article/Recommend'
import LvComments from '@/components/Comment/Comments'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
  name: 'TopicDetail',
  components: { Author, Recommend, LvComments },
  computed: {
    ...mapGetters([
      'token','user'
    ])
  },
  data() {
    return {
      flag: false,
      article: {
        content: '',
        id: this.$route.params.id
      },
      tags: [],
      author: {}
    }
  },
  mounted() {
    this.fetchArticle()
  },
  methods: {
    renderMarkdown(md) {
      Vditor.preview(document.getElementById('preview'), md, {
        hljs: { style: 'github' }
      })
    },
    // 初始化
    async fetchArticle() {
      getArticle(this.$route.params.id).then(response => {
        const { data } = response
        document.title = data.article.title

        this.article = data.article
        this.tags = data.tags
        this.author = data.user
        // this.comments = data.comments
        this.renderMarkdown(this.article.content)
        this.flag = true
      })
    },
    handleDelete(id) {
      deleteArticle(id).then(value => {
        const { code, message } = value
        alert(message)

        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/' })
          }, 500)
        }
      })
    }
  }
}
</script>

<style>
#preview {
  min-height: 300px;
  font-size: inherit;
}
</style>
