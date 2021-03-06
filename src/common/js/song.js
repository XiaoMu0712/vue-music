import {getLyric} from 'api/lyric'
import {ERR_OK} from 'api/config'
import {Base64} from 'js-base64'
// import {getVkey} from 'api/vkey'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
  _getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid, this.id).then((res) => {
        if (res.code === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          return resolve(this.lyric)
          // console.log(this.lyric)
        } else {
          return reject(new Error('no lyric'))
        }
      })
    })
  }
}

export function createSong(musicData) {
  // console.log('createSong')
  // console.log(_getVkey(musicData.songmid))
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://thirdparty.gtimg.com/C100${musicData.songmid}.m4a?fromtag=38`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

// function _getVkey(songmid) {
//   let vkey = ''
//   getVkey(songmid).then((res) => {
//     if (res.code === ERR_OK) {
//       vkey = res.data.items[0].vkey
//     }
//   })
//   return vkey
// }