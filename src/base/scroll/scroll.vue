<template>
  <div ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    probeType: {
      type: Number,
      default: 1 // 屏幕滑动超过一定时间后派发scroll事件
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullup: {
      type: Boolean,
      default: false
    },
    boforeScroll: {
      type: Boolean,
      default: false
    }
    // refreshDelay: {
    //   type: Number,
    //   default: 20
    // }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  // 数据更新后重新计算滚动高度
  updated() {
    setTimeout(() => {
      this.refresh()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.scrollWrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.scrollWrapper, {
        probeType: this.probeType,
        click: this.click
      })

      if (this.listenScroll) {
        let _this = this
        this.scroll.on('scroll', (pos) => {
          _this.$emit('scroll', pos)
        })
      }

      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }

      if (this.boforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },

    // 方法代理
    enabele() {
      this.scroll && this.scroll.enabele() // &&前为true，返回&&后面的值
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh() // 刷新scroll，重新计算其高度
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  }
  // watch: {
  //   data() {
  //     setTimeout(() => {
  //       this.refresh()
  //     }, 20)
  //   }
  // }
}
</script>
