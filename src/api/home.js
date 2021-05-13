import request from '@/utils/request'
import qs from 'qs'
export function getPartnerProject(params) {
  return request({
    url: 'api/projectInfo/queryByPartner' + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}
export function getPartnerProjectDetail(params) {
  return request({
    url: 'api/projectInfo/detail' + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}
export function getPartnerProjectDetail2(params) {
  return request({
    url: 'api/projectDraft/detail' + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}
export function getProjectQuestions(params) {
  return request({
    url: 'api/projectQuestion' + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}
export function setProjectQuestions(params) {
  return request({
    url: 'api/projectQuestion',
    method: 'post',
    data: params
  })
}
export function setProjectApply(id) {
  return request({
    url: '/api/projectInfo/projectApply',
    method: 'post',
    data: id
  })
}
export function changeUserRole(id) {
  return request({
    url: '/auth/changeLoginType',
    method: 'post',
    data: id
  })
}
export function getProjectFollow(params) {
  return request({
    url: 'api/projectFeedback' + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}
export function setProjectFollow(params) {
  return request({
    url: 'api/projectFeedback',
    method: 'post',
    data: params
  })
}
export function getClientProjects(params) {
  return request({
    url: 'api/projectDraft' + '?' + qs.stringify(params, { indices: false }),
    method: 'get',
    data: params
  })
}
