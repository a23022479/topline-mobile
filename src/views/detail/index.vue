<template>
    <div class="detail">
        <van-nav-bar left-text="返回" left-arrow class="title" title="文章详情" @click-left="onClickLeft" fixed />
        <van-cell title="文章标题" />
        <!-- 作者区域 -->
        <van-cell>
            <template slot="title">
                <div class="author">
                    <!-- 作者头像 -->
                    <div class="a-img">
                        <img :src="articleInfo.aut_photo" alt="">
                    </div>
                    <div class="a-name">
                        <!-- 作者名 -->
                        <div class="name">{{articleInfo.aut_name}}</div>
                        <!-- 发布时间 -->
                        <div class="name">{{articleInfo.pubdate | relativeTime}}</div>
                    </div>
                    <!-- 关注按钮 -->
                    <div>
                        <van-button round type="info" size="small" @click="follow">
                            <van-icon name="plus" v-if="!articleInfo.is_followed" />
                            {{articleInfo.is_followed ? '取消关注' : '关注'}}
                        </van-button>
                    </div>
                </div>
            </template>
        </van-cell>
        <!-- 内容区域 -->
        <van-cell>
            <template slot="title">
                <div v-html="articleInfo.content"></div>
            </template>
        </van-cell>
        <!-- 点赞与不喜欢 -->
        <van-cell>
            <div class="likeBtn">
                <van-button @click="goodArticle" class="btn" round :type="articleInfo.attitude === 1 ? 'warning' : 'default'" size="small">点赞</van-button>
                <van-button @click="likeArticle" class="btn" round :type="articleInfo.attitude === 0 ? 'warning' : 'default'" size="small">不喜欢</van-button>
            </div>
        </van-cell>
        <!-- 评论区 -->
        <van-list class="list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <!-- 遍历评论数组 -->
            <div v-for="(item, index) in commentList" :key="index">
                <comment :itemobj="item" v-model="show" :isa="true"></comment>
            </div>
        </van-list>
        <addComment :artobj="articleInfo" :isa="true" :commentList="commentList"></addComment>
        <replay v-model="show" :artid="artid"></replay>
    </div>
</template>

<script>
// 导入获取文章详情方法,点赞与不喜欢方法
import { getArticleInfo, likeArt, quxiaogoodArt, dislikeArt, nodislikeArt } from '@/api/article.js'
// 导入关注用户方法
import { quxiaoFollow, gzFollow } from '@/api/user.js'
// 导入获取评论的方法
import { getComment } from '@/api/comment.js'
// 导入评论区组件
import comment from '@/components/comment'
// 导入留言框组件
import addComment from '@/components/addComment'
// 导入评论回复面板组件
import replay from '@/components/replay'
export default {
  components: {
    comment,
    addComment,
    replay
  },
  data () {
    return {
      // 文章id
      artid: '',
      // 文章详细信息
      articleInfo: {},
      // 文章的偏移量
      offset: '',
      // 结束id
      endid: '',
      // 每页的条数
      limit: 10,
      // 评论数组
      commentList: [],
      // 是否加载完成
      finished: false,
      // 加载状态
      loading: false,
      // 回复面板的隐藏与显示
      show: false
    }
  },
  methods: {
    // 获取文章详细信息
    async getArtDetail () {
      let res = await getArticleInfo(this.$http, this.artid)
      this.articleInfo = res.data.data
      console.log(this.articleInfo)
    },
    // 关注用户&取消关注
    async follow () {
      // 获取目前关注的状态
      let follow = this.articleInfo.is_followed
      // 获取作者id
      let userid = this.articleInfo.aut_id
      // 判断有没有关注
      if (follow) {
        // 如果已经关注,点击发送请求取消关注
        await quxiaoFollow(this.$http, userid)
        // 将页面的状态改为false
        this.articleInfo.is_followed = false
      } else {
        await gzFollow(this.$http, userid)
        this.articleInfo.is_followed = true
      }
    },
    // 点赞
    async goodArticle () {
      // 获取attitude的状态
      let attitude = this.articleInfo.attitude
      // 判断是否已经点赞
      if (attitude === 1) {
        // 如果已经点赞
        await quxiaogoodArt(this.$http, this.artid)
        // 取消点赞
        this.articleInfo.attitude = -1
      } else {
        // 如果没有点赞
        await likeArt(this.$http, this.artid)
        this.articleInfo.attitude = 1
      }
    },
    // 不喜欢
    async likeArticle () {
      // 获取attitude的状态
      let attitude = this.articleInfo.attitude
      // 判断是否已经'不喜欢'
      if (attitude === 0) {
        // 如果已经'不喜欢'
        await nodislikeArt(this.$http, this.artid)
        // 取消'不喜欢'
        this.articleInfo.attitude = -1
      } else {
        // 如果没有'不喜欢'
        await dislikeArt(this.$http, this.artid)
        this.articleInfo.attitude = 0
      }
    },
    // 获取评论
    async onLoad () {
      let res = await getComment(this.$http, {
        source: this.artid,
        offset: this.offset || undefined,
        limit: this.limit
      })
      // 保存评论数组
      this.commentList = [...this.commentList, ...res.data.data.results]
      console.log(this.commentList)
      // 保存结束id
      this.endid = res.data.data.end_id
      // 保存偏移量
      this.offset = res.data.data.last_id
      // 判断是否已经加载完
      if (this.offset === this.endid) {
        this.finished = true
      }
      // 取消加载状态
      this.loading = false
    },
    // 点击返回上一级
    onClickLeft () {
      this.$router.back()
    }
  },
  created () {
    // 页面加载获取文章id
    this.artid = this.$route.params.artid
    // 获取文章详情
    this.getArtDetail()
  }
}
</script>

<style lang="less" scoped>
.detail{
    margin-top: 46px;
}
.title{
    height: 46px;
    width: 100%;
    background-color: #0094ff !important;
    color: #ffffff
}
.van-nav-bar__text /deep/{
    color: #ffffff;
    background-color: #0094ff !important;
}
.van-icon /deep/{
    color: #ffffff !important;
}
.author {
  display: flex;
  align-items: center;
  .a-img {
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .a-name {
    flex: 1;
  }
}
.likeBtn {
    text-align: center;
    .btn {
        margin-right: 10px;
    }
}
.list /deep/ {
    margin-bottom: 74px;
}
</style>
