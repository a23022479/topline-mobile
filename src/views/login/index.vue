<template>
  <div class="login">
    <van-nav-bar title="登录"/>
    <van-cell-group>
      <van-field v-model="user.mobile" clearable label="手机号" placeholder="请输入手机号" :error-message="error.mobile">
        <template slot="left-icon">
          <i class="iconfont icon-icon207 login-phone"></i>
        </template>
      </van-field>
      <van-field v-model="user.code" clearable label="验证码" placeholder="请输入验证码" :error-message="error.code">
        <template slot="left-icon">
          <i class="iconfont icon-lock login-lock"></i>
        </template>
        <van-button type="default" :disabled="!!timer" slot="button" class="mycode" size="small" round @click="getcode" >{{timer?`${codeTime}s`:'发送验证码'}}</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-btn">
      <van-button class="l-btn" type="info" size="large" @click="login" :loading="loading">登录</van-button>
    </div>
  </div>
</template>

<script>
// 导入userLogin
import { userLogin } from '@/api/user.js'
import { Dialog } from 'vant'
export default {
  data () {
    return {
      // 登录的手机号和验证码
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      // 验证的错误信息
      error: {
        mobile: '',
        code: ''
      },
      // 登录加载状态
      loading: false,
      // 验证码发送计时
      codeTime: 10,
      // 定时器id
      timer: null
    }
  },
  methods: {
    // 登录方法
    async login () {
      if (!this.vaildData()) {
        return false
      }
      // 登录提交,加载状态为true
      this.loading = true
      try {
        let res = await userLogin(this.$http, {
          url: '/authorizations',
          method: 'POST',
          data: this.user
        })
        console.log(res)
        // 调用方法存储到localstorage
        this.$store.commit('getUser', res.data.data)
        this.loading = false
        // 跳转页面
        // 如果当前路由不是login,而是nologin,则登录的时候跳转到上一次访问的页面
        if (this.$route.path !== '/login') {
          this.$router.back()
        } else {
          this.$router.push('/home')
        }
      } catch (error) {
        console.log(error)
        Dialog.alert({
          message: '手机号或验证码错误'
        }).then(() => {
        })
        this.loading = false
      }
    },
    // 表单验证方法
    vaildData () {
      if (this.user.mobile.trim().length === 0) {
        this.error.mobile = '手机号不能为空'
        return false
      }
      if (this.user.mobile.trim().length !== 11) {
        this.error.mobile = '手机号必须是 11 位'
        return false
      }
      // 将错误信息重置为空
      this.error.mobile = ''
      if (this.user.code.trim().length === 0) {
        this.error.code = '验证码不能为空'
        return false
      }
      this.error.code = ''
      return true
    },
    // 发送验证码方法
    getcode () {
      if (this.user.mobile.trim().length === 11) {
        // 手机号验证通过
        this.timer = setInterval(() => {
          this.codeTime--
          if (this.codeTime <= 0) {
            // 清楚定时器
            clearTimeout(this.timer)
            // 重置时间
            this.codeTime = 10
            // 将定时器设置为null
            this.timer = null
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less">
.van-nav-bar {
  background-color: #0094ff;
}
.van-nav-bar__title {
  color: #fff;
}
.mycode {
  background-color: #eee;
  color: #0084ff;
}
// 字体图标
.login-phone {
  font-size: 20px;
}

.login-lock {
  font-size: 20px;
}
// 登录按钮
.login-btn {
  margin: 15px;
  .l-btn {
    border-radius: 5px;
  }
}
.van-button--small{
  width: 78px
}
</style>
