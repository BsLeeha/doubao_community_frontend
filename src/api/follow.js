import request from '@/utils/request'

// 关注
export function follow(userId) {
  return request(({
    url: `/relationship/follow/${userId}`,
    method: 'get'
  }))
}

// 关注
export function unFollow(userId) {
  return request(({
    url: `/relationship/unfollow/${userId}`,
    method: 'get'
  }))
}

// 验证是否关注
export function isFollow(followUserId) {
  return request(({
    url: '/relationship/isfollow/${followUserId}',
    method: 'get'
  }))
}
