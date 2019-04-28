<template>
  <div>

    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>封装打包</el-breadcrumb-item>
      <el-breadcrumb-item>应用概览</el-breadcrumb-item>
    </el-breadcrumb> -->

    <!--<div class="tip-container">-->
      <!--<div class="tip-icon-wrap">-->
        <!--<span class="fas fa-bell"></span>-->
      <!--</div>-->
      <!--<p>-->
        <!--最新共享证书：<span style="font-weight: 700;">{{cerInfo.sign.tag}}</span>&nbsp;<span v-if="cerInfo.sign.create_at">（更新于{{cerInfo.sign.create_at}}）</span>-->
        <!--|&emsp;最新独立证书：<span style="font-weight: 700;">{{cerInfo.pro_sign.tag}}</span>&nbsp;<span v-if="cerInfo.pro_sign.create_at">（更新于{{cerInfo.pro_sign.create_at}}）</span>-->
      <!--</p>-->
    <!--</div>-->

    <div class="tip-container">
      <div class="tip-icon-wrap">
        <span class="fas fa-bell"></span>
      </div>
      <p>
        <!--<span>封装好的 iOS 应用无法直接安装，进行 <span class="link">企业签名</span> 后才可安装</span>-->
        <span>即将上线，敬请期待</span>
      </p>
    </div>

    <!--<div class="button-area">-->
      <!--<el-checkbox class="checkbox" v-model="autoRefresh" label="自动刷新状态" size="medium" v-if="false"></el-checkbox>-->

      <!--<div class="btn-wrap">-->
        <!--<button class="big-button" @click='addApp'>创建新应用</button>-->
      <!--</div>-->
    <!--</div>-->

    <div class="center-tip" v-if="list.length == 0">
      <div>
        <p style="line-height: 20px; font-size: 20px; font-weight: 700; text-align: center;">还没有封装应用，赶快新增一个吧~</p>
      </div>
    </div>

    <div class="app-container" v-for="(item, index) in list">
      <div class="title-area">
        <div class="title-wrap">
          <div class="title-left-wrap">
            <span class="app-name">{{item.name}}</span>
            <span class="app-version">{{item.version}}</span>
            <span class="app-version">{{item.size}} M</span>
            <span class="app-version">{{item.bundle_id}}</span>
          </div>
          <div class="title-right-wrap">
            <div class="download-btn" v-if="item.oss_name" @click="onDownload(index)">
              <i class="fas fa-download"></i>
            </div>
            <div class="delete-btn" @click="onDelete(item.record_id)">
              <i class="far fa-trash-alt"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="content-area">
        <div class="content-info-area">
          <div class="content-info-item-wrap">
            <div class="content-info-item">
              <p class="content-info-item-value">基础版</p>
              <p class="content-info-item-title">封装类型</p>
            </div>
          </div>
          <div class="content-info-item-wrap">
            <div class="content-info-item">
              <p class="content-info-item-value">1.0</p>
              <p class="content-info-item-title">API 版本</p>
            </div>
          </div>
        </div>

        <div class="content-app-area">
          <div class="app-img-wrap">
            <div style="position: relative;">
              <img class="app-img" :src="item.icon" onerror="src='http://public.hiapp.net/src/image/logo-hi.png'">
              <span class="app-img-platform-tag" v-if="item.platform == 'ios'">iOS</span>
              <span class="app-img-platform-tag" v-if="item.platform == 'android'">Android</span>
            </div>
          </div>
        </div>

        <div class="right-area">
          <div class="content-state-container" v-if="item.state == 4">
            <div class="state-btn">
              <img class="state-btn-img" src="../../../images/loading.svg" />
              <span class="state-btn-text">即将完成</span>
            </div>
          </div>

          <div class="content-state-container" v-if="item.state == 3">
            <div class="state-btn">
              <img class="state-btn-img" src="../../../images/loading.svg" />
              <span class="state-btn-text">正在打包</span>
            </div>
          </div>

          <div class="content-state-container" v-if="item.state == 2">
            <div class="state-btn">
              <img class="state-btn-img" src="../../../images/loading.svg" />
              <span class="state-btn-text">队列中</span>
            </div>
          </div>

          <div class="content-fail-container" v-if="item.state == 0">
            <span class="state-fail-text">打包失败，请联系在线客服处理</span>
          </div>

          <div class="content-action-container" v-if="item.state == 1">
            <div class="action-btn" v-if="item.platform == 'ios' && item.is_expire=='0'" @click="onDispatch(index)">一键签名</div>
            <div class="action-btn" v-if="item.platform == 'android' && item.is_expire=='0'" @click="onDispatch(index)">一键分发</div>
          </div>
        </div>
      </div>
      <div class="bottom-area">
        <div>
          <span class="bottom-txt">创建时间：{{item.create_at}}</span>
          <span class="bottom-txt">网页地址：{{item.url}}</span>
        </div>
        <div v-if="item.oss_name">
          <span class="bottom-txt" :style="{color: item.is_expire == '1' ? '#f54545' : 'rgba(104,114,140,.5)'}">到期时间：{{item.expire_at}}</span>
          <span class="open-url-btn" @click="onExtendTime(item)">延长有效期</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  /* eslint-disable */
  import api from '../../../util/api.js'
  import appUpload from '../../common/appUpload.vue'
  import appUploadBtn from '../../common/appUploadBtn.vue'
  import resourceSelect from '../../common/resourceSelect.vue'
  import disappSelect from '../../common/disappSelect.vue'

  export default {
    data () {
      return {
        showUpload: false,
        showResourceList: false,
        showDisappSelect: false,
        list: [],
        autoRefresh: false,
        timer: null,
        updateAppId: null,
        extendTimeId: null,
        dispatchSignappRecordId: null,
        resouceSelectType: 'sign',
        resouceSelectCertype: 1,
        cerInfo: {
          sign: {},
          pro_sign: {}
        }
      }
    },
    components: {
      appUpload,
      appUploadBtn,
      resourceSelect,
      disappSelect
    },
    methods: {
      onCreateDisapp (id) {
        this.$router.push({
          name: 'disapp/create',
          query: {
            action: 'createFromSign',
            signapp_id: this.dispatchSignappRecordId,
            disapp_id: id
          }
        })
      },
      onDisappSelected (item) {
        this.$router.push({
          name: 'disapp/createVersion',
          query: {
            action: 'updateFromSign',
            signapp_id: this.dispatchSignappRecordId,
            disapp_id: item.record_id
          }
        })
      },
      onExtendTime (item) {

      },
      onDownload (index) {
        // var item = this.list[index]
        //
        // if (item._inGettingDownloadUrl) {
        //   return
        // }
        //
        // this.updateCellState(index, '_inGettingDownloadUrl', true)
        //
        // api.post('signapp/downloadurl', {
        //   id: item.record_id
        // }, (res) => {
        //   this.updateCellState(index, '_inGettingDownloadUrl', false)
        //   if (res.status === 200) {
        //     const data = res.data
        //     if (data.code === 0) {
        //       location.href = data.data.url
        //     } else {
        //       this.$message.error(data.message)
        //     }
        //   } else {
        //     this.$message.error(res)
        //   }
        // })
      },
      onDelete (id) {
        this.$confirm('是否确定删除此签名应用？请慎重考虑，一旦删除将无法恢复！', '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          // api.post('signapp/delete', {
          //   id: id
          // }, (res) => {
          //   if (res.status === 200) {
          //     const data = res.data
          //     if (data.code === 0) {
          //       this.$message.success(data.message)
          //       this.requestList()
          //     } else {
          //       this.$message.error(data.message)
          //     }
          //   } else {
          //     this.$message.error(res)
          //   }
          // })
        }).catch(() => {
        })
      },
      updateCellState (index, key, value) {
        var list = this.list
        list[index][key] = value
        this.list = []
        this.list = list
      },
      onDispatch (index) {
        // var item = this.list[index]
        //
        // if (item.is_expire == '1') {
        //   return
        // }
        //
        // this.dispatchSignappRecordId = item.record_id
        // this.showDisappSelect = true
        //
        // return
        //
        // if (item._inDispatching) {
        //   return
        // }
        // this.updateCellState(index, '_inDispatching', true)
        //
        // api.post('signapp/dispatch', {
        //   signapp_record_id: item.record_id
        // }, (res) => {
        //   this.updateCellState(index, '_inDispatching', false)
        //   if (res.status === 200) {
        //     const data = res.data
        //     if (data.code === 0) {
        //       if (data.data.disapp_id) {
        //         this.$router.push({
        //           name: 'disapp/createVersion',
        //           query: {
        //             upload_id: data.data.upload_id,
        //             disapp_id: data.data.disapp_id
        //           }
        //         })
        //       } else {
        //         this.$router.push({
        //           name: 'disapp/create',
        //           query: {
        //             upload_id: data.data.upload_id,
        //             signapp_id: item.record_id
        //           }
        //         })
        //       }
        //     } else {
        //       this.$message.error(data.message)
        //     }
        //   } else {
        //     this.$message.error(res)
        //   }
        // })
      },
      addApp () {
        this.$router.push({
          name: 'packapp/create'
        })
      },
      requestList (isAuto) {
        api.post('packapp/list', {}, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.list = data.data
              if (isAuto) {
                this.clearTimerIfNeeded()
              }
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      clearTimerIfNeeded () {
        var allDone = true
        for (var i = 0; i<this.list.length; i++) {
          var item = this.list[i]
          if (item.state == 2 || item.state == 3 || item.state == 4) {
            allDone = false
            break
          }
        }
        if (allDone) {
          this.autoRefresh = false
        }
      }
    },
    watch: {
      autoRefresh: function (newValue, oldValue) {
        if (newValue) {
          this.timer = setInterval(() => {
            this.requestList(true)
          }, 3000)
        } else {
          clearInterval(this.timer)
        }
      }
    },
    created: function () {
      this.autoRefresh = true
      this.requestList()
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';
  .tip-container {
    border: 1px solid #F8EBCF;
    border-radius: 3px;
    background-color: #FBF8E5;
    padding: 8px 16px;
    margin-bottom: 12px;
    color: #887045;
    font-size: 12px;
    display: flex;
  }
  .tip-icon-wrap {
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #EBD3A9;
    border-radius: 14px;
  }
  .tip-icon-wrap span {
    color: white;
    font-size: 16px;
    opacity: 0.8;
  }
  .tip-container p {
    margin: 0;
    flex: 1;
    padding: 5px 10px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .container-header {
    height: 34px;
    background-color: #FBFCFE;
    box-shadow: 0 1px 0 0 rgba(235, 239, 245, 0.49);
    border-radius: 3px 3px 0 0;
  }
  .container-header p {
    margin: 0;
    color: rgb(104, 114, 140);
    font-size: 12px;
    text-indent: 20px;
    line-height: 34px;
  }
  .button-area {
    /*min-width: 1140px;*/
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .checkbox {
    margin-right: 20px;
  }
  .big-button {
    background-color: #4488FF;
    border: 1px solid #4488FF;
    display: inline-block;
    padding: 12px 14px;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    font-size: 14px;

    text-align: center;
    box-shadow: 0 2px 4px 0 rgba(153, 172, 204, 0.47);
  }
  .big-button:hover {
    background-color: #347EFF;
    box-shadow: 0 2px 4px 0 rgba(153, 172, 204, 0.47), 0 2px 10px 0 rgba(68, 136, 255, 0.27) !important;
  }
  .big-button span {
    font-size: 14px;
  }
  .big-button i {
    font-size: 14px;
    padding-right: 4px;
  }
  .right-area {
    display: flex;
  }
  .app-container {
    /*min-width: 1140px;*/
    margin-top: 10px;
    background-color: white;
    background-clip: content-box;
    border-radius: 0;
    box-shadow: 0 1px 4px 0 rgba(41,47,58, .04);
  }
  .app-container:hover {
  }
  .title-area {
    height: 40px;
    padding: 0 25px;
  }
  .title-wrap {
    padding-top: 20px;
    height: 20px;
    display: flex;
    justify-content: space-between;
  }
  .title-left-wrap {
    display: flex;
  }
  .app-name {
    color: rgb(104, 114, 140);
    font-size: 14px;
    font-weight: 700;
  }
  .app-version {
    padding: 1px 7px;
    background-color: rgba(68, 136, 255, 0.06);
    color: rgba(68, 136, 255, 0.7);
    border-radius: 100px;
    font-size: 12px;
    margin-left: 10px;
  }
  .title-right-wrap {
    display: flex;
  }
  .download-btn {
    margin-left: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50px;
    border: 1px solid rgba(68, 136, 255, 0.7);
    color: rgba(68, 136, 255, 0.7);
    font-size: 12px;
    cursor: pointer;
    text-align: center;
    line-height: 24px;
  }
  .download-btn i {
    color: rgba(68, 136, 255, 0.7);
  }
  .delete-btn {
    margin-left: 8px;
    width: 24px;
    height: 24px;
    border-radius: 50px;
    border: 1px solid #EBEDF0;
    color: #D1D8E2;
    font-size: 12px;
    cursor: pointer;
    text-align: center;
    line-height: 24px;
  }
  .delete-btn i {
    color: rgb(104, 114, 140);
    opacity: 0.4;
    font-size: 13px;
  }
  .content-area {
    height: 93px;
    display: flex;
    justify-content: space-between;
  }
  .content-info-area {
    width: 50%;
    height: 100%;
    display: flex;
  }
  .content-info-item-wrap {
    width: 33%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content-info-item {

  }
  .content-info-item p {
    margin: 0;
    text-align: center;
  }
  .content-info-item-value {
    color: rgb(104, 114, 140);
    font-weight: 700;
    font-size: 14px;
  }
  .content-info-item-title {
    font-size: 13px;
    color: rgb(104, 114, 140);
  }
  .content-app-area {
    height: 100%;
    display: flex;
    padding-right: 40px;
  }
  .app-img-wrap {
    /*margin-left: 40px;*/
    display: flex;
    /*width: 50px;*/
    height: 100%;
    align-items: center;
  }
  .app-img {
    width: 72px;
    height: 72px;
    border-radius: 12px;
    box-shadow: 0 2px 4px 0 rgba(153,172,204,.47), 0 2px 10px 0 rgba(140,140,140,.27);
    -webkit-box-shadow: 0 2px 4px 0 rgba(153,172,204,.47), 0 2px 10px 0 rgba(140,140,140,.27);
  }
  .app-img-platform-tag {
    font-size: 10px;
    font-weight: 700;
    position: absolute;
    top: 10px;
    left: -10px;
    background-color: #3a8ee6;
    padding: 0 6px;
    border-radius: 10px;
    line-height: 20px;
    color: white;
    box-shadow: 0 2px 4px 0 rgba(153,172,204,.1), 0 2px 10px 0 rgba(140,140,140,.1);
    -webkit-box-shadow: 0 2px 4px 0 rgba(153,172,204,.1), 0 2px 10px 0 rgba(140,140,140,.1);
  }
  .platform-wrap span {
    color: rgb(46,133,255);
    opacity: 0.4;
  }
  .app-plat-wrap p {
    margin: 0;
    color: rgb(104, 114, 140);
    font-size: 13px;
  }
  .content-state-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 268px;
    padding-right: 25px;
  }
  .content-fail-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 268px;
    padding-right: 25px;
  }
  .state-fail-text {
    color: rgba(104,114,140,.5);
    font-size: 13px;
    line-height: 24px;
  }
  .state-btn {
    display: flex;
    height: 54px;
    /*background: rgba(68, 136, 255, 0.06);*/
    padding: 0 16px;
    border-radius: 27px;
  }
  .state-btn-img {
    width: 14px;
  }
  .state-btn-text {
    line-height: 54px;
    padding-left: 10px;
    color: rgba(68, 136, 255, 0.7);
    font-size: 14px;
    font-weight: 600;
  }
  .content-action-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 268px;
    padding-right: 25px;
  }
  .action-btn {
    margin-left: 6px;
    border: 1px solid #4488FF;
    border-radius: 100px;
    color: #4488FF;
    padding: 7px 22px;
    background-color: #fff;
    transition: all 0.3s ease;
    font-size: 14px;
    line-height: 20px;
    font-weight: 700;
    cursor: pointer;
  }
  .action-btn-disable {
    color: #D1D8E2;
    border-color: #D1D8E2;
    cursor: not-allowed;
  }
  .action-btn:hover {
    background-color: #4488FF;
    color: white;
  }
  .action-btn-disable:hover {
    background-color: white;
    color: #D1D8E2;
  }
  .bottom-area {
    height: 40px;
    background-color: rgba(125, 156, 232, 0.03);
    padding-left: 25px;
    padding-right: 25px;
    display: flex;
    justify-content: space-between;
  }
  .bottom-txt {
    line-height: 40px;
    color: rgba(104,114,140,.5);
    font-family: sans-serif;
    font-size: 13px;
    margin-right: 6px;
  }
  .open-url-btn {
    border-radius: 3px;
    border: 1px solid #4488FF;
    color: #4488FF;
    font-size: 10px;
    padding: 0 3px;
    margin-right: 6px;
    cursor: pointer;
  }
  .bundle-id {
    width: 150px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
