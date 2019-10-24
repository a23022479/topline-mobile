function getArticle (axios, { url, method, query }) {
  return axios({
    url: url,
    method: method,
    params: query
  })
}
// 导出方法
export { getArticle }
