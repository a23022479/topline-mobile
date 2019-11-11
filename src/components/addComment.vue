<template>
    <div class="addComment">
        <van-cell>
            <template slot="title">
                  <van-search v-model="value" placeholder="写评论" show-action shape="round" >
                      <div slot="action" @click="onSearch">发送</div>
                      <template slot="left-icon">
                          <van-icon name="edit" />
                      </template>
                  </van-search>
            </template>
        </van-cell>
    </div>
</template>

<script>
// 导入评论文章和回复评论的方法
import { addComments, addhuifu } from '@/api/article.js'
export default {
  // 分别是文章详情,回复面板显示判断值,评论数组
  props: ['artobj', 'isa', 'commentList', 'artid'],
  data () {
    return {
      // 评论内容
      value: ''
    }
  },
  methods: {
    // 发布留言的方法
    async onSearch () {
      console.log(this.artobj)
      console.log(this.artobj.art_id)
      console.log(this.isa)
      let res
      // 判断是文章评论还是对评论的回复
      if (this.isa === true) {
        // 对文章评论
        res = await addComments(this.$http, {
          artid: this.artobj.art_id,
          content: this.value
        })
        console.log(res)
      } else {
        // 对评论的回复
        res = await addhuifu(this.$http, {
          target: this.artobj.com_id,
          content: this.value,
          artid: this.artid
        })
        console.log(res)
      }
      this.commentList.push(res.data.data.new_obj)
      this.value = ''
    }
  }
}
</script>

<style lang="less" scope>
.addComment{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
