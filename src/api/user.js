// 用户登录请求方法封装
function userLogin (axios, { url, method, data }) {
  return axios({
    url: url,
    method: method,
    data: data
  })
}
// 拉黑用户方法
function userBlack (axios, userid) {
  return axios({
    url: '/user/blacklists',
    method: 'POST',
    data: {
      target: userid
    }
  })
}
// 取消用户关注
function quxiaoFollow (axios, userid) {
  return axios({
    url: `/user/followings/${userid}`,
    method: 'DELETE'
  })
}
// 关注用户
function gzFollow (axios, userid) {
  return axios({
    url: '/user/followings',
    method: 'POST',
    data: {
      target: userid
    }
  })
}
// 获取用户自己信息
function getUser (axios, userid) {
  return axios({
    url: '/user',
    method: 'GET',
    target: userid
  })
}
// 导出方法
export { userLogin, userBlack, quxiaoFollow, gzFollow, getUser }
