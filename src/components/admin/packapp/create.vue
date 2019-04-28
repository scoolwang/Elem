<template>
  <div>

    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>封装打包</el-breadcrumb-item>
      <el-breadcrumb-item>应用概览</el-breadcrumb-item>
      <el-breadcrumb-item>创建应用</el-breadcrumb-item>
    </el-breadcrumb> -->

    <div class="write-content">
      <div class="setting-area">
        <div class="setting-title">
          填写应用信息
        </div>

        <div class="setting-container">
          <div class="setting-item edit">
            <span class="setting-item-title">应用平台</span>
            <div class="setting-item-content">
              <el-radio-group v-model="form.platform">
                <el-radio :label="0">iOS</el-radio>
                <el-radio :label="1">Android</el-radio>
              </el-radio-group>
            </div>
          </div>

          <div class="setting-item edit">
            <span class="setting-item-title">应用名称</span>
            <div class="setting-item-content">
              <input class="setting-input" v-model="form.name" placeholder="请输入名称">
            </div>
          </div>

          <div class="setting-item edit">
            <span class="setting-item-title">网页地址</span>
            <div class="setting-item-content">
              <input class="setting-input" v-model="form.home_url" placeholder="请输入完整的网页地址，如：https://51gsc.com">
            </div>
          </div>

          <div class="setting-item edit">
            <span class="setting-item-title">版本号</span>
            <div class="setting-item-content">
              <input class="setting-input" v-model="form.version" placeholder="请输入版本号，如：1.0.0">
            </div>
          </div>

          <div class="setting-item edit">
            <span class="setting-item-title">图标</span>
            <div class="setting-item-content" style="margin-bottom: 20px;">
              <sb-upload v-model="form.icon" :showButton="false" bucket="public"></sb-upload>
              <!--<img class="icon" :src="appInfo.icon" onerror="src='http://public.hiapp.net/src/image/logo-hi.png'">-->
            </div>
          </div>

          <div class="setting-item edit">
            <span class="setting-item-title">启动页</span>
            <div class="setting-item-content" style="margin-bottom: 20px;">
              <sb-upload v-model="form.launch" :showButton="false" bucket="public" type="launch"></sb-upload>
              <!--<img class="icon" :src="appInfo.icon" onerror="src='http://public.hiapp.net/src/image/logo-hi.png'">-->
            </div>
          </div>

          <div class="setting-item edit">
            <span class="setting-item-title">启动页倒计时</span>
            <div class="setting-item-content">
              <el-radio-group v-model="form.launch_seconds">
                <el-radio :label="0">不显示</el-radio>
                <el-radio :label="1">1秒</el-radio>
                <el-radio :label="2">2秒</el-radio>
                <el-radio :label="3">3秒</el-radio>
              </el-radio-group>
            </div>
          </div>

          <div class="button-area">
            <div class="big-button" @click="onCreate">
              <span>开始打包</span>
            </div>
          </div>

          <div style="margin: 60px 0 30px 190px;">
            <div>
              <p class="setting-tip" style="margin-bottom: 10px;">温馨提示：</p>
              <p class="setting-tip">所有模块功能均可免费调用，可下载 Demo App 进行测试</p>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
/* eslint-disable */
  import api from '../../../util/api.js'
  import sbUpload from '../../common/sbUpload.vue'

  export default {
    data () {
      return {
        form: {
          name: '',
          version: '',
          home_url: '',
          icon: '',
          launch: '',
          launch_seconds: 3,
          platform: 0
        }
      }
    },
    components: {
      sbUpload
    },
    methods: {
      onCreate () {
        api.post('packapp/create', this.form, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$message.success('开始封装应用')
              this.$router.push({
                name: 'packapp/list'
              })
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
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';
  .check-box {
    font-size: 15px;
    color: rgb(104, 114, 140);
  }
  .check-box-on {
    color: #4488FF;
  }
  .template-wrap {
    display: flex;
  }
  .template {
    margin-right: 40px;
    cursor: pointer;
  }
  .template-img {
    width: 200px;
    box-shadow: 0 2px 4px 0 rgba(153,172,204,.17), 0 2px 10px 0 rgba(140,140,140,.1);
    -webkit-box-shadow: 0 2px 4px 0 rgba(153,172,204,.17), 0 2px 10px 0 rgba(140,140,140,.1);
  }
  .setting-area {
    margin-top: 40px;
    border-top: 1px dashed #EBEFF5;
    position: relative;
  }
  .setting-title {
    z-index: 7;
    display: inline-block;
    background: white;
    padding-right: 20px;
    position: absolute;
    top: -12px;
    font-size: 16px;
  }
  .setting-container {
    padding-left: 136px;
    padding-top: 32px;
  }
  .setting-item {
    display: flex;
  }
  .input-prefix-txt {
    font-size: 16px !important;
    color: rgb(104, 114, 140);
  }
  .setting-item.big-height {
    height: 130px;
    padding-bottom: 10px;
  }
  .setting-item.edit {
    padding: 6px 0;
  }
  .setting-item-title {
    width: 190px;
    color: rgba(41,47,58, 0.5);
    line-height: 36px;
    font-size: 14px;
  }
  .setting-input {
    border: 1px solid #ECEEF1;
    background-color: rgba(68, 136, 255, 0.02);
    border-radius: 3px;
    color: rgb(104, 114, 140);
    flex: 1;
    padding: 0 10px;
    font-size: 14px;
    outline: none;
    height: 36px;
  }
  .setting-input:focus {
    border: 1px solid rgba(68, 136, 255, 0.6);
    box-shadow: 0 0 3px 0 rgba(68, 136, 255, 0.49);
    outline: none;
  }
  .setting-textarea {
    border: 1px solid #ECEEF1;
    background-color: rgba(68, 136, 255, 0.02);
    border-radius: 3px;
    color: rgb(104, 114, 140);
    width: 340px;
    padding: 10px;
    font-size: 14px;
    outline: none;
    height: 100px;
  }
  .setting-textarea:focus {
    border: 1px solid rgba(68, 136, 255, 0.6);
    box-shadow: 0 0 3px 0 rgba(68, 136, 255, 0.49);
    outline: none;
  }
  .setting-item-content {
    width: 340px;
    display: flex;
    align-items: center
  }
  .setting-item-content span {
    color: rgb(104, 114, 140);
    font-size: 14px;
    line-height: 36px;
  }
  .setting-btn {
    margin-top: 20px;
    width: 88px;
    height: 38px;
    border-radius: 3px;
    line-height: 34px;
    box-shadow: 0 1px 0 0 #EEEFF0, -1px 0 0 0 #EEEFF0, 1px 0 0 0 #EEEFF0, 0 1px 3px 0 rgba(190, 200, 214, 0.22), 0 2px 3px 0 rgba(190, 200, 214, 0.13), 0 -1px 0 0 #F8F9FA;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    color: #4488FF;
  }
  .setting-btn:hover {
    transition: all .3s ease;
    box-shadow: 0 1px 3px 0 rgba(191, 200, 214, 0.22), 0 2px 3px 0 rgba(191, 200, 214, 0.13), 0 2px 20px 0 #EBEFF5;
  }
  .setting-btn i {
    font-size: 14px;
    margin-right: 2px;
  }
  .setting-btn span {
    font-size: 14px;
  }
  .icon {
    width: 72px;
    height: 72px;
    border-radius: 12px;
  }

  .button-area {
    padding-left: 200px;
    padding-bottom: 20px;
    margin-top: 40px;
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
  .setting-tip {
    margin: 0;
    color: rgba(41,47,58, 0.5);
    font-size: 14px;
  }
</style>
