<template>
    <div class="searchList" >
        <van-nav-bar class="title" title="搜索列表" fixed=""/>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
             <van-cell @click="toDetail(item.art_id)" v-for="(item, index) in searchList" :key="index" :title="item.title" >
                 <template slot="label">
                    <van-grid :border="false" :column-num="3">
                      <van-grid-item>
                        <van-image v-for="(imgurl, imgindex) in item.cover.images" :src="imgurl" :key="imgindex"/>
                      </van-grid-item>
                    </van-grid>
                    <div>
                      <span>作者:{{item.aut_name}}</span>
                      <span> 发表时间:{{item.pubdate | relativeTime}}</span>
                    </div>
                    <van-grid :column-num="3" :border="false">
                      <van-grid-item >
                          <template slot="default">
                              <div class="myitems" @click.stop="coommit">
                              <van-icon class="myicon" name="comment-o" />
                              {{item.comm_count}}评论
                              </div>
                          </template>
                      </van-grid-item>
                      <van-grid-item >
                          <template slot="default">
                              <div class="myitems" @click="dainzhan(item.art_id)">
                              <van-icon class="myicon" name="good-job-o" />
                              {{item.like_count}}点赞
                              </div>
                          </template>
                      </van-grid-item>
                      <van-grid-item >
                          <template slot="default">
                              <div class="myitems">
                              <van-icon class="myicon" name="star-o" />
                              {{item.collect_count}}收藏
                              </div>
                          </template>
                      </van-grid-item>
                    </van-grid>
                 </template>
             </van-cell>
        </van-list>
    </div>
</template>

<script>
// 获取搜索列表方法
import { getSearchRes } from '@/api/search.js'
export default {
  data () {
    return {
      list: [],
      // 上拉加载状态
      loading: false,
      // 加载是否完成
      finished: false,
      // 搜索关键字
      key: '',
      // 第几页
      page: 0,
      // 页容量
      perpage: 10,
      // 搜索结果数组
      searchList: [],
      // 文章总数
      total_count: 0
    }
  },
  methods: {
    // 上拉获取数据
    onLoad () {
      // 分页
      this.page++
      // 刚进入页面自动执行一次,之后每次上拉执行
      this.getResult()
    },
    // 获取搜索列表
    async getResult () {
      console.log(this.key)
      let res = await getSearchRes(this.$http, {
        page: this.page,
        per_page: this.perpage,
        q: this.key
      })
      console.log(res)
      // 每次上拉,在数据原有的基础上添加
      this.searchList = [...this.searchList, ...res.data.data.results]
      // 判断是否加载完成
      if (this.searchList === this.total_count) {
        this.finished = true
      }
      // 文章总条数
      this.total_count = res.data.data.total_count
      // 上拉加载状态
      this.loading = false
    },
    // 模拟评论功能
    coommit () {
      // 判断用户是否登录,调用自己写的插件,$login() 如果登录了返回true,否则返回false
      let user = this.$login()
      if (!user) {
        return
      }
      console.log('模拟评论')
    },
    // 点击文章列表跳转详情页面
    toDetail (artid) {
      let user = this.$login()
      if (!user) {
        return
      }
      this.$router.push(`/detail/${artid}`)
    }
  },
  created () {
    // 得到搜索关键字
    this.key = this.$route.params.key
  }
}
</script>

<style lang="less" scoped>
.searchList{
    margin-top: 46px;
}
.title{
    background-color: #0094ff;
    width: 100%;
    height: 46px;
}
.myitems{
    font-size: 14px;
    display: flex;
    align-items: center;
    .myicon{
        font-size: 20px;
        margin-right: 6px;
    }
}
</style>
