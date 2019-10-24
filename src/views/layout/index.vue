<template>
  <div>
    <router-view></router-view>
    <van-tabbar  route="">
      <van-tabbar-item icon="wap-home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="chat-o" to="answer">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
