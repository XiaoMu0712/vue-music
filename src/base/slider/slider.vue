<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
        没分发内容时显示
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in dots" :key="item.id" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'

export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()

      if (this.autoPlay) {
        this._play()
      }
    }, 20)

    // 监听视口发生变化时，重新计算slider宽度
    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children

      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }

      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initDots() {
      for (let index = 0; index < this.children.length; index++) {
        this.dots.push({
          id: index
        })
      }
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })

      this.slider.on('scrollEnd', () => { // better-scroll派发的一个自定义事件
        // console.log(this.slider.getCurrentPage().pageX)
        let pageIndex = this.slider.getCurrentPage().pageX
        // if (this.loop) {
        //   pageIndex -= 1
        // }
        // console.log(pageIndex)
        // if (pageIndex === this.dots.length) {
        //   pageIndex = 0
        // }
        this.currentPageIndex = pageIndex

        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play() {
      // let pageIndex = this.currentPageIndex + 1
      // console.log(pageIndex)
      // // if (this.loop) {
      // //   pageIndex += 1
      // // }
      // this.timer = setTimeout(() => {
      //   if (pageIndex === this.dots.length) { // 轮播到最后一页时，跳转到第一页
      //     pageIndex += 1
      //   }
      //   this.slider.goToPage(pageIndex, 0, 400) // better-scroll提供的一个api，0代表Y方向不轮播
      // }, this.interval)
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.slider.next() // better-scroll中定义的方法，用于处理自动轮
      }, this.interval)
    }
  },
  destroyed() {
    clearTimeout(this.timer)
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable";

.slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;
      a {
        display: block;
        // width: 100%;
        overflow: hidden;
        text-decoration: none;
        img {
          display: block;
          width: 100%; //这里不限制宽度将会按图片本身的宽度进行渲染
        }
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
