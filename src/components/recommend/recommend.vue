<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" ref="scroll">
      <div>
        <div class="slider-wrapper" v-if="recommends.length">
          <slider>
            <div v-for="item in recommends" :key="item.id">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="" @load="loadImg">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item"
                v-for="item in songList"
                :key="item.id"
                @click="selectItem(item)"
                >
              <div class="icon">
                <img :src="item.picUrl" alt="" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name">{{ item.songListDesc }}</h2>
                <p class="author">播放数：{{ Math.round((item.accessnum/10000)*10)/10 }}万</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'

export default {
  mixins: [
    playlistMixin
  ],
  components: {
    Slider,
    Scroll
  },
  data() {
    return {
      recommends: [],
      songList: []
    }
  },
  created() {
    this._getRecommend()
    this._getSongList()
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data.slider)
          this.recommends = res.data.slider
          // console.log(this.recommends)
        }
      }).catch((err) => {
        console.log('出错了！错误：' + err)
      })
    },
    _getSongList() {
      getRecommend().then((res) => {
        // console.log(res.data.songList)
        if (res.code === ERR_OK) {
          this.songList = res.data.songList
        }
      }).catch((err) => {
        console.log('出错了！错误：' + err)
      })
    },
    loadImg() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh() // 图片加载成功时，重新计算scroll的高度
        this.checkLoaded = true // 标志位，确保loadImg只执行一次
      }
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.id}`
      })
      this.setDisc(item)
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable";

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .author {
            color: $color-text-d;
          }
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
