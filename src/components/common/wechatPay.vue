<template>
  <transition name="bounce">
    <div class="window-container" v-if="show">

      <div class="upload">

        <div class="header">
          <div class="window-title">
            微信扫码支付
          </div>
          <div class="header-btn-wrap">
            <div class="header-icon-wrap" @click='onClose'>
              <i class="fas fa-times"></i>
            </div>
          </div>
        </div>

        <div class="upload-content">
          <div class="upload-container" style="display: flex; justify-content: center;padding: 40px 0;">
            <div class="resource-empty-wrap">
              <div style="width: 200px; height: 200px; background-color: white;" ref="qrcode" id="qrcode"></div>
            </div>
          </div>
        </div>

        <div class="upload-bottom">
          <div class="bottom-button bottom-button-right" @click="onGoOrder">
            我已支付
          </div>
        </div>

      </div>
    </div>
  </transition>

</template>

<script>
  /* eslint-disable */
  var QRCode = require('qrcode')

  export default {
    data () {
      return {
      }
    },
    props: ['show', 'qrcode'],
    watch: {
      show: function (newValue, olaValue) {
        if (newValue == true) {
          setTimeout(() => {
            QRCode.toCanvas(this.qrcode, {
              margin: 0,
              width: 200,
              height: 200
            }, function (err, canvas) {
              var container = document.getElementById('qrcode')
              container.appendChild(canvas)
            })
          }, 200)
        }
      }
    },
    methods: {
      onClose () {
        this.$emit('update:show', false)
      },
      onGoOrder () {
        this.$router.push({
          name: 'order/list'
        })
      }
    },
    created: function () {
    }
  }
</script>

<style scoped>
  .bounce-enter-active {
    animation: bounce-in .3s;
  }
  .bounce-leave-active {
    animation: bounce-in .0s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  .window-container {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .upload {
    background-color: #F2F5FA;
    box-shadow: 1px 6px 36px -6px #000;
    min-height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .upload-bottom {
    height: 50px;
    background-color: white;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    -webkit-box-shadow: 0 -1px 0 0 rgba(235, 239, 245, 0.49);
    box-shadow: 0 -1px 0 0 rgba(235, 239, 245, 0.49);
    display: flex;
  }
  .bottom-button {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    background: #347EFF;
    color: white;
    cursor: pointer;
  }
  .bottom-button-left {
    width: 50%;
    border-right: 1px solid rgba(255,255,255, 0.7);
  }
  .bottom-button-right {
    flex: 1;
  }
  .header {
    height: 50px;
    background-color: white;
    line-height: 50px;
    position: relative;
    color: rgb(104, 114, 140);
    font-size: 15px;
  }
  .header-icon-wrap {
    padding: 0 14px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-icon-wrap i {
    font-size: 18px;
  }
  .window-title {
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
  }
  .header-btn-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 0 10px;
    display: flex;
    justify-content: flex-end;
  }
  .upload-content {
    padding: 0 10px;
  }
  .upload-container {
    width: 400px;
    max-height: 400px;
    overflow: scroll;
  }
  /*p {*/
  /*margin: 0;*/
  /*line-height: 20px;*/
  /*text-align: center;*/
  /*color: rgb(104, 114, 140);*/
  /*font-size: 15px;*/
  /*}*/
  .cancel-btn-wrap {
    display: flex;
    justify-content: center;
    margin: 20px 0 5px 0;
  }
  .resource-cell {
    height: 60px;
    margin: 8px 0;
    background-color: white;
    -webkit-box-shadow: 0 1px 0 0 #EEEFF0, -1px 0 0 0 #EEEFF0, 1px 0 0 0 #EEEFF0, 0 1px 3px 0 rgba(190, 200, 214, 0.22), 0 2px 3px 0 rgba(190, 200, 214, 0.13), 0 -1px 0 0 #F8F9FA;
    box-shadow: 0 1px 0 0 #EEEFF0, -1px 0 0 0 #EEEFF0, 1px 0 0 0 #EEEFF0, 0 1px 3px 0 rgba(190, 200, 214, 0.22), 0 2px 3px 0 rgba(190, 200, 214, 0.13), 0 -1px 0 0 #F8F9FA;
    cursor: pointer;
    display: flex;
  }
  .resource-cell-icon-wrap {
    line-height: 60px;
    padding: 0 20px;
  }
  .resource-cell-icon {
    font-size: 15px;
    color: rgb(104, 114, 140);
  }
  .resource-cell-icon-on {
    color: #4488FF;
  }
  .resource-cell-content {
    flex: 1;
    line-height: 60px;
    padding: 0 20px 0 0px;
    display: flex;
    align-items: center;
  }
  .resource-cell-content span {
    font-size: 15px;
    color: rgb(104, 114, 140);
  }
  .cell-icon {
    width: 34px;
    height: 34px;
    margin-right: 10px;
    border-radius: 8px;
  }
  .resource-empty-wrap {
    text-align: center;
    line-height: 200px;
    color: rgb(104, 114, 140);
    font-size: 15px;
  }
  .link {
    color: #4488FF;
    cursor: pointer;
  }

</style>
