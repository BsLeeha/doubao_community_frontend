import request from '@/utils/request'

// 列表
export function getArticleList(pageNo, size, type) {
  return request(({
    url: '/article/list',
    method: 'get',
    params: { pageNo: pageNo, size: size, type: type }
  }))
}

// 发布
export function postArticle(topic) {
  return request({
    url: '/article/create',
    method: 'article',
    data: topic
  })
}

// 浏览
export function getArticle(id) {
  return request({
    url: '/article',
    method: 'get',
    params: {
      articleId: id
    }
  })
}

// 获取详情页推荐
export function getRecommendTopics(id) {
  return request({
    url: '/article/recommend',
    method: 'get',
    params: {
      articleId: id
    }
  })
}

export function updateArticle(topic) {
  return request({
    url: '/article/update',
    method: 'article',
    data: topic
  })
}

export function deleteArticle(id) {
  return request({
    url: `/article/delete/${id}`,
    method: 'delete'
  })
}

