<template>

<el-container class="main-container hide-bar">
  <el-header>
      <div style="display: flex; align-items: center;">
        <img style="height: 25px; cursor: pointer;" src="../../../src/images/logo.png" alt="" @click="onLogoClick">
      </div>

      <div style="display: flex;">
        <div class="notice" style="display: flex; align-items: center; cursor: pointer;" @click="onGoFeedback">
          <i style="color: #777; font-size: 10px; padding: 1px 3px 0 0; transform: scale(0.85)" class="fas fa-comment-alt"></i>
          <span>工单</span>
          <i class="budge" v-if="hasReply"></i>
        </div>

        <div class="notice" style="display: flex; align-items: center; cursor: pointer;" @click="onGoNotice">
          <i style="color: #777; font-size: 10px; padding: 1px 3px 0 0;" class="fas fa-bell"></i>
          <span>消息</span>
          <i class="budge" v-if="!noticeAllReaded"></i>
        </div>

        <el-dropdown class="username">

          <span class="el-dropdown-link">
            {{username}}
          </span>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="onExitAccount">退出登录</el-dropdown-item>
          </el-dropdown-menu>

        </el-dropdown>
      </div>


    </el-header>


  <!-- <el-container> -->

    <el-main class="navigation navigation-menu">

      <el-aside  :style="{width: asideWidth + 'px'}">
        <!--<div class="navigation-open-close" @click="onOpenCloseAside">-->
          <!--<div class="navigation-open-close-img-wrap">-->
            <!--<img src="../../images/sw.svg">-->
          <!--</div>-->
        <!--</div>-->

        <el-menu
          :default-openeds="menuOpenIndexs"
          :default-active="menuIndex"
          class="el-menu-vertical-demo"
          background-color="#f9fafe"
          text-color="rgb(104, 114, 140)"
          active-text-color="#3a65eb"
          :collapse="isAsideClose">

          <el-menu-item index="1-0" @click="onMenuChange('user/info')">
            <template slot="title">
              <div class="nav-icon-wrap icon-back-user">
                <div class="nav-icon-inside-wrap">
                  <span class="fas fa-user user"></span>
                </div>
              </div>
              <span class="aside-txt">用户中心</span>
            </template>

            <!-- <el-menu-item-group>
              <el-menu-item index="1-0" @click="onMenuChange('user/info')">概览</el-menu-item>
              <el-menu-item index="1-1" @click="onMenuChange('user/setting')">账户设置</el-menu-item>
              <el-menu-item index="1-2" @click="onMenuChange('user/share')">推广返现</el-menu-item>
            </el-menu-item-group> -->
          </el-menu-item>

          <el-menu-item index="2-0" @click="onMenuChange('disapp/list')">
            <template slot="title">
              <div class="nav-icon-wrap icon-back-dispatch">
                <div class="nav-icon-inside-wrap">
                <!--<span class="fas fa-cloud-upload-alt dispatch"></span>-->
                  <span class="fas fa-cloud dispatch"></span>
                </div>
              </div>
              <span class="aside-txt">分发托管</span>
            </template>
            <!-- <el-menu-item-group>
              <el-menu-item index="2-0" @click="onMenuChange('disapp/list')">应用概览</el-menu-item>
              <el-menu-item index="2-1" @click="onMenuChange('disapp/download')">下载记录</el-menu-item>
              <el-menu-item index="2-2" @click="onMenuChange('disapp/look')">浏览记录</el-menu-item>
            </el-menu-item-group> -->
          </el-menu-item>

          <el-menu-item index="3-0" @click="onMenuChange('signapp/list')">
            <template slot="title">
              <div class="nav-icon-wrap icon-back-sign">
                <div class="nav-icon-inside-wrap">
                  <span class="fab fa-apple sign"></span>
                </div>
              </div>
              <span class="aside-txt">证书签名</span>
            </template>
            <!-- <el-menu-item-group>
              <el-menu-item index="3-0" @click="onMenuChange('signapp/list')">应用概览</el-menu-item>
              <el-menu-item index="3-1" @click="onMenuChange('signapp/recordlist')">签名记录</el-menu-item>
            </el-menu-item-group> -->
          </el-menu-item>

          <el-menu-item index="4-0" @click="onMenuChange('packapp/list')">
            <template slot="title">
              <div class="nav-icon-wrap icon-back-sign">
                <div class="nav-icon-inside-wrap">
                  <span class="fab fa-html5 html5"></span>
                </div>
              </div>
              <span class="aside-txt">封装打包</span>
            </template>
            <!-- <el-menu-item-group>
              <el-menu-item index="4-0" @click="onMenuChange('packapp/list')">应用概览</el-menu-item>
            </el-menu-item-group> -->
          </el-menu-item>

          <el-menu-item index="5-0" @click="onMenuChange('order/recharge')">
            <template slot="title">
              <div class="nav-icon-wrap icon-back-order">
                <div class="nav-icon-inside-wrap">
                  <span class="fas fa-shopping-cart order"></span>
                </div>
              </div>
              <span class="aside-txt">充值订单</span>
            </template>
            <!-- <el-menu-item-group>
              <el-menu-item index="5-0" @click="onMenuChange('order/recharge')">购买</el-menu-item>
              <el-menu-item index="5-1" @click="onMenuChange('order/list')">订单列表</el-menu-item>
            </el-menu-item-group> -->
          </el-menu-item>

        </el-menu>
      </el-aside>


    </el-main>

    <el-main class="main" :style="{left: asideWidth + 'px'}">
      <div class="submenu-sidbar">
        <el-menu
          :default-openeds="menuOpenIndexs"
          :default-active="subMenuIndex"
          class="el-menu-vertical-demo"
          background-color="#fff"
          text-color="rgb(104, 114, 140)"
          active-text-color="#3a65eb">
            <el-menu-item :class="{'item-active': subMenuIndex==item.index}" :index="item.index" :key="item.index"  @click="onMenuChange(item.url)" v-for="(item, idx) in currenRoute">{{item.title}}{{subMenuIndex}}{{item.index}}</el-menu-item>
        </el-menu>
      </div>
      <router-view class="content-container"></router-view>
    </el-main>

