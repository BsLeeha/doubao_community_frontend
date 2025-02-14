<template>
  <div class="member">
    <div class="columns">
      <!-- 个人基本信息栏 -->
      <div class="column is-one-quarter">
        <el-card shadow="never">
          <div slot="header" class="has-text-centered">
            <el-avatar :size="64" :src="`https://cn.gravatar.com/avatar/${user.id}?s=164&d=monsterid`" />
            <p class="mt-3">{{ user.alias || user.username }}</p>
          </div>
          <div>
            <p class="content">积分：<code>{{ user.score }}</code></p>
            <p class="content">入驻：{{ dayjs(user.createTime).format("YYYY/MM/DD HH:MM:ss") }}</p>
            <p class="content">简介：{{ user.bio }}</p>
          </div>
        </el-card>
      </div>

      <!-- 个人其他信息栏：发布的话题登 -->
      <div class="column">
        <!--用户发布的话题-->
        <el-card class="box-card content" shadow="never">
          <div slot="header" class="has-text-weight-bold">
            <span>话题</span>
          </div>

          <div v-if="articles.length===0">
            暂无话题
          </div>

          <div v-else class="user-info">
            <article v-for="(item, index) in articles" :key="index" class="media">
              <div class="media-content">
                <div class="content ellipsis is-ellipsis-1">
                  <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                    <router-link :to="{ name: 'article-detail', params: { id: item.id } }">
                      {{ item.title }}
                    </router-link>
                  </el-tooltip>
                </div>
                <nav class="level has-text-grey is-size-7">
                  <div class="level-left">
                    <span class="mr-1">
                      发布于:{{ dayjs(item.createTime).format("YYYY/MM/DD HH:mm:ss") }}
                    </span>
                  </div>
                </nav>
              </div>
              <div v-if="token" class="media-right">
                <div v-if="user.username === user.username" class="level">
                  <div class="level-item mr-1">
                    <router-link :to="{name:'article-edit',params: {id:item.id}}">
                      <span class="tag is-warning">编辑</span>
                    </router-link>
                  </div>
                  <div class="level-item">
                    <a @click="handleDelete(item.id)">
                      <span class="tag is-danger">删除</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!--分页-->
          <pagination
            v-show="page.total > 0"
            class="mt-5"
            :total="page.total"
            :page.sync="page.current"
            :limit.sync="page.size"
            @pagination="fetchUserById"
          />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfoByName } from '@/api/user'
import pagination from '@/components/Pagination/index'
import { mapGetters } from 'vuex'
import { deleteArticle } from '@/api/article'

export default {
  name: 'Profile',
  components: { pagination },
  data() {
    return {
      user: {},
      articles: {},
      page: {
        current: 1,
        size: 5,
        total: 0
      }
    }
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  created() {
    this.fetchUserById()
  },
  methods: {
    fetchUserById() {
      getInfoByName(this.$route.params.username, this.page.current, this.page.size).then((res) => {
        const { data } = res
        this.user = data.user
        this.page.current = data.articles.current
        this.page.size = data.articles.size
        this.page.total = data.articles.total
        this.articles = data.articles.records
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

<style scoped>

</style>
