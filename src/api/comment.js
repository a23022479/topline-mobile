// 获取文章评论
function getComment (axios, { source, offset, limit }) {
  return axios({
    url: '/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: source,
      offset: offset,
      limit: limit
    }
  })
}
// 获取评论的回复
function getReplay (axios, { source, offset, limit }) {
  return axios({
    url: '/comments',
    method: 'GET',
    params: {
      type: 'c',
      source: source,
      offset: offset,
      limit: limit
    }
  })
}
// 导出方法
export { getComment, getReplay }
