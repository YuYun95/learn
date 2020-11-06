/**
 * 资源请求模块
 */
import request from '@/utils/request'

export const getResourcePages = (data: object) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}
