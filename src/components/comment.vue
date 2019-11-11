<template>
  <div class="comment">
    <van-cell>
      <template slot="title">
        <div class="comment">
          <div class="t-img">
            <img :src="itemobj.aut_photo" alt="" >
          </div>
          <div class="t-msg">
            <div class="nname">
              <div class="nickname">{{itemobj.aut_name}}</div>
              <div class="icon">
                <van-icon name="good-job-o">{{itemobj.like_count}}</van-icon>
              </div>
            </div>
            <div class="content">{{itemobj.content}}</div>
            <div class="myitem">
              <span class="time">{{itemobj.pubdate | relativeTime}}</span>
              <van-button v-if="isa === true" class="btn" @click="replay" type="default" size="small">{{ itemobj.reply_count }}回复</van-button>
            </div>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
// 导入bus
import bus from '@/utils/bus.js'
export default {
  props: ['itemobj', 'value', 'isa'],
  methods: {
    replay () {
      this.$emit('input', true)
      // 传递评论列表
      bus.$emit('commentitem', this.itemobj)
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
    display: flex;
    width: 100%;
    .t-img {
        margin-right: 10px;
        img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
        }
    }
    .t-msg {
      width: 100%;
        .nname {
            display: flex;
            width: 100%;
            justify-content: space-between;
        }
        .content {
            font-size: 16px;
            margin: 10px 0;
        }
    }
}
.myitem{
  display: flex;
  justify-content: space-between;
}
</style>
