webpackJsonp([4],{gmN4:function(t,s){},"qP2/":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("4YfN"),n=e.n(i),r=e("AyDw"),a=e("ZV4u"),l=e("qwAB"),c=e("PvFA"),o=e("9rMa"),u=e("F4+m"),f={props:{title:{type:String,default:""}}},h={render:function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"no-result"},[s("div",{staticClass:"no-result-icon"}),this._v(" "),s("p",{staticClass:"no-result-text"},[this._v(this._s(this.title))])])},staticRenderFns:[]};var v=e("Z0/y")(f,h,!1,function(t){e("xSUC")},"data-v-8212b15e",null).exports,d={mixins:[u.b],components:{Switches:r.a,SongList:a.a,Scroll:l.a,NoResult:v},data:function(){return{currentIndex:0,switches:[{name:"我喜欢的"},{name:"最近播放"}],bottom:""}},computed:n()({noResult:function(){return 0===this.currentIndex?!this.favoriteList.length:!this.playHistory.length},noResultDesc:function(){return 0===this.currentIndex?"暂无收藏歌曲":"你还没听过去歌曲"}},Object(o.c)(["favoriteList","playHistory","playlist"])),methods:n()({handlePlaylist:function(t){var s=t.length?"60px":"";this.$refs.listWrapper.style.bottom=s,this.$refs.favoriteList&&this.$refs.favoriteList.refresh(),this.$refs.playHistory&&this.$refs.playHistory.refresh()},back:function(){this.$router.back()},switchItem:function(t){this.currentIndex=t},selectSong:function(t){this.insertSong(new c.b(t))},random:function(){var t=0===this.currentIndex?this.favoriteList:this.playHistory;0!==t.length&&(t=t.map(function(t){return new c.b(t)}),this.randomPlay({list:t}))}},Object(o.b)(["insertSong","randomPlay"]))},p={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("transition",{attrs:{name:"slide"}},[e("div",{staticClass:"user-center"},[e("div",{staticClass:"back",on:{click:t.back}},[e("i",{staticClass:"icon-back"})]),t._v(" "),e("div",{staticClass:"switches-wrapper"},[e("switches",{attrs:{switches:t.switches,currentIndex:t.currentIndex},on:{switch:t.switchItem}})],1),t._v(" "),e("div",{ref:"playBtn",staticClass:"play-btn",on:{click:t.random}},[e("i",{staticClass:"icon-play"}),t._v(" "),e("span",{staticClass:"text"},[t._v("随机播放全部")])]),t._v(" "),e("div",{ref:"listWrapper",staticClass:"list-wrapper"},[0===t.currentIndex?e("scroll",{ref:"favoriteList",staticClass:"list-scroll"},[e("div",{staticClass:"list-inner"},[e("song-list",{attrs:{songs:t.favoriteList},on:{select:t.selectSong}})],1)]):t._e(),t._v(" "),1===t.currentIndex?e("scroll",{ref:"playHistory",staticClass:"list-scroll"},[e("div",{staticClass:"list-inner"},[e("song-list",{attrs:{songs:t.playHistory},on:{select:t.selectSong}})],1)]):t._e()],1),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.noResult,expression:"noResult"}],staticClass:"no-result-wrapper"},[e("no-result",{attrs:{title:t.noResultDesc}})],1)])])},staticRenderFns:[]};var y=e("Z0/y")(d,p,!1,function(t){e("gmN4")},"data-v-f79fc10e",null);s.default=y.exports},xSUC:function(t,s){}});
//# sourceMappingURL=4.0d7ffb6d413e0e181cf8.js.map