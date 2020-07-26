<template>
  <div>
    <!-- 内容区域 -->
     <div class="content">
      <div v-for="(item, index) in items" :key="index" :id="item.id">{{ item.text }}</div>
    </div>
    <!-- 导航区域 -->
    <ul class="nav">
      <li>
        <a
          :href="link"
          :title="title"
          :class="{active: active === 0}"
          @click="linkTo(0);scrollTo(0)">
          一级标题
        </a>
      </li>
      <li>
        <a
          :href="link"
          :title="title"
          :class="{active: active === 1}"
          @click="linkTo(1);scrollTo(1)">
          一级标题
        </a>
      </li>
      <ul>
        <li>
          <a
            :href="link"
            :title="title"
            :class="{active: active === 2}"
            @click="linkTo(2);scrollTo(2)">
            二级标题
          </a>
        </li>
            <li>
          <a
            :href="link"
            :title="title"
            :class="{active: active === 3}"
            @click="linkTo(3);scrollTo(3)">
            二级标题
          </a>
        </li>
      </ul>
      <li>
        <a
          :href="link"
          :title="title"
          :class="{active: active === 4}"
          @click="linkTo(4);scrollTo(4)">
          一级标题
        </a>
      </li>
     <li>
        <a
          :href="link"
          :title="title"
          :class="{active: active === 5}"
          @click="linkTo(5);scrollTo(5)">
          一级标题
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
const name = 'Anchor'
export default {
  name,
  data () {
    return {
      active: 0, // 当前激活的导航索引
      items: [
        {text: '一级标题页面', id: 'div1'},
        {text: '一级标题页面', id: 'div2'},
        {text: '二级标题页面', id: 'div3'},
        {text: '二级标题页面', id: 'div4'},
        {text: '一级标题页面', id: 'div5'},
        {text: '一级标题页面', id: 'div6'}
      ]
    }
  },
  computed: {
  },
  methods: {
    // 锚点跳转
    linkTo (index) {
      const navContents = document.querySelectorAll('.content div')
      const array = []
      const key = 'id'
      navContents.forEach(item => {
        array.push(`#${item[key]}`)
      })
      // console.log(array[index])
      window.location.href = array[index]
    },

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

<style scoped>
/* 内容区样式  */
.content {
  background-color:#FFFFFF;
  width: 300px;
}
.content div {
  width: 100%;
  height: 500px;
  font-size: 48px;
  padding: 50%;
  margin: 10px 0;
  color:#FFFFFF;
  background-color:rgb(54, 77, 121);
}
.content div:nth-child(2n) {
    background-color: #847ec3;
}

/* 导航栏样式 */
.nav {
  position: fixed;
  top: 50px;
  right: 100px;
}
.nav:before {
  content: "";
  position: absolute;
  top: 0;
  left: 7px;
  bottom: 0;
  width: 5px;
  background-color:#e8e8e8;
  opacity: .5;
}
.nav li {
  font-size: 36px;
  padding: 5px 20px;
  line-height: 1.6;
  list-style-type: none;
}
.nav .active {
  color: #007FFF;
  background-color: #e2e2e2;
}
</style>
