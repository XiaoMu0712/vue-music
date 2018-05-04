import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'

export function getVkey(songmid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 456607854,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    songmid: songmid,
    filename: `${songmid}.m4a`,
    guid: 8593947940
  })

  return jsonp(url, data, options)
}