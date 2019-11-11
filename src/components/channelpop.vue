<template>
    <div>
        <van-popup :value="value" @input="$emit('input',false)" position="bottom" :style="{ height: '80%' }">
            <div>
                <van-cell-group>
                    <van-cell title="我的频道">
                        <template>
                         <van-button v-if="iconshow === false" class="editbtn" round type="warning" size="mini" @click="iconshow = true">编辑</van-button>
                         <van-button v-if="iconshow === true" class="editbtn" round type="warning" size="mini" @click="iconshow = false">完成</van-button>
                        </template>
                    </van-cell>
                </van-cell-group>
                <van-grid clickable :gutter="10">
                   <van-grid-item @click="changeActive(index)" v-for="(item,index) in channelList" :key="index" class="channelword">
                       <template slot="text">
                           <div>
                               <div class="title" :class="{active: index === activeTab}">{{item.name}}</div>
                               <van-icon @click.stop="delChannel(index)" v-show="iconshow && index !== 0" name="clear" class="channelicon"/>
                           </div>
                       </template>
                   </van-grid-item>
                </van-grid>
            </div>
            <div>
                <!-- 频道推荐 -->
                <van-cell-group>
                    <van-cell title="频道推荐" />
                </van-cell-group>
                <van-grid clickable :gutter="10">
                   <van-grid-item @click="addChannel(item)" v-for="(item,index) in otherChannels"
                   :key="index" :text="item.name"/>
                </van-grid>
            </div>
        </van-popup>
    </div>
</template>

<script>
// 导入全部频道获取的api
import { getAllChannel, setUserChannels } from '@/api/channel.js'
export default {
  props: ['value', 'channelList', 'activeTab'],
  data () {
    return {
      // 关闭图标的显示与隐藏
      iconshow: false,
      // 全部频道
      allChannel: []
    }
  },
  methods: {
    // 获取频道的方法
    async getChannel () {
      let res = await getAllChannel(this.$http, {
        url: '/channels',
        method: 'GET'
      })
      console.log(res)
      // 获取全部频道
      this.allChannel = res.data.data.channels
    },
    // 当点击频道管理元素时触发
    changeActive (index) {
      this.$emit('update:activeTab', index)
    },
    // 往用户频道添加
    addChannel (item) {
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
      this.channelList.push(item)
      // 判断有没有登录
      let user = this.$store.state.user
      if (!user) {
        // 如果没有登录,就保存到本地
        window.localStorage.setItem('channels', JSON.stringify(this.channelList))
      } else {
        // 用户关注的频道
        let newArr = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        // 登录状态
        let res = setUserChannels(this.$http, {
          url: '/user/channels',
          method: 'PUT',
          data: {
            channels: newArr
          }
        })
        console.log(res)
      }
    },
    // 删除用户频道
    delChannel (index) {
      this.channelList.splice(index, 1)
      let user = this.$store.state.user
      if (!user) {
        // 如果没有登录,就保存到本地
        window.localStorage.setItem('channels', JSON.stringify(this.channelList))
      } else {
        // 用户关注的频道
        let newArr = this.channelList.slice(1).map((item, index) => {
          return {
            id: item.id,
            seq: index + 2
          }
        })
        // 登录状态
        let res = setUserChannels(this.$http, {
          url: '/user/channels',
          method: 'PUT',
          data: {
            channels: newArr
          }
        })
        console.log(res)
      }
    }
  },
  computed: {
    // 计算出没有的频道数据
    otherChannels: function () {
      // 1.0 得到所有自己频道的 id 集合
      let ids = this.channelList.map(item => {
        return item.id
      })
      // 2.0 得到剩余的频道
      let otherChannels = this.allChannel.filter(item => {
        return !ids.includes(item.id)
      })
      // 3.0 返回结果
      return otherChannels
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style lang="less">
.editbtn{
    font-size: 14px;
}
.title{
    font-size: 12px;
}
.channelword {
    position: relative;
    .channelicon {
        position: absolute;
        top: 0;
        right: 0;
        color: #ccc;
    }
}
.active {
    color: red;
}
</style>
