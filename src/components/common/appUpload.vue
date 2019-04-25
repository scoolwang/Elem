<template>
  <transition name="bounce">
    <div class="window-container" v-if="show">

      <div class="upload">

        <div class="header"></div>

        <div class="upload-content">
          <div class="upload-container">

            <div class="upload-container-wrap upload-container-ready-wrap" :style="{'background-color': draging ? 'Ivory' : 'white'}" v-if="uploadState=='ready'" @dragover="onDrag" @dragleave="onDragLeave" @drop="onDrop">
              <input type="file" class="upload-file" :value="inputValue" @change="onFileChange">
              <div class="img-wrap">
                <img class="cloud_img" src="../../images/upload_cloud.png">
              </div>
              <div class="ready-text-wrap">
                <p>将应用拖拽到此，或<span class="highlight-txt">点击上传</span></p>
                <p>（{{accept ? '仅支持.' + accept + '文件' : '支持.ipa或.apk文件'}}）</p>
              </div>
            </div>

            <div class="upload-container-wrap" v-if="uploadState=='progress'">
              <p style="font-size: 16px; font-weight: 400; padding-bottom: 3px;">正在上传 <b>{{appName}}</b></p>
              <p style="font-size: 16px; font-weight: 400; padding-bottom: 30px;">（请不要关闭本页面）</p>
              <div class="progress-bg">
                <div class="progress-inside" :style="{width: progress + '%'}">
                  <span class="progress-txt">{{progress > 5 ? progress + '%' : ''}}</span>
                </div>
              </div>
              <p style="font-weight: 700;">{{(progress * totalSize * 0.01).toFixed(1) + ' MB / ' + totalSize + ' MB'}}</p>

            </div>

            <div class="upload-container-wrap" v-if="uploadState=='parse'">
              <div class="loding-wrap">
                <img class="loading-img" src="../../images/loading.gif">
                <p class="parse-txt">正在分析，请稍等片刻...</p>
              </div>
            </div>

            <div class="upload-container-wrap" v-if="uploadState=='error'">
              <p class="err-msg">{{errorMsg}}</p>
              <p>如有疑问，请联系<span class="link" @click="onGoFeedback"> 客服处理</span></p>
              <!--<div class="cancel-btn-wrap">-->
                <!--<el-button size="medium" plain round @click='onRetry'>重新上传</el-button>-->
              <!--</div>-->
            </div>
          </div>

          <div class="cancel-btn-wrap">
            <el-button size="medium" plain round @click='onClose'>取消上传</el-button>
          </div>
        </div>

      </div>
    </div>
  </transition>

</template>

