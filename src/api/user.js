import request from '@/utils/request'
import qs from 'qs'


export function setUserPwd(params) {
  return request({
    url: 'api/projectPartner/updatePass',
    method: 'post',
    data:params
  })
}
export function setUserInfo(params) {
  return request({
    url: 'api/projectPartner',
    method: 'put',
    data:params
  })
}
