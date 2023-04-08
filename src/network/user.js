import {request} from './request'
export const logout = () => {
    return request({
        url: '/logout',
        method: 'post'
    })
}