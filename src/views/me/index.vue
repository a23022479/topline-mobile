<template>
  <div class="me">
        <van-cell class="myinfo">
            <template slot="title">
                <div class="author">
                    <!-- 作者头像 -->
                    <div class="a-img">
                        <img :src="userInfo.photo" alt="">
                    </div>
                    <div class="a-name">
                        <!-- 作者名 -->
                        <div class="name">{{userInfo.name}}</div>
                        <div class="name">申请认证</div>
                    </div>
                </div>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <van-grid :column-num="3">
                    <van-grid-item v-for="value in 3"  :key="value" icon="photo-o" text="文字" >
                    </van-grid-item>
                </van-grid>
            </template>
        </van-cell>
  </div>
</template>

<script>
import { getUser } from '@/api/user.js'
export default {
  data () {
    return {
      // 用户信息
      userInfo: {}
    }
  },
  methods: {
    async getUserInfo () {
      let res = await getUser(this.$http, 1)
      console.log(res)
      this.userInfo = res.data.data
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped >
.myinfo{
    margin-top: 70px;
}
.author{
    display: flex;
    align-items: center;
    .a-img{
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
    }
}
</style>
