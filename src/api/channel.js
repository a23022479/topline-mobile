// 获取频道数组的api封装
function getChannel (axios, { url, method }) {
  return axios({
    url: url,
    method: method
  })
}
// 导出方法
export { getChannel }