</el-container>


</template>

<script>
/* eslint-disable */
  import common from '../../util/common.js'
  import api from '../../util/api.js'

  export default {
    data () {
      return {
        menuOpenIndexs: ['1', '2', '3', '4', '5'],
        headerHeight: 60,
        isCollapse: false,
        asideWidth: 64,
        username: localStorage.username,
        currenRoute: [],
        routeMap: {
          user: [{
            index: '1-0',
            url: 'user/info',
            title: '概览'
          }, {
            index: '1-1',
            url: 'user/setting',
            title: '账户设置'
          }, {
            index: '1-2',
            url: 'user/share',
            title: '推广返现'
          }],
          disapp: [{
            index: '2-0',
            url: 'disapp/list',
            title: '应用概览'
          }, {
            index: '2-1',
            url: 'disapp/download',
            title: '下载记录'
          }, {
            index: '2-2',
            url: 'disapp/look',
            title: '浏览记录'
          }],
          signapp: [{
            index: '3-0',
            url: 'signapp/list',
            title: '应用概览'
          }, {
            index: '3-1',
            url: 'signapp/recordlist',
            title: '签名记录'
          }],
          packapp: [{
            index: '4-0',
            url: 'packapp/list',
            title: '概览'
          }],
          order: [{
            index: '5-0',
            url: 'order/recharge',
            title: '购买'
          }, {
            index: '5-1',
            url: 'order/list',
            title: '购买'
          }]
        }
      }
    },
    methods: {
      mouseover () {
        console.log('over')
      },
      onLogoClick () {
        window.open('https://51gsc.com')
      },
      onGoFeedback () {
        this.$router.push({
          name: 'feedback/list'
        })
      },
      onGoNotice () {
        this.$router.push({
          name: 'notice/list'
        })
      },
      onOpenCloseAside () {
        this.isCollapse = !this.isCollapse
      },
      handleOpen (key, keyPath) {
        this.isCollapse = true
      },
      handleClose (key, keyPath) {
        this.isCollapse = false
      },
      setCurrentRoute (name) {
        let routeMap = this.routeMap
        for (let key in routeMap) {
          for (let item of routeMap[key]) {
            if (item.url === name) {
              this.currenRoute = routeMap[key]
            }
          }
        }
        console.log(this.currenRoute)
      },
      onMenuChange (page, fromHook) { // 菜单状态缓存
        const pages = [
          [
            ['user/info', 'notice/list', 'notice/detail', 'feedback/list', 'feedback/detail'],
            ['user/setting'],
            ['user/share']
          ],

          [
            ['disapp/list', 'disapp/create', 'disapp/versions'],
            ['disapp/download'],
            ['disapp/look']
          ],

          [
            ['signapp/list'], ['signapp/recordlist']
          ],

          [
            ['packapp/list']
          ],

          [
            ['order/recharge'],
            ['order/list']
          ]
        ]

        for (var i = 0; i < pages.length; i++) {
          const arr = pages[i]

          for (var n = 0; n < arr.length; n++) {
            const pages = arr[n]

            if (pages.indexOf(page) > -1) {
              var index = (i + 1) + '-' + n
              this.$store.commit('changeMenuIndex', index)
              break
            }

          }

        }
        console.log(this.$store.state.menuIndex)
        if (!fromHook) {
          this.$router.push({
            name: page
          })
          this.requestUnread()
        }
      },
      requestUnread () {
        api.post('user/unread', {}, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$store.commit('changeNoticeAllReaded', data.data.has_new_notice == 0)
              this.$store.commit('changeHasReply', data.data.has_reply == 1)
            }
          }
        })
      },
      onExitAccount () {
        this.$confirm('是否退出当前账号？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'default'
        }).then(() => {
          localStorage.removeItem('token')
          this.$router.push({
            name: 'login'
          })
        }).catch(() => {
        })
      }
    },
    computed: {
      hasReply: function () {
        return this.$store.state.hasReply
      },
      noticeAllReaded: function () {
        return this.$store.state.noticeAllReaded
      },
      subMenuIndex: function () {
        return this.$store.state.menuIndex
      },
      menuIndex: function () {
        // console.log("menuIndex=%j", this.$store.state.menuIndex)
        return this.$store.state.menuIndex.split('-')[0] + '-' + '0'
      },
      isAsideClose: function () {
        if (this.isCollapse) {
          this.asideWidth = 64
        } else {
          this.asideWidth = 64
        }
        return this.isCollapse
      }
    },
    watch: {
      $route (val) {
        console.log(val)
        this.setCurrentRoute(val.name)
      }
    },
    created: function () {
      if (!localStorage.token) {
        this.$router.push({
          name: 'login'
        })
      }
      this.setCurrentRoute(this.$route.name)
      this.onMenuChange(this.$route.name, true)
      // this.currenRoute = this.routeMap.user
      // 全局路由钩子，监听浏览器前进后退
      this.$router.beforeEach((to, from, next) => {
        next()
        this.onMenuChange(to.name, true)
      })
      this.$router.afterEach((to, from) => {
        this.onMenuChange(to.name, true)
      })
    },
    beforeRouteEnter: (to, from, next) => { // 监听刷新页面
      next(vm => {
        vm.onMenuChange(to.name, true)
      })
    },
    beforeRouteUpdate: (to, from, next) => {
      console.log(to)
      // this.setCurrentRoute(to.name)
      next()
    }
  }
