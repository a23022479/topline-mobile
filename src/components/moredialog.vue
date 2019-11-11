<template>
  <div>
    <van-popup :value="value" @input="$emit('input',false)" position="bottom" :style="{ height: '50%' }">
      <van-cell-group v-if="isShow === false">
        <van-cell title="不看此文章" @click="hideArt" />
        <van-cell title="举报此文章" @click="isShow=true" />
        <van-cell title="不看该用户" @click="blackList"/>
      </van-cell-group>
      <van-cell-group v-if="isShow === true">
          <van-cell @click="isShow=false">
            <template slot="icon">
                <van-icon name="arrow-left" />
            </template>
          </van-cell>
          <van-cell v-for="(item, index) in type" :key="index" icon="location-o" :title="item.name" @click="reports(item.id)"/>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
// 导入隐藏,举报文章api
import { reportArticle, hideArticle } from '@/api/article.js'
// 用户黑名单
import { userBlack } from '@/api/user.js'
export default {
  props: ['value', 'currentItem', 'itemList'],
  data () {
    return {
      // 举报类型
      type: [
        { id: 0, name: '其他问题' },
        { id: 1, name: '标题夸张' },
        { id: 2, name: '低俗色情' },
        { id: 3, name: '错别字多' },
        { id: 4, name: '旧闻重复' },
        { id: 5, name: '广告软文' },
        { id: 6, name: '内容不实' },
        { id: 7, name: '涉嫌违法犯罪' },
        { id: 8, name: '侵权' }
      ],
      // 举报类型的显示与隐藏
      isShow: false
    }
  },
  methods: {
    // 隐藏文章方法
    async hideArt () {
      // 将当前文章从数据源中删除
      this.itemList.forEach((item, index) => {
        // 判断：当当前文章的 id 与数据源中 对应的数据匹配时，才需要删除
        if (item.art_id === this.currentItem.art_id) {
          // 将文章删除
          this.itemList.splice(index, 1)
        }
      })
      this.$emit('input', false)
      // 提示用户隐藏成功
      this.$toast.success('隐藏文章成功')
      // 判断用户是否登录
      let user = this.$store.state.user
      if (user) {
        let res = await hideArticle(this.$http, {
          url: `/article/dislikes/${this.currentItem.art_id}`,
          method: 'DELETE'
        })
        console.log(res)
      }
    },
    // 举报文章方法
    async reports (type) {
      let res = await reportArticle(this.$http, {
        target: this.currentItem.art_id,
        type: type
      })
      console.log(res)
      this.isShow = false
      // 关闭面板
      this.$emit('input', false)
      // 告诉用户已经举报成功
      this.$toast('您的举报信息已经提交给了客服，我们将会在三个工作日之内给您答复....')
    },
    // 拉黑用户方法
    async blackList () {
      // 获取作者id
      let userID = this.currentItem.aut_id
      console.log(userID)
      let res = await userBlack(this.$http, userID)
      console.log(res)
      // 关闭面板
      this.$emit('input', false)
      // 提示
      this.$toast.success('拉黑用户成功')
    }
  }
}
</script>

<style>
</style>
