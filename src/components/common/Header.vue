<template>
  <div>
    <header id="header" class="module header-module">
      <div class="module-inner">
        <div class="header-left">
          <div class="logo"><img src="../../images/fei-logo.png"></div>

        </div>
        <div class="menu" :class="{'open-menu': isMenuOpen}" id="headerMenu">
          <ul  class="menu-item">
            <li class="active"><a href="http://www.fei.cn/index.html" title="首页">首页</a></li>
            <li class="pc-prd" :class="{'p-active': isOpen}" @mouseover="over" @mouseout="out"><a class="prd-link" href="javascript:void(0)" title="产品">产品</a></li>
            <li class="wap-prd" @click.stop="wapOpenPrd"><a href="javascript:void(0)" title="产品">产品</a></li>
            <li><a href="http://www.fei.cn/doc.html" title="文档">文档</a></li>
            <li><a href="" title="工具">工具</a></li>
          </ul>
          <div class="right  pc-right">
            <a href="https://my.51gsc.com/reg" class="btn">
              <i class="iconfont icon-gift"></i>
              注册有礼
            </a>
            <a href="https://my.51gsc.com/login" class="btn btn-blue">
              登录
            </a>
          </div>
        </div>


        <div class="right wap-right">
          <div class="more" id="more" @click.stop="switchMenu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

    </header>
    <div class="prd-list" @click.stop="emptyFn" :class="{'pc-open-prd': isOpen, 'open-prd': isOpenWap}" id="prdList">
      <div class="prd-list-inner" @mouseover="prdOver" @mouseout="prdOut">
        <div class="prd-tag">
          <h3>分发</h3>
          <ul>
            <li><a href="http://www.fei.cn/cdn.html?idx=0" title="">分发</a></li>
          </ul>
        </div>
        <div class="prd-tag">
          <h3>封装</h3>
          <ul>
            <li><a href="http://www.fei.cn/pack.html?idx=0" title="">传统封装</a></li>
            <li><a href="http://www.fei.cn/pack.html?idx=1" title="">无闪封装</a></li>
          </ul>
        </div>
        <div class="prd-tag">
          <h3>签名</h3>
          <ul>
            <li><a href="http://www.fei.cn/sign.html?idx=0" title="">个人签名</a></li>
            <li><a href="http://www.fei.cn/sign.html?idx=1" title="">企业签名</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        isOpen: false,
        isOpenWap: false,
        isMenuOpen: false
      }
    },
    methods: {
      emptyFn () {},
      over (e) {
        this.isOpen = true
      },
      out (e) {
        if (e.relatedTarget && e.relatedTarget.className && e.relatedTarget.className.indexOf('prd-list-inner') < 0) {
          this.isOpen = false
        }
      },
      wapOpenPrd () {
        this.isOpenWap = true
      },
      prdOver () {
        this.isOpen = true
      },
      prdOut (e) {
        console.log(e)
        if (e.relatedTarget && e.relatedTarget.className && e.relatedTarget.className.indexOf('prd-link') < 0) {
          this.isOpen = false
        }
      },
      switchMenu () {
        if (this.isOpenWap) {
          this.isMenuOpen = true
          this.isOpenWap = false
        } else {
          this.isMenuOpen = !this.isMenuOpen
        }
      }
    },
    mounted () {
      let that = this
      document.onclick = function () {
        that.isOpenWap = false
        that.isMenuOpen = false
      }
    }
  }
</script>
<style>

</style>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    -moz-user-focus: none;
    -moz-user-select: none;
    font-family: "PingFang SC","Hiragino Sans GB","\5FAE\8F6F\96C5\9ED1","Microsoft Yahei",tahoma,arial,"\5B8B\4F53";
    font-size: 13px;
  }
  ul,li {
    list-style: none;
  }
  .module {
    padding: 0 5%;
  }
  .module-inner {
    max-width: 1200px;
    margin: 0 auto;
  }
  /** 按钮 */
  .btn {
    padding: 5px 15px;
    background: #fff;
    border:1px solid #e8e8e8;
    border-radius: 4px;
    color: #888;
    font-size: 12px;
    cursor: pointer;
    display: inline-block;
    transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
  }
  .btn i {
    transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
  }
  .btn:hover {
    color: #4758ee;
    border-color: #4758ee;
  }
  .btn.btn-blue {
    background-color: #4758ee;
    border: 1px solid #4758ee;
    color: #fff;
    transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
  }
  .btn.btn-blue:hover {
    background-color: #3357df;
  }

  /** 头部 */
  .logo img {
    height: 45px;
    margin-right: 30px;
  }
  .menu {
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
  }
  .header-module  {
    height: 60px;
    border-bottom: 1px solid #e8e8e8;
    background: #fff;
    position: fixed;
    left: 0;
    right: 0;
    z-index: 10;
    top: 0;
    z-index: 100;
  }
  .more {
    display: flex;
    flex-direction: column;
    height: 20px;
    width: 30px;
    justify-content: space-between;
    margin-left: 40px;
  }
  .more span {
    height: 2px;
    background: #3B426B;
  }
  .menu-item {
    display: flex;
    flex: 1;
  }
  .menu-item a {
    display: block;
    height: 60px;
    line-height: 60px;
    padding: 0 10px;
    margin: 0 10px;
    color: #515a6e;
    font-size: 14px;
    border-bottom: 1px solid transparent;
    transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
  }
  .menu-item li {
    border-bottom: 1px solid transparent;
  }
  .menu-item li.active a {
    color: #4758ee;
  }
  .menu-item li.active {
    border-bottom: 1px solid #4758ee;
    color: #4758ee;
  }
  .menu-item li:hover {
    border-bottom: 1px solid #4758ee;
    color: #4758ee;
  }
  .menu-item li:hover a {
    color: #4758ee;
  }
  .header-module .pc-right .btn {
    margin-right: 15px;
  }
  .header-left {
    display: flex;
    align-items: center;
  }
  .header-module .module-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-module .btn {
    padding: 8px 15px;
  }
  .header-module .module-inner .pc-right {
    display: flex;
    height: 35px;
  }
  .header-module .module-inner .wap-right {
    display: none;
  }
  .header-module .p-active {
    border-bottom: 1px solid #4758ee;
    color: #4758ee;
  }
  .header-module .p-active a {
    color: #4758ee;
  }
