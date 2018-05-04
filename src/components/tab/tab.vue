<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="tab-link">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="tab-link">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="tab-link">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="tab-link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable";
.tab {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;
  .tab-item {
    flex: 1;
    text-align: center;
    .tab-link {
      padding-bottom: 5px;
      color: $color-text-l;
    }
    &.router-link-active {
      animation: fade 1s ease;
      .tab-link {
        color: $color-theme;
        transition: border-bottom .5s;
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}

@keyframes fade {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: $color-highlight-background;
  }
  100% {
    background-color: transparent;
  }
}
</style>
