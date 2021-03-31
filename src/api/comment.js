import request from '@/utils/request'

export function fetchCommentsByArticleId(articleId) {
  return request({
    url: '/comment/list',
    method: 'get',
    params: {
      articleId: articleId
    }
  })
}

export function pushComment(data) {
  return request({
    url: '/comment/add',
    method: 'post',
    data: data
  })
}

