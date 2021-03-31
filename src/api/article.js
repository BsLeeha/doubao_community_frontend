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
export function postArticle(article) {
  return request({
    url: '/article/create',
    method: 'post',
    data: article
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
export function getRecommendArticles(articleId) {
  return request({
    url: '/article/recommend',
    method: 'get',
    params: {
      articleId: articleId
    }
  })
}

export function updateArticle(article) {
  return request({
    url: '/article/update',
    method: 'post',
    data: article
  })
}

export function deleteArticle(id) {
  return request({
    url: `/article/delete/${id}`,
    method: 'delete'
  })
}

