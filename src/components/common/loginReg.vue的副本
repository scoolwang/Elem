<template>
  <div class="login-reg">
    <div class="module header">
      <h1 class="logo">
        <a  href="https://51gsc.com/index.html"><img class="logo-img" src="../../images/logo.png"></a>

      </h1>
      <div class="header-right" id="menu">
        <ul class="header-menu">
          <li><a href="https://51gsc.com/index.html" title="">首页</a></li>
          <li><a href="https://51gsc.com/dispatch.html" title="">分发</a></li>
          <li><a href="https://51gsc.com/sign.html" title="">签名</a></li>
          <li><a href="https://51gsc.com/pack.html" title="">封装</a></li>
          <li><a href="https://51gsc.com/price.html" title="">价格</a></li>
        </ul>
        <!-- <div class="btn-box">
          <div class="btn" onclick="location.href='https://my.51gsc.com'">开始使用</div>
        </div> -->
      </div>
      <!-- <div class="phone-right">
        <div class="btn-box">
          <div class="btn" onclick="location.href='https://my.51gsc.com'">开始使用</div>
        </div>
        <div class="more" id="more">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div> -->
    </div>
    <canvas id="cas"></canvas>
    <div class="login-reg-module" :class="{'reg-module': curOpen=='reg','login-module': curOpen=='login'}">
      <div class="login-box page-panel">
        <div class="panel-logo">
          <img src="https://my.51gsc.com/static/img/logo.dedd711.png" alt="">
          <div class="prd-info">
            <div>
              内测应用发布
            </div>
            <div>
              企业证书签名
            </div>
            <div>
              封装网页应用
            </div>
          </div>
          <div class="reg-tip" @click="change('reg')">
            <span>没有账号?</span>
            <div class="reg-btn">
              快速注册>
            </div>
          </div>
        </div>
        <div class="page-inner">
          <login></login>
        </div>

      </div>
      <div class="reg-box page-panel">

        <div class="page-inner">
          <reg></reg>
        </div>
        <div class="panel-logo">
          <img src="https://my.51gsc.com/static/img/logo.dedd711.png" alt="">
          <div class="prd-info">
            <div>
              内测应用发布
            </div>
            <div>
              企业证书签名
            </div>
            <div>
              封装网页应用
            </div>
          </div>
          <div class="reg-tip"  @click="change('login')">
            <span>已有账号?</span>
            <div class="reg-btn">
              前往登录>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  /* eslint-disable */
  import login from './login.vue'
  import reg from './reg.vue'
  export default {
    data () {
      return {
        curOpen: 'login'
      }
    },
    components: {
      login,
      reg
    },
    methods: {
      change (tag) {
        this.curOpen = tag
      },
      initCavas () {
        var canvas = document.getElementById('cas');
        var ctx = canvas.getContext('2d');
        var rgb = '255';      // 线条颜色值
        var extendDis = 5;   // 可超出的画布边界
        var lineDis = 100;    // 连线距离
        lineDis *= lineDis;
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        var RAF = (function() {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                window.setTimeout(callback, 1000 / 60);
              };
        })()
        // 鼠标活动时，获取鼠标坐标
        var warea = {x: null, y: null};
        window.onmousemove = function(e) {
          e = e || window.event;
          warea.x = e.clientX - canvas.offsetLeft;
          warea.y = e.clientY - canvas.offsetTop;
        };
        window.onmouseout = function(e) {
          warea.x = null;
          warea.y = null;
        };
        // 添加粒子
        // x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
        var dots = [];
        for (var i = 0; i < 150; i++) {
          var x = Math.random() * (canvas.width + 2 * extendDis) - extendDis;
          var y = Math.random() * (canvas.height + 2 * extendDis) - extendDis;
          var xa = (Math.random() * 2 - 1) / 1.5;
          var ya = (Math.random() * 2 - 1) / 1.5;
          dots.push({
            x: x,
            y: y,
            xa: xa,
            ya: ya
          })
        }
        // 延迟100秒开始执行动画，如果立即执行有时位置计算会出错
        setTimeout(function() {
          animate();
        }, 100);
        // 每一帧循环的逻辑
        function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          bubDrawLine([warea].concat(dots));
          RAF(animate);
        }
        /**
         * 逐个对比连线
         * @param ndots
         */
        function bubDrawLine(ndots) {
          var ndot;
          dots.forEach(function(dot) {
            move(dot);
            // 循环比对粒子间的距离
            for (var i = 0; i < ndots.length; i++) {
              ndot = ndots[i];
              if (dot === ndot || ndot.x === null || ndot.y === null) continue;
              var xc = dot.x - ndot.x;
              var yc = dot.y - ndot.y;
              // 如果x轴距离或y轴距离大于max,则不计算粒子距离
              if (xc > ndot.max || yc > lineDis) continue;
              // 两个粒子之间的距离
              var dis = xc * xc + yc * yc;
              // 如果粒子距离超过max,则不做处理
              if (dis > lineDis) continue;
              // 距离比
              var ratio;
              // 如果是鼠标，则让粒子向鼠标的位置移动
              if (ndot === warea && dis < 20000) {
                dot.x -= xc * 0.01;
                dot.y -= yc * 0.01;
              }
              // 计算距离比
              ratio = (lineDis - dis) / lineDis;
              // 粒子间连线
              ctx.beginPath();
              ctx.lineWidth = ratio / 2;
              ctx.strokeStyle = 'rgba(' + rgb + ', ' + rgb + ', ' + rgb + ', 1';
              ctx.moveTo(dot.x, dot.y);
              ctx.lineTo(ndot.x, ndot.y);
              ctx.stroke();
            }
            // 将已经计算过的粒子从数组中删除
            ndots.splice(ndots.indexOf(dot), 1);
          });
        }
        /**
         * 粒子移动
         * @param dot
         */
        function move(dot) {
          dot.x += dot.xa;
          dot.y += dot.ya;
          // 遇到边界将加速度反向
          dot.xa *= (dot.x > (canvas.width + extendDis) || dot.x < -extendDis) ? -1 : 1;
          dot.ya *= (dot.y > (canvas.height + extendDis) || dot.y < -extendDis) ? -1 : 1;
          // 绘制点
          ctx.fillStyle = 'rgba(' + rgb + ', ' + rgb + ', ' + rgb + ', 1';
          ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);
        }
        }
    },
    mounted () {
      let that = this
      window.onresize = function () {
        that.initCavas()
      }
      that.initCavas()
    }
  }
