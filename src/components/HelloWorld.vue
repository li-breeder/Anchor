<template>
  <div>
    <!-- 内容区域 -->
    <div class="content">
      <div>一级标题页面</div>
      <div>一级标题页面</div>
      <div>二级标题页面</div>
      <div>二级标题页面</div>
      <div>一级标题页面</div>
      <div>一级标题页面</div>
    </div>
    <!-- 导航区域 -->
    <ul class="nav">
      <li :class="{active: active===0}" @click="scrollTo(0)">一级标题</li>
      <li :class="{active: active===1}" @click="scrollTo(1)">一级标题</li>
        <ul class="nav2">
          <li :class="{active: active===2}" @click="scrollTo(2)">二级标题</li>
          <li :class="{active: active===3}" @click="scrollTo(3)">二级标题</li>
        </ul>
      <li :class="{active: active===4}" @click="scrollTo(4)">一级标题</li>
      <li :class="{active: active===5}" @click="scrollTo(5)">一级标题</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Anchor',
  data () {
    return {
      active: 0 // 当前激活的导航索引
    }
  },
  methods: {
    // 监听滚动器
    onScroll () {
      const navContents = document.querySelectorAll('.content div')
      const offsetTopArray = []
      navContents.forEach(item => {
        offsetTopArray.push(item.offsetTop)
      })

      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

      let navIndex = 0
      for (let i = 0; i < offsetTopArray.length; i++) {
        if (scrollTop >= offsetTopArray[i]) {
          navIndex = i
        }
      }
      this.active = navIndex
    },

    // 滚动函数
    scrollTo (index) {
      // 获取目标的offsetTop
      const targetOffsetTop = document.querySelector(`.content div:nth-child(${index + 1})`).offsetTop

      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const STEP = 50
      if (scrollTop > targetOffsetTop) {
        smoothUp() // 往上滑
      } else {
        smoothDown() // 往下滑
      }

      // 上滑函数 (平稳上滑动画效果)
      function smoothUp () {
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP
          } else {
            scrollTop = targetOffsetTop
          }
          document.body.scrollTop = scrollTop
          document.documentElement.scrollTop = scrollTop
          requestAnimationFrame(smoothUp) // 使用该函数每一帧动画渲染不掉帧
        }
      }

      // 下滑函数 (平稳下滑动画效果)
      function smoothDown () {
        if (scrollTop < targetOffsetTop) {
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP
          } else {
            scrollTop = targetOffsetTop
          }
          document.body.scrollTop = scrollTop
          document.documentElement.scrollTop = scrollTop
          requestAnimationFrame(smoothDown) // 使用该函数每一帧动画渲染不掉帧
        }
      }
    }
  },
  mounted () {
    // 监听滚动事件
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    // 组件销毁时移除滚动事件
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 内容区样式  */
.content {
  background-color:white;
  width: 600px;
}
.content div {
  width: 100%;
  height: 500px;
  font-size: 48px;
  padding: 50%;
  background-color: #7ec384;
}
.content div:nth-child(2n) {
  background-color: #847ec3;
}

/* 导航栏样式 */
.nav {
  position: fixed;
  top: 50px;
  right: 100px;
  background-color:  #efefef;
}
.nav li {
  font-size: 36px;
  padding: 5px 20px;
  line-height: 1.6;
}
.nav .active {
  color: #007FFF;
  background-color: #e2e2e2;
}
</style>
