import {commonParams} from './config'
// import axios from 'axios'
import jsonp from 'common/js/jsonp'

export function getLyric(mid, id) {
  // const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  const url = 'https://api.darlin.me/music/lyric/' + id + '/'

  const data = Object.assign({}, commonParams, {
    pcachetime: +new Date(),
    songmid: mid,
    g_tk: 741400933,
    format: 'json',
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })

  return jsonp(url, data, {
    jsonp: 'callback'
  })

  // return axios.get(url, {
  //   params: data,
  //   headers: {
  //     referer: 'https://y.qq.com/portal/player.html'
  //   }
  // }).then((res) => {
  //   // return Promise.resolve(res.data)
  //   console.log(res)
  // }).catch((err) => {
  //   console.log(err)
  // })
}