</script>
<style scoped>
    .header {
      position: fixed;
      padding: 0 10%;
      top: 0;
      left: 0;
      right: 0;
      z-index: 11;
      display: flex;
      text-align: left;
      height: 103px;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.12);
    }
    .header-menu {
      display: flex;
      justify-content: space-between;
      flex: 1;
    }
    ul,li {
      list-style: none;
    }

    .module-inner {
      width: 87%;
      margin: 0 auto;
    }
    /** 头部 */
    .logo {
      font-size: 26px;
      text-align: center;
    }
    .logo img {
      height: 38px;
    }
    .header-right {
    }
    .header-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .header-menu a {
      font-size:17px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#fff;
      text-decoration: none;
    }
    .module {
      padding: 0 8%;
      overflow: hidden;
    }
    .header .btn-box {
      margin-left: 68px;
    }
    .header-menu {
      flex: 5;
    }
    .header-menu li {
      margin-left: 40px;
    }
    .logo {
    }
    .header .btn {
      width:169px;
      height:46px;
      line-height: 46px;
      background:rgba(255,255,255,1);
      border-radius:5px;
      border:2px solid rgba(201,205,213,1);
      text-align: center;
      font-size:17px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(126,128,133,1);
      border-radius: 5px;
      border: 1px solid rgba(201,205,213,1);
    }
</style>
<style scoped>

.login-reg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
}
.reg-box {
  transform: rotateY(-180deg);
}
.page-inner {
  flex: 1;
  background: linear-gradient(230deg,rgba(53,57,74,0) 0%,rgb(0,0,0) 100%);

  /*background: url(../../images/reg-bg.jpg);*/
}
.login-reg-module {
  /*height: 335px;*/
  margin: 0 auto;
  margin-top: 103px;
  width: 650px;
  position: relative;
  overflow: hidden;
  transition: height 700ms ease-in-out 500ms;
}
.reg-module {
  height: 535px;
}
.login-module {
  height: 335px;
}
.reg-module, .logn-module {
  /*transition: height 700ms ease-in-out 600ms;*/
}
.reg-module .login-box {
  transform: rotateY(180deg);
}
.reg-module .reg-box {
  transform: rotateY(0deg);

}
.logn-module .login-box {
  transform: rotateY(0deg);
}
.logn-module .reg-box {
  transform: rotateY(-180deg);

}
.page-panel {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: ease-in-out 600ms;
}
.login-reg {
  /*background: url(../../images/reg-bg.jpg);*/
}
.panel-logo {
  flex: 1;
  background: #fff;
  padding: 30px;
}
.panel-logo img {
  height: 40px;
}
.prd-info {
  margin-top: 30px;
}
.prd-info div {
  font-size: 12px;
  line-height: 30px;
  padding-left: 10px;
  color: #999;
}
.prd-info div:before {
  content: " ";
  display: inline-block;
  width: 5px;
  height: 5px;
  background: #347EFF;
  position: relative;
  top: -2px;
  border-radius: 50%;
  margin-right: 5px;
}
.reg-tip {
  display: flex;
  text-align: center;
  font-size: 12px;
  color: #999;
  margin-top: 30px;
  padding-left: 10px;
  cursor: pointer;
}
.reg-btn {
  /*width: 60px;
  height: 60px;
  background: #347EFF;
  border-radius: 50%;
  color: #fff;*/
  font-size: 12px;
  padding-left: 10px;
  color: #347EFF;
  /*line-height: 60px;*/
  text-align: center;
  /*box-shadow: 1px 2px 3px #ccc;*/
}
</style>
<style>
  input::-webkit-input-placeholder {
    color: #fff;
  }
  .el-card {
    background: none;
    border:none;
    box-shadow: none;
  }

  .el-input__inner {
    border-radius: 20px;
    color: #fff !important;
  }
  .el-form-item__label {
    color: #fff !important;
  }
  .el-input__inner {
    background-color: rgba(255, 255, 255, 0.2) !important;
    border: 1px solid transparent !important;
    border-radius: 20px;
  }
  .el-form-item.is-error .el-input__inner {
    border-color: #fa5555 !important;
  }
  .el-form-item.is-success .el-input__inner {
    border-color: rgba(68, 136, 255, 0.5215686274509804) !important;
  }

  .el-input, .el-form-item__content {
    background: none;
  }
  .el-form-item .el-form-item__label {
    color: #fff !important;
    margin: 10px 5px;
    font-size: 12px !important;
  }
</style>
<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  #cas {
    position: absolute;
    left:0;
    top:0;
    bottom:0;
    right:0;
    left: 0;
    /*background-color: #70B7FD;*/
    z-index: 0;
    background-color:#304da0;

    background-image:
    radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
    radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
    radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),
    radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px);
    background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
    background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
  }
</style>
