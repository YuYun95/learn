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

/**
 * 查询资源分类列表
 * @param params
 */
export const getAllCategory = (params: any) => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll',
    params
  })
}

/**
 * 保存或者更新资源
 * @param data
 */
export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

/**
 * 删除资源
 * @param id
 */
export const deleteResource = (id: any) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}

/**
 * 获取用户菜单和资源权限列表
 */
export const getUserPermissions = () => {
  return request({
    url: '/boss/permission/getUserPermissions',
    method: 'GET'
  })
}

/**
 * 保存或更新资源分类
 * @param data
 */
export const saveOrderUpdate = (data: any) => {
  return request({
    url: '/boss/resource/category/saveOrderUpdate',
    method: 'POST',
    data
  })
}

/**
 * 删除资源分类，如果资源分类下有资源，不允许删除
 * @param id
 */
export const deleteCategory = (id: any) => {
  return request({
    url: `/boss/resource/category/${id}`,
    method: 'DELETE'
  })
}
