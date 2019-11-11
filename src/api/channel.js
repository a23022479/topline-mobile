// 获取频道数组的api封装
function getChannel (axios, { url, method }) {
  return axios({
    url: url,
    method: method
  })
}
// 获取全部频道
function getAllChannel (axios, { url, method }) {
  return axios({
    url,
    method
  })
}
// 设置频道数据
function setUserChannels (axios, { url, method, data }) {
  return axios({
    url,
    method,
    data
  })
}
// 导出方法
export { getChannel, getAllChannel, setUserChannels }