/** 产品 */

@media screen and (min-width: 900px) {
  .prd-list {
    position: fixed;
    width: 100%;
    z-index: 111;
    transition: height .1s linear;
    max-width: 1200px;
    left: 0;
    margin: 0 auto;
    right: 0;
    padding: 0 5%;
    height: 0;
    overflow: hidden;
    top: 62px;

  }
  .prd-list.pc-open-prd {
    height: 230px;
  }
  .prd-list-inner {
    background: #fff;
    width: 500px;
    display: flex;
    justify-content: space-between;
    box-shadow: 1px 3px 6px #efefef;
    padding: 30px;
  }
  .prd-list ul {
    display: block;
  }
  .prd-list ul li a {
    color: #333;
    display: block;
  }
  .prd-list ul li a:hover {
    color: #4758ee;
  }
  .prd-list h3 {
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 15px;
    margin-bottom: 15px;
  }
  .prd-list ul li {
    line-height: 35px;
  }

  .prd-list .prd-tag {
    flex: 1;
    margin-right: 50px;
  }
  .wap-prd {
    display: none;
  }
}
@media screen and (max-width: 900px) {
  .logo img {
    margin-top: 10px;
  }
  .header-module .menu-item {
    flex-direction: column;
  }
  .header-module .module-inner .pc-right {
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 20px;
  }
  .header-module .module-inner .pc-right a {
    flex: 1;
    text-align: center;
  }
  .header-module .module-inner .wap-right{
    display: block;
  }
  .menu-item li.active {
    border: none;
  }
  .pc-prd {
    display: none;
  }
  .header-module .menu {
    /*display: none;*/
    display: block;
    position: absolute;
    top: 61px;
    background: #fff;
    width: 100%;
    z-index: 11;
    box-shadow: 1px 2px 6px #ececec;

    left: 0;
  }
  .cpn-info span {
    font-size: 12px;
  }
  .footer-right ol a {
    font-size: 12px;
  }
  .menu {
    height: 0;
    overflow: hidden;
    transition: height 0.2s;
  }
  .menu-item li:hover {
    border-color: #f7f7f7;
  }
  .menu.open-menu {
    height: 380px;
  }
  .menu-item li {
    border-bottom: 1px solid #f7f7f7;
  }
  .menu-item li.active {
    background: #4758ee;
    color: #fff;
  }

  .menu-item li.active a {
    color: #fff;
  }
  /*.menu li:last-child {
    border: none;
  }*/
  .swiper-module h2 {
    font-size: 15px;
  }
  .footer-inner {
    display: flex;
    justify-content: flex-end;
    flex-direction: column-reverse;
  }
  .footer-right {
    margin-left:0;
    margin-bottom: 20px;
    font-size: 12px;
  }
  .cpn-info {
    font-size: 12px;
  }
  .bak {
    font-size: 12px;
    margin-top: 12px;
  }
  .cpn-info a {
  }
  .prd-list {
    position: fixed;
    background: #fff;
    width: 100%;
    top: 61px;
    bottom: 0;
    right: -100%;
    z-index: 111;
    transition: right .1s linear;
  }
  .prd-list ul li {
    line-height: 40px;
  }

  .prd-list ul li a {
    display: block;
    font-size: 12px;
    color: #333;
  }
  .prd-list h3 {
    padding: 0 5%;
    line-height: 30px;
  }
  .prd-list h3 {
    font-size: 12px;
    font-weight: 400;
    /*color: #fff;*/
    /*background: #4758ee;*/
    padding: 0 5%;
    color: #333;
    background: rgba(71, 88, 238, 0.2);
    padding: 0 5%;
    line-height: 35px;
  }
  .prd-list ul {
    display: flex;
    padding: 20px 5%;
  }
  .prd-list ul li {
    line-height: 20px;
    padding: 0 10px;
    background: #f1f0f0;
    margin: 0 10px;
    border-radius: 10px;
    line-height: 25px;
    min-width: 68px;
    text-align: center;
    box-sizing: border-box;
  }
  .prd-list.open-prd {
    right: 0;
  }
  .bak span, .bak a {
    margin-right: 8px;
    padding-right: 8px;
    font-size: 10px;
  }
}

</style>
