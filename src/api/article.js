// 获取文章方法
function getArticle (axios, { url, method, query }) {
  return axios({
    url: url,
    method: method,
    params: query
  })
}
// 举报文章方法
function reportArticle (axios, { target, type }) {
  return axios({
    url: '/article/reports',
    method: 'POST',
    data: {
      target: target,
      type: type
    }
  })
}
// 隐藏文章方法
function hideArticle (axios, { url, method }) {
  return axios({
    url,
    method
  })
}
// 给文章点赞api
function likeArt (axios, target) {
  return axios({
    url: '/article/likings',
    method: 'POST',
    data: {
      target: target
    }
  })
}
// 取消文章点赞
function quxiaogoodArt (axios, artid) {
  return axios({
    url: `/article/likings/${artid}`,
    method: 'DELETE'
  })
}
// 不喜欢文章
function dislikeArt (axios, artid) {
  return axios({
    url: '/article/dislikes',
    method: 'POST',
    data: {
      target: artid
    }
  })
}
// 取消不喜欢文章
function nodislikeArt (axios, artid) {
  return axios({
    url: `/article/dislikes/${artid}`,
    method: 'DELETE'
  })
}
// 获取文章详情
function getArticleInfo (axios, artid) {
  return axios({
    url: `articles/${artid}`,
    method: 'GET'
  })
}
// 给文章留言
function addComments (axios, { artid, content }) {
  return axios({
    url: '/comments',
    method: 'POST',
    data: {
      target: artid,
      content
    }
  })
}

// 给评论回复
function addhuifu (axios, { target, content, artid }) {
  return axios({
    url: '/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: artid
    }
  })
}
// 导出方法
export { getArticle, reportArticle, hideArticle, likeArt, getArticleInfo, quxiaogoodArt, dislikeArt, nodislikeArt, addComments, addhuifu }
