<template>
    <div>
        <van-search class="topsearch" @input="thinkSearch" v-model="search" placeholder="请输入搜索关键词" show-action  @search="onSearch" >
            <template slot="action">
                <van-button @click="onCancel" type="info">取消</van-button>
            </template>
        </van-search>
        <!-- 联想区域 -->
        <van-cell-group v-if="thinkList.length > 0">
          <van-cell @click="onSearch(item.item)" icon="search" v-for="(item,index) in thinkList " :key="index">
            <template slot="title">
              <div v-html="item.colorItem"></div>
            </template>
          </van-cell>
        </van-cell-group>
        <!-- 搜索历史 -->
        <van-cell-group v-else>
          <van-cell title="搜索历史" >
            <template slot="default">
              <van-icon v-if="isShow === false" name="delete" @click="isShow = true"/>
              <div v-if="isShow === true">
                <a href="#" style="margin: 0 10px" @click="deleteHistory">清空历史</a>
                <a href="#" @click="isShow =false">完成</a>
              </div>
            </template>
          </van-cell>
          <van-cell :title="item" v-for="(item,index) in historyList" :key="index" @click="onSearch(item)">
            <template slot="icon">
              <van-icon style="line-height:24px;margin-right:5px" name="search" />
            </template>
            <template slot="default">
              <van-icon name="cross" @click.stop="deleteOne(index)" />
            </template>
          </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
// 联想搜索方法
import { apiThinkSearch } from '@/api/search.js'
export default {
  data () {
    return {
      // 搜索关键词
      search: '',
      // 联想的结果
      thinkList: [],
      // 定时器
      timer: null,
      // 清空历史的显示与隐藏
      isShow: false,
      // 搜索历史数组
      historyList: JSON.parse(window.localStorage.getItem('history')) || []
    }
  },
  methods: {
    // 点击完成按钮时触发
    onSearch (item) {
      this.search = item
      if (this.search.trim().length === 0) {
        this.$toast('搜索内容不能为空')
        return false
      }
      // 将搜索内容保存到数组中
      this.historyList.unshift(this.search)
      // 数组去重
      this.historyList = [...new Set(this.historyList)]
      window.localStorage.setItem('history', JSON.stringify(this.historyList))
      // 得到搜索框的内容,跳转路由
      this.$router.push(`/searchList/${item}`)
    },
    // 点击取消按钮时触发,清空搜索框
    onCancel () {
      this.search = ''
    },
    // 联想操作
    thinkSearch () {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        if (this.search.trim().length === 0) {
          return
        }
        let res = await apiThinkSearch(this.$http, this.search)
        console.log(res)
        this.thinkList = res.data.data.options.map(item => {
          return {
            colorItem: item.split(this.search).join(`<span style="color:red">${this.search}</span>`),
            item: item
          }
        })
      }, 200)
    },
    // 删除全部搜索历史
    deleteHistory () {
      this.$dialog.confirm({
        message: '确认要清除全部历史?'
      }).then(() => {
        window.localStorage.removeItem('history')
        this.historyList = []
      })
    },
    // 删除单个搜索历史
    deleteOne (index) {
      this.historyList.splice(index, 1)
      window.localStorage.setItem('history', JSON.stringify(this.historyList))
    }
  },
  watch: {
    search: function () {
      if (this.search.trim().length === 0) {
        this.thinkList = []
      }
    }
  }
}
</script>

<style lang="less" >
.topsearch {
  height: 46px;
  background-color: #0094ff !important;
  /deep/ .van-search__action:active {
    background-color: #0094ff !important;
  }
}
</style>
