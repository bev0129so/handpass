import {request} from './request'
// 创建订单
export const publishOrder = (data) => {
    return request({
      url: '/orders/publish',
      method: 'post',
      data
    })
  }

  // 获取用户发布的定单
export function publishedOrders(params) {
  return request({
    url: '/orders/publishOrders',
    params
  })
}

export const getHistoryOrder = () => {
  return request({
    url: 'historyOrder',
    method: 'post',
  })
}