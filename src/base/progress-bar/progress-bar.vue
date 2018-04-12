<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper">
        <div
          class="progress-btn"
          ref="progressBtn"
          @touchstart.prevent="progressTouchStart"
          @touchmove.prevent="progressTouchMove"
          @touchend.prevent="progressTouchEnd"
          ></div>
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 16

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    progressTouchStart(e) {
      this.touch.initiated = true // 标志位
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      // console.log(deltaX)
      // 进度条按钮滑动的位置必须处于进度条内
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth / 2, Math.max(0, this.touch.left + deltaX))
      this._setOffsetWidth(offsetWidth)
    },
    progressTouchEnd(e) {
      this.touch.initiated = false
      this.trrigerPercent()
    },
    progressClick(e) {
      let offsetWidth = e.clientX - this.$refs.progressBar.getBoundingClientRect().left
      this._setOffsetWidth(offsetWidth)
      this.trrigerPercent()
    },
    trrigerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth / 2
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    },
    _setOffsetWidth(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style['transform'] = `translate3d(${offsetWidth}px, 0, 0)`
      this.$refs.progressBtn.style['-webkit-transform'] = `translate3d(${offsetWidth}px, 0, 0)`
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth / 2
        const offsetWidth = barWidth * newPercent
        this._setOffsetWidth(offsetWidth)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable";

.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
