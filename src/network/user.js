import {request} from './request'
export const logout = () => {
    return request({
        url: '/logout',
        method: 'post'
    })
}

export const login = (data) => {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

export const register = (data) => {
    return request({
      url: 'register',
      method: 'post',
      data
    })
}

// 获取当前用户信息
export const getUserInfo = () => {
    return request({
      url: '/info',
    })
  }

  // 根据id获取用户信息
export function getUserInfoById(params) {
    return request({
      url: '/admin/getUserById',
      params
    })
  }