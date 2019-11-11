<template>
    <div>
        <van-popup class="mypop" :value="value" @input="$emit('input', $event)" position="bottom" :style="{ height: '70%' }" >
            <van-cell title="当前评论"></van-cell>
            <comment :isa="false" :itemobj="itemobj"></comment>
            <van-cell title="评论的回复"></van-cell>
            <div v-for="(item, index) in replayList" :key="index">
                <comment :isa="false" :itemobj="item"></comment>
            </div>
            <addComment :commentList="replayList" :artobj="itemobj" :artid="artid" :isa="false"></addComment>
        </van-popup>
    </div>
</template>

<script>
// 导入bus
import bus from '@/utils/bus'
// 导入评论列表组件
import comment from '@/components/comment'
// 导入添加评论回复的组件
import addComment from '@/components/addComment'
// 导入获取回复的方法
import { getReplay } from '@/api/comment.js'
export default {
  components: {
    comment,
    addComment
  },
  props: ['value', 'artid'],
  data () {
    return {
      // 回复列表数组
      replayList: [],
      // 文章评论列表
      itemobj: {}
    }
  },
  methods: {
    // 获取回复
    async getComments () {
      let res = await getReplay(this.$http, {
        source: this.itemobj.com_id.toString(),
        offset: undefined,
        limit: 10
      })
      console.log(res)
      this.replayList = res.data.data.results
    }
  },
  created () {
    // 接受传过来的评论
    bus.$on('commentitem', value => {
      this.itemobj = value
      console.log(this.itemobj)
    })
  },
  watch: {
    itemobj: function () {
      if (this.itemobj.com_id) {
        this.getComments()
      }
    }
  }
}
</script>

<style lang="less">
.mypop{
    margin-bottom: 70px;
}
</style>