</script>
<style>
  .navigation-menu:hover .el-aside {
    width: 180px !important;
    overflow: hidden;
  }
  .navigation-menu:hover .el-aside .aside-txt {
    display: inline;
  }
</style>
<style scoped>
@import '../../css/common.css';
@import "../../src/fontawesome-5.7.1/css/all.min.css";

  /*全屏容器*/
  .submenu-sidbar {
    width: 240px;

  }
 .submenu-sidbar .el-menu-item {
  transition: none;
 }
  .submenu-sidbar .el-menu {
    padding-top: 40px;
    width: 240px;
  }
  .submenu-sidbar .item-active {
    background: rgba(58,101,235,.06) !important;
  }
  .main-container {
  }
  .hide-bar .aside-txt {
    display: none;
  }

  .el-menu {
    height: 100%;
  }
  .budge {
    width: 6px;
    height: 6px;
    border-radius: 4px;
    background-color: red;
    margin: 0 0 11px 1px;
    border: 1px solid rgba(0,0,0,0.1);
    opacity: 0.7;
  }
  .el-aside {
    background: #f9fafe;
    width: 64px;
    transition: width .4s ease;
  }
  .el-main {
    top: 0;
    padding-left: 0;
    display: flex;
  }
  .content-container {
    position: relative;
    padding: 40px 70px;
  }
  .el-main.main {
    position: absolute;
    top: 56px;
    right: 0;
    bottom: 0;
    padding: 0;
  }

  /*顶部*/
  /*.el-header {*/
    /*color: #333;*/
    /*line-height: 60px;*/
    /*background-color: #347EFF;*/
    /*font-size: 14px;*/
    /*height: 60px;*/
    /*width: 100%;*/
    /*box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);*/
    /*position: fixed;*/
    /*z-index: 999;*/
    /*display: flex;*/
    /*justify-content: space-between;*/
  /*}*/
  .el-header {
    background-color: white;
    color: #333;
    font-size: 14px;
    line-height: 56px;
    width: 100%;
    position: fixed;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    height: 56px !important;
    -webkit-box-shadow: 0 2px 6px 0 #ccd0d9;
    box-shadow: 0 2px 6px 0 #ccd0d9;

  }
  .notice {
    color: #777;
    margin-right: 30px;
  }
  .el-dropdown.username {
    color: #777;
    padding-right: 10px;
    font-size: 14px;
    cursor: pointer;
  }

  .el-dropdown span {
    padding-left: 6px;
  }

  /*左边导航*/
  .el-main.navigation {
    margin-top: 56px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0;
    background-color: white;
    box-shadow: 1px 0 6px 0 rgba(191, 200, 214, 0.12), 1px 0 4px 0 rgba(191, 200, 214, 0.31);
    transition: width .3s cubic-bezier(0.4, 0, 0, 1);
    z-index: 11;
  }
  .el-menu-item.item-active {
    color: #3a65eb !important;
  }
  .navigation-open-close {
    height: 50px;
    background-color: #F8FAFC;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
  }

  .navigation-open-close .navigation-open-close-img-wrap {
    width: 48px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 18px;
  }

  .navigation-open-close .navigation-open-close-img-wrap img {
    width: 10.5px;
    height: 14px;
  }

  .nav-icon-wrap {
    display: inline-block;
    margin-right: 5px;
    width: 22px;
    line-height: 22px;
    /*background-color: rgba(68, 136, 255, 0.25);*/
    border-radius: 11px;
    background: #3a65eb;
  }
  .icon-back-user {
    /*background-color: rgba(113, 184, 255, 1);*/
    /*background-color: #7888a6;*/
  }
  .icon-back-order {
    /*background-color: rgba(254, 197, 163, 1);*/
    /*background-color: #7888a6;*/
  }
  .icon-back-dispatch {
    /*background-color: rgba(30, 182, 141, 0.6);*/
    /*background-color: #7888a6;*/
  }

  .icon-back-sign {
    /*background-color: rgba(13, 113, 255, 0.6);*/
    /*background-color: #7888a6;*/
  }
  .nav-icon-inside-wrap {
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fas, .fab {
    color: white;
  }

  .fas.user {
    font-size: 12px !important;
  }

  .fas.order {
    padding-top: 2px;
    font-size: 11px !important;
    transform: scale(0.9);
  }

  .fas.dispatch {
    font-size: 10px !important;
    transform: scale(0.8);
  }

  .fab.sign {
    padding-bottom: 1px;
    font-size: 14px !important;
  }

  .fab.html5 {
    font-size: 14px !important;
    margin-top: 2px;
  }

  .fab.appstore {
  }
  /*.el-aside {

  }*/

  /*内容区*/
  .content-container {
    min-width: 920px;
  }
</style>