<script>
  /* eslint-disable */
  import api from '../../util/api.js'
  import ossUpload from '../../util/ossUpload.js'
  import socketio from 'socket.io-client'

  export default {
    data () {
      return {
        uploadState: 'ready',
        draging: false,
        progress: 0,
        totalSize: '',
        cancel: null,
        errorMsg: '',
        appName: '',
        inputValue: '',
        socket: null
      }
    },
    props: ['show', 'accept'],
    watch: {
      show: function (newValue, olaValue) {
        if (newValue == true) {
          this.uploadState = 'ready'
          this.draging = false
          this.progress = 0
          this.totalSize = ''
          this.cancel = null
          this.errorMsg = ''
          this.appName = ''
          this.inputValue = ''
        } else {
          this.closeSocket()
        }
      }
    },
    methods: {
      onGoFeedback () {
        this.$router.push({
          name: 'feedback/create'
        })
      },
      onRequestTaskParam (oss_name) {
        api.post('disapp/task/getparam', {
          objectName: oss_name
        }, (res) => {
          if (res.status === 200) {
            // console.log(res)
            if (res.data.code == '0') {
              this.connectSocket(res.data.data)
            } else {
              this.uploadState = 'error'
              this.errorMsg = res.data.message
            }
          } else {
            this.uploadState = 'error'
            this.errorMsg = '服务器异常'
          }
        })
      },
      closeSocket () {
        if (this.socket) {
          this.socket.disconnect()
        }
      },
      connectSocket (args) {
        // console.log(args)
        this.closeSocket()

        var server_url = 'wss://parse.51gsc.com/'
        if (process.env.NODE_ENV === 'development') {
          server_url = 'ws://localhost:8001'
        }

        this.socket = socketio.connect(server_url, {
          transports: ['websocket'],
          query: 'token=' + localStorage.token
        });

        this.socket.on('reconnect_attempt', () => {
          console.log('reconnect_attempt')
          this.closeSocket()
        });

        this.socket.on('connect', () => {
          // console.log('connect')
          this.socket.emit('message', {
            type: 'send',
            param: args
          })
        });

        this.socket.on('message', data => {
          // console.log('message', data)
          if (data.success) {
            this.$message.success('上传成功')
            this.$emit('uploaded', data.id)
          } else {
            this.uploadState = 'error'
            this.errorMsg = data.msg
          }
          this.closeSocket()
        });

        this.socket.on('disconnect', () => {
          // console.log('disconnect')
          this.uploadState = 'error'
          this.errorMsg = '分析失败'
          this.closeSocket()
        });

      },
      onRetry () {
        this.closeSocket()
        this.uploadState = 'ready'
      },
      onClose () {
        this.closeSocket()
        if (this.cancel) {
          // console.log('cancel upload')
          this.cancel()
        }

        this.$emit('update:show', false)
        this.onRetry()
      },
      uploadFile: function (data) {
        // console.log(data)

        if (data && data.name && data.name.length > 4) {

          if (this.accept) {
            if ((data.name.substr(data.name.length - 4, 4) != '.' + this.accept)) {
              this.$message.error('仅支持.' + this.accept + '文件')
              return
            }
          } else {
            if (data.name.substr(data.name.length - 4, 4) != '.ipa' && data.name.substr(data.name.length - 4, 4) != '.apk') {
              this.$message.error('仅支持.ipa和.apk文件')
              return
            }
          }

          this.appName = data.name

          ossUpload('hiapp-package', 'ipa', data, {
            progressCallback: progress => {
              // console.log("progress: %j", progress)
              this.progress = progress
            },
            sizeCallback: size => {
              this.totalSize = size
              this.uploadState = 'progress'
            },
            cancelCallback: cancel => {
              this.cancel = cancel
            },
            doneCallback: res => {
              // console.log("done: %j", res)
              if (res.isSuccess) {
                this.uploadState = 'parse'
                this.onRequestTaskParam(res.res.objectName)
              } else {
                this.uploadState = 'error'
              }
            }
          })

        }
      },
      onDragLeave: function (e) {
        this.draging = false
      },
      onDrag: function (e) {
        this.draging = true
        e.stopPropagation()
        e.preventDefault()
      },
      onDrop: function (e) {
        this.draging = false
        e.stopPropagation()
        e.preventDefault()
        var dt = e.dataTransfer
        for (var i = 0; i !== dt.files.length; i++) {
          this.uploadFile(dt.files[i])
        }
      },
      onFileChange (e) {
        // console.log(e.target.files[0])
        // console.log(typeof(e.target.files[0]))

        this.uploadFile(e.target.files[0])
        // console.log(this.inputValue)
        this.inputValue = ''
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
  .highlight-txt {
    color: #4488FF;
  }
  .upload {
    background-color: white;
    border-radius: 2px;
    box-shadow: 1px 6px 36px -6px #000;
  }
  .header {
    width: 100%;
    /*height: 50px;*/
    /*background-color: #FBFCFE;*/
    /*-webkit-box-shadow: 0 1px 0 0 rgba(235, 239, 245, 0.49);*/
    /*box-shadow: 0 1px 0 0 rgba(235, 239, 245, 0.49);*/
    /*border-radius: 10px 10px 0 0;*/
    height: 30px;
  }
  .upload-content {
    padding: 20px;
  }
  .upload-container {
    width: 480px;
    height: 240px;
  }
  .upload-container-wrap {
    /*background-color: white;*/
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .upload-container-ready-wrap {
    border: 1px dashed #ccc;
  }
  .upload-file {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0;
    display: block;
    cursor: pointer;
  }
  .img-wrap {
    display: flex;
    justify-content: center;
  }
  .cloud_img {
    width: 100px;
    height: 67px;
  }
  .ready-text-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  .err-msg {
    padding: 40px 0 30px 0;
    color: red;
    opacity: 0.7;
    font-size: 24px;
  }
  p {
    margin: 0;
    line-height: 20px;
    text-align: center;
    color: rgb(104, 114, 140);
    font-size: 15px;
  }
  .progress-bg {
    width: 90%;
    margin: 20px 0;
    /*background-color: ALICEBLUE;*/
    background-color: rgb(230,230,230);
    /*height: 20px;*/
    border-radius: 4px;
    height: 40px;
  }
  .progress-inside {
    display: flex;
    margin-top: 2px;
    background-color: #4488FF;
    height: 36px;
    border-radius: 4px;
    background-position: 0px 0px, 0px 0px, 0px 0px;
    background-size: contain, auto, auto;
    background-repeat: repeat-x, repeat, repeat;
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, .25);
    background-image: url(http://public.hiapp.net/src/image/progress-bar-pattern.png), -webkit-linear-gradient(90deg, #4488ff, rgba(221, 255, 0, 0)), -webkit-linear-gradient(0deg, #347EFF, #4488ff);
    background-image: url(http://public.hiapp.net/src/image/progress-bar-pattern.png), linear-gradient(0deg, #4488ff, rgba(221, 255, 0, 0)), linear-gradient(90deg, #347EFF, #4488ff);
  }
  .progress-txt {
    color: white;
    font-size: 15px;
    line-height: 36px;
    flex: 1;
    text-align: right;
    padding-right: 8px;
  }
  .cancel-btn-wrap {
    display: flex;
    justify-content: center;
    margin: 20px 0 5px 0;
  }
  .loding-wrap {
    display: flex;
    align-items: center;
  }
  .loading-img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    margin-top: 8px;
  }
  .link {
    color: #347EFF;
    cursor: pointer;
  }
  .parse-txt {
    padding: 40px 0 30px 0;
    color: rgb(104, 114, 140);
    font-size: 16px;
    font-weight: 700;
  }
</style>
