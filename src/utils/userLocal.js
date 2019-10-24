// 定义一个localstorage 保存的名
const USER_KEY = 'user'

// 添加到localstorage
function setUserLocal (value) {
  window.localStorage.setItem(USER_KEY, JSON.stringify(value))
}
// 删除
function removeUserLocal () {
  window.localStorage.removeItem(USER_KEY)
}
// 查询获取
function getUserLocal () {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}

// 导出
export {
  setUserLocal,
  removeUserLocal,
  getUserLocal
}
