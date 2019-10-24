// 用户登录请求方法封装
function userLogin (axios, { url, method, data }) {
  return axios({
    url: url,
    method: method,
    data: data
  })
}

// 导出方法
export { userLogin }
