<template>
  <div>

    <app-upload :show.sync="showUpload" @uploaded="onUploaded"></app-upload>

    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>分发托管</el-breadcrumb-item>
      <el-breadcrumb-item>应用概览</el-breadcrumb-item>
    </el-breadcrumb> -->

    <!--<div class="button-area">-->
      <!--<div class="big-button" @click='addApp'>-->
        <!--<i class="fas fa-plus"></i>-->
        <!--<span>上传应用</span>-->
      <!--</div>-->
    <!--</div>-->

    <div class="tip-container">
      <div class="tip-icon-wrap">
        <span class="fas fa-bell"></span>
      </div>
      <p>
        iOS 应用需要进行 <span class="link" @click="onGoToSign">企业证书签名</span><span> 后才能分发下载哦</span>
      </p>
    </div>

    <div class="button-area">
      <div class="btn-wrap">
        <appUploadBtn text="上传应用" @click.native='addApp'></appUploadBtn>
      </div>
    </div>

    <div class="center-tip" v-if="list.length == 0">
      <div>
        <p style="line-height: 20px; font-size: 20px; font-weight: 700; text-align: center;">还没有分发中的应用，快来发布吧~</p>
        <p style="line-height: 20px">温馨提示：如您的 iOS 应用还未签名，在【证书签名】功能页对应用进行签名，然后点击【一键分发】</p>
      </div>
    </div>

    <div class="app-container" v-for="item in list">
      <div class="title-area">
        <div class="title-wrap">
          <div class="title-left-wrap">
            <span class="app-name">{{item.name}}</span>
            <span class="app-version">{{item.version}}</span>
            <span class="app-version">{{item.size}} M</span>
            <span class="app-version">{{item.bundle_id}}</span>
          </div>
          <div class="title-right-wrap">
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
              <p class="content-info-item-value">{{item.today_download_count}}</p>
              <p class="content-info-item-title">今日下载量</p>
            </div>
          </div>
          <div class="content-info-item-wrap">
            <div class="content-info-item">
              <p class="content-info-item-value">{{item.yesterday_download_count}}</p>
              <p class="content-info-item-title">昨日下载量</p>
            </div>
          </div>
          <div class="content-info-item-wrap">
            <div class="content-info-item">
              <p class="content-info-item-value">{{item.total_download_count}}</p>
              <p class="content-info-item-title">总下载量</p>
            </div>
          </div>
          <div class="content-info-item-wrap">
            <div class="content-info-item">
              <p class="content-info-item-value">{{item.version_count}}</p>
              <p class="content-info-item-title">版本数量</p>
            </div>
          </div>
        </div>
        <div class="content-app-area">
          <div class="app-img-wrap">
            <div style="position: relative;">
              <img class="app-img" :src="item.icon" onerror="src='http://public.hiapp.net/src/image/logo-hi.png'">
              <span class="app-img-platform-tag">{{item.platform=='ios' ? "iOS" : "Android"}}</span>
            </div>
          </div>
        </div>
        <div class="right-area">
          <div class="content-action-container">
            <div class="content-action-area">
              <div @click="onEdit(item.record_id)">
                <div class="action-btn">编辑</div>
              </div>
            </div>
            <div class="content-action-area">
              <div @click="onUnion(item)">
                <div class="action-btn">关联</div>
              </div>
            </div>
            <div class="content-action-area">
              <div @click="onEnter(item.record_id)">
                <div class="action-btn">版本</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-area">
        <div>
          <span class="bottom-url">下载页：{{item.short_link.replace('https://', '')}}</span>
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
            @show="onShow(item.short_link)">
            <div style="width: 200px; height: 200px; background-color: white;" :id="item.short_link"></div>
            <i class="fas fa-qrcode" slot="reference"></i>
          </el-popover>
          <span class="open-url-btn" @click="onOpenURL(item.short_link)">浏览</span>
        </div>
        <div v-if="item.is_frozen && item.is_frozen=='1'">
          <span class="bottom-txt">应用已被下架</span>
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

  var QRCode = require('qrcode')

  export default {
    data () {
      return {
        showUpload: false,
        list: []
      }
    },
    components: {
      appUpload,
      appUploadBtn
    },
    methods: {
      onGoToSign () {
        this.$router.push({
          name: 'signapp/list'
        })
      },
      convertBundleId (bid) {
        return bid.replace(/\.hiapp\..*/, '')
      },
      onShow(link) {
        console.log(link)
        QRCode.toCanvas(link, {
          margin: 0,
          width: 200,
          height: 200
        }, function (err, canvas) {
          var container = document.getElementById(link)
          if (container.lastChild) {
            container.removeChild(container.lastChild)
          }
          container.appendChild(canvas)
        })
      },
      onOpenURL (url) {
        window.open(url)
      },
      onDelete (id) {
        this.$confirm('是否确定删除此应用？', '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          api.post('disapp/delete', {
            id: id
          }, (res) => {
            if (res.status === 200) {
              const data = res.data
              if (data.code === 0) {
                this.$message.success(data.message)
                this.requestList()
              } else {
                this.$message.error(data.message)
              }
            } else {
              this.$message.error(res)
            }
          })
        }).catch(() => {
        })
      },
      onUnionDelete (item) {

      },
      onUnionCreate (item) {
        this.$router.push({
          name: 'disapp/union',
          query: {
            action: 'create',
            platform: item.platform,
            currentAppInfo: {
              icon: item.icon,
              name: item.name,
              id: item.record_id
            }
          }
        })
      },
      onUnionChange (item) {
        this.$router.push({
          name: 'disapp/union',
          query: {
            action: 'edit',
            id: item.union_record_id
          }
        })
      },
      onUnion (item) {
        if (item.union_record_id) {
          this.onUnionChange(item)
        } else {
          this.onUnionCreate(item)
        }
      },
      onEdit (id) {
        this.$router.push({
          name: 'disapp/create',
          query: {
            action: 'edit',
            disapp_id: id
          }
        })
      },
      onEnter (id) {
        this.$router.push({
          name: 'disapp/versions',
          query: {
            id: id
          }
        })
      },
      onUploaded (id) {
        this.$router.push({
          name: 'disapp/create',
          query: {
            action: 'create',
            upload_id: id
          }
        })
      },
      addApp () {
        this.showUpload = true
      },
      requestList () {
        api.post('disapp/list', {}, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.list = data.data
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      }
    },
    created: function () {
      this.requestList()
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';
  .bottom-txt {
    line-height: 40px;
    color: #f54545;
    font-family: sans-serif;
    font-size: 13px;
    margin-right: 6px;
  }
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
  .link {
    text-decoration: none;
    color: #347EFF;
    cursor: pointer;
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
  }
  .big-button {
    padding: 0 18px;
    height: 44px;
    display: inline-block;
    text-align: center;
    line-height: 44px;
    cursor: pointer;
    color: #fff;
    border-radius: 3px;
    box-shadow: 0 2px 4px 0 rgba(153, 172, 204, 0.47);
    background-color: #4488FF;
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
    /*width: 25px;*/
  }
  .delete-btn {
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
    width: 25%;
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
  }
  .app-img-wrap {
    /*margin-left: 40px;*/
    display: flex;
    /*width: 50px;*/
    /*height: 100%;*/
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
    background-color: #4488ff;
    padding: 0 6px;
    border-radius: 10px;
    line-height: 20px;
    color: white;
  }
  .app-plat-wrap {
    height: 100%;
    margin-left: 20px;
    display: flex;
    align-items: center;
  }
  .platform-wrap {
    display: flex;
    justify-content: center;
    margin-right: 60px;
  }
  .platform-wrap span {
    color: rgba(104,114,140,.5);
    opacity: 0.5;
    font-size: 28px;
  }
  .app-plat-wrap p {
    margin: 0;
    color: rgb(104, 114, 140);
    font-size: 13px;
  }
  .content-action-container {
    display: flex;
    padding-right: 25px;
  }
  .content-action-area {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
  }
  .action-btn {
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
  .action-btn:hover {
    background-color: #4488FF;
    color: white;
  }
  .bottom-area {
    height: 40px;
    background-color: rgba(125, 156, 232, 0.03);
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
  }
  .bottom-url {
    line-height: 40px;
    color: rgb(104, 114, 140);
    font-family: sans-serif;
    font-weight: 300;
    font-size: 14px;
  }
  .open-url-btn {
    border-radius: 3px;
    border: 1px solid #48f;
    color: #48f;
    font-size: 10px;
    padding: 0 3px;
    margin-left: 2px;
    cursor: pointer;
  }
  .bundle-id {
    width: 150px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .fa-qrcode {
    cursor: pointer;
    color: rgba(104,114,140,.5);
    -webkit-transform: translateY(1px);
    -moz-transform: translateY(1px);
    -ms-transform: translateY(1px);
    -o-transform: translateY(1px);
    transform: translateY(1px);
  }
</style>
