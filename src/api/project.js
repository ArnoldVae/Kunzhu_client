import request from '@/utils/request'
import qs from 'qs'

export function add(data) {

  return request({
    url: 'api/projectInfo',
    method: 'post',
    data:data
  })
}

export function del(ids) {
  return request({
    url: 'api/projectInfo',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {

  return request({
    url: 'api/projectInfo',
    method: 'put',
    data:data
  })
}
export function getProDetail(params) {
  return request({
    url: 'api/projectInfo/detail'+ '?' + qs.stringify(params, { indices: false }),
    method: 'get',
  })
}
export function fileToDel(ids) {
  return request({
    url: 'api/files',
    method: 'delete',
    data: ids
  })
}
export function setHideOrShow(id) {
  return request({
    url: 'api/projectInfo/hideOrShow',
    method: 'post',
    data: id
  })
}
export function ToCloseApply(id) {
  return request({
    url: 'api/projectInfo/closeApply',
    method: 'post',
    data: id
  })
}


export default { add, edit, del,getProDetail,setHideOrShow,ToCloseApply }
