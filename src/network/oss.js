import { request } from "./request"

export const policy = () => {
    return request({
        url: '/aliyun/oss/policy',
        method: 'get'
    })
}