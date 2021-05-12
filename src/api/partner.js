import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'api/projectPartner',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/projectPartner',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/projectPartner',
    method: 'put',
    data
  })
}
export function getPartnerList(data){
  return request({
    url: 'api/projectPartner',
    method: 'get',
    data
  })
}
export default { add, edit, del }
