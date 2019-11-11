// 联想搜索方法
function apiThinkSearch (axios, q) {
  return axios({
    url: `/suggestion?q=${q}`,
    method: 'GET'
  })
}
// 获取搜索列表犯法
function getSearchRes (axios, { page, perpage, q }) {
  return axios({
    url: '/search',
    method: 'GET',
    params: {
      page: page,
      per_page: perpage,
      q: q
    }
  })
}
export { apiThinkSearch, getSearchRes }
