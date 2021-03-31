<template>
  <section id="author">
    <el-card class="" shadow="never">
      <div slot="header">
        <span class="has-text-weight-bold">👨‍💻 关于作者</span>
      </div>
      <div class="has-text-centered">
        <p class="is-size-5 mb-5">
          <router-link :to="{ path: '/member/${user.username}/home' }">
            {{ user.alias }} <span class="is-size-7 has-text-grey">{{ '@' + user.username }}</span>
          </router-link>
        </p>
        <div class="columns is-mobile">
          <div class="column is-half">
            <code>{{ user.articleCnt }}</code>
            <p>文章</p>
          </div>
          <div class="column is-half">
            <code>{{ user.followerCnt }}</code>
            <p>粉丝</p>
          </div>
        </div>
        <div>
          <button
            v-if="isFollow"
            class="button is-success button-center is-fullwidth"
            @click="handleUnFollow(user.id)"
          >
            已关注
          </button>

          <button v-else class="button is-link button-center is-fullwidth" @click="handleFollow(user.id)">
            关注
          </button>
        </div>
      </div>
    </el-card>
  </section>
</template>

<script>
import { follow, isFollow, unFollow } from '@/api/follow'
import { mapGetters } from 'vuex'
export default {
  name: 'Author',
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isFollow: false, // 是否已关注
      isSelf: false      // 是否是用户自己
    }
  },
  mounted() {
    this.fetchInfo();
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    fetchInfo() {
      if (this.token != null && this.token !== '')
      {
        isFollow(this.user.id).then(value => {
          const { data } = value
          this.isFollow = data.isFollow
        })
      }
    },
    handleFollow: function(id) {
      if(this.token != null && this.token !== '')
      {
        follow(id).then(response => {
          const { message } = response
          this.$message.success(message)
          this.isFollow = !this.isFollow
          this.user.followerCnt = parseInt(this.user.followerCnt) + 1
        })
      }
      else{
        this.$message.success('请先登录')
      }
    },
    handleUnFollow: function(id) {
      unFollow(id).then(response => {
        const { message } = response
        this.$message.success(message)
        this.isFollow = !this.isFollow
        this.user.followerCnt = parseInt(this.user.followerCnt) - 1
      })
    }
  }
}
</script>

<style scoped>

</style>
