<template>
  <div class="home">
    <van-nav-bar title="首页" fixed=""/>
    <div class="mytabs">
      <van-tabs v-model="activeTab">
        <van-tab v-for="(item,index) in channelList" :key="index" :title="item.name">
            <van-pull-refresh v-model="item.pull" @refresh="onRefresh">
                 <van-list v-model="item.up" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
                   <van-cell class="mycell" v-for="(artitem,artindex) in item.articleList" :key="artindex" :title="artitem.title">
                     <template slot="label">
                        <van-grid :border="false" :column-num="3" v-if="artitem.cover.type > 0">
                          <van-grid-item v-for="(imgitem,imgindex) in artitem.cover.images" :key="imgindex">
                            <van-image lazy-load :src="imgitem" />
                          </van-grid-item>
                        </van-grid>
                            <!-- 作者,评论数,时间 -->
                            <div class="other">
                              <div class="other-left">
                                <span>作者:{{artitem.aut_name}}</span>
                                <span>{{artitem.comm_count}}评论</span>
                                <span>{{artitem.pubdate | relativeTime}}</span>
                              </div>
                              <div class="other-right">
                                <van-icon @click="openmore(artitem, item.articleList)" name="cross" />
                              </div>
                            </div>
                     </template>
                   </van-cell>
                </van-list>
            </van-pull-refresh>
        </van-tab>
      </van-tabs>
      <div class="myicon">
        <van-icon @click="showpop" name="wap-nav"/>
      </div>
    </div>
    <!-- 频道管理弹框 -->
    <channelPop v-model="show" :channelList="channelList" :activeTab.sync="activeTab"></channelPop>
    <!-- 更多操作弹框 -->
    <moredialog v-model="dialogshow" :currentItem="currentItem" :itemList="itemList"></moredialog>
  </div>
</template>

<script>
// 导入频道管理组件
import channelPop from '@/components/channelpop'
// 导入更多操作组件
import moredialog from '@/components/moredialog'
// 导入获取channel数组的方法
import { getChannel } from '@/api/channel.js'
// 导入获取文章列表的方法
import { getArticle } from '@/api/article.js'
export default {
  components: {
    channelPop,
    moredialog
  },
  data () {
    return {
      // 频道数组
      channelList: [],
      // 默认选中的频道下标
      activeTab: 0,
      // 弹框的显示与隐藏
      show: false,
      // 更多操作弹框的隐藏于显示
      dialogshow: false,
      // 当前操作的数据对象
      currentItem: {},
      // 当前显示的数据源
      itemList: []
    }
  },
  methods: {
    // 注意: onLoad 与onRefresh 触发时会默认将 loading与isloading改为true
    async onLoad () {
      // 页面打开会自动执行一次
      // 默认选中的频道
      let channel = this.channelList[this.activeTab]
      // 得到当前选中的频道的ID
      let channelID = channel.id
      // 时间戳
      let timestamp
      if (channel.timestamp === 0) {
        // 如果是第一次请求
        timestamp = Date.now()
      } else {
        timestamp = channel.timestamp
      }

      // 获取当前频道的文章列表
      let res = await getArticle(this.$http2, {
        url: '/articles',
        methods: 'GET',
        query: {
          // 频道ID
          channel_id: channelID,
          // 时间戳,相当于分页的标识
          timestamp: timestamp,
          // 是否包含置顶项,不包含
          with_top: 0
        }
      })
      // 保存到文章数组
      console.log(res.data.data)
      channel.articleList = [...channel.articleList, ...res.data.data.results]
      // 保存返回的时间戳
      channel.timestamp = res.data.data.pre_timestamp
      // 判断返回的数据是否为空
      if (res.data.data.pre_timestamp === null) {
        // 说明已经加载完成
        channel.finished = true
      }
      channel.up = false
    },
    // 下拉刷新时触发
    onRefresh () {
      // 得到当前选中的频道
      let channel = this.channelList[this.activeTab]
      // 清空文章列表
      channel.articleList = []
      // 时间戳归0
      channel.timestamp = 0
      // 是否完成加载
      channel.finished = false
      // 重新加载数据
      this.onLoad()
      // 取消加载状态
      channel.pull = false
    },
    // 获取频道数据方法
    async getChannelList () {
      try {
        // 得到用户信息
        let user = this.$store.state.user
        // 判断用户是否登录
        if (!user) {
          // 如果没有登录,再去localstorage中查找有没有数据
          let channels = JSON.parse(window.localStorage.getItem('channels'))
          // 如果在localstorage中有数据,直接赋值
          if (channels) {
            this.channelList = channels
          } else {
            // 如果localstorage中没有数据,则从服务器请求
            let res = await getChannel(this.$http, {
              url: '/user/channels',
              method: 'GET'
            })
            console.log(res.data.data)
            this.channelList = res.data.data.channels
          }
        } else {
          // 如果登录了,直接从服务器请求数据
          let res = await getChannel(this.$http, {
            url: '/user/channels',
            method: 'GET'
          })
          this.channelList = res.data.data.channels
        }
        // 动态向channelList添加属性
        this.addToChannels()
        console.log(this.channelList)
      } catch (error) {
        console.log(error)
      }
    },
    // 给channelList动态添加额外的属性
    addToChannels () {
      this.channelList.forEach(item => {
        // 下拉状态
        this.$set(item, 'pull', false)
        // 上拉状态
        this.$set(item, 'up', false)
        // 数据加载完状态
        this.$set(item, 'finished', false)
        // 文章数组
        this.$set(item, 'articleList', [])
        // 时间戳
        this.$set(item, 'timestamp', 0)
      })
    },
    // 打开弹框
    showpop () {
      this.show = true
    },
    // 更多操作弹窗
    openmore (artitem, articleList) {
      // 打开弹窗
      this.dialogshow = true
      // 得到当前文章
      // 得到当前显示的文章数据源
      this.currentItem = artitem
      this.itemList = articleList
    }

  },
  created () {
    this.getChannelList()
  }
}
</script>

<style lang="less">
.van-nav-bar {
  background-color: #0094ff;
  .van-nav-bar__title {
    color: #ffffff;
  }
}
.home{
    margin-top: 95px;
    margin-bottom: 50px;
}
.mytabs {
  position: relative;
  .myicon {
    position: fixed;
    top: 46px;
    right: 0;
    font-size: 26px;
    width: 10%;
    text-align: center;
    height: 44px;
    line-height: 44px;
  }
}
.van-tabs__wrap {
  width: 90%;
  position: fixed;
  z-index: 1000;
  top: 46px;
}
.mycell{
  line-height: 50px;
}
.other{
  display: flex;
  justify-content: space-between;
  .other-left{
    span{
      margin: 0 10px;
      font-size: 12px;
    }
  }
}
</style>
