import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getDiscDetail(id) {
  const url = '/api/getDiscDetail'
  const data = Object.assign({}, commonParams, {
    disstid: id,
    g_tk: 756739584,
    hostUin: 0,
    platform: 'yqq',
    format: 'jsonp',
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    needNewCode: 0
  })
  return axios.get(url, { params: data }).then(res => {
    return Promise.resolve(res.data)
  })
}