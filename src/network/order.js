import {request} from './request'
// 创建订单
export const publishOrder = (data) => {
    return request({
      url: '/orders/publish',
      method: 'post',
      data
    })
  }