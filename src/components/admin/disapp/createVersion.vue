<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>分发托管</el-breadcrumb-item>
      <el-breadcrumb-item>应用概览</el-breadcrumb-item>
      <el-breadcrumb-item>应用版本</el-breadcrumb-item>
      <el-breadcrumb-item>{{form.version_id ? '更新版本信息' : '发布新版本'}}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="write-content">

      <div class="setting-area">
        <div class="setting-title">
          应用信息
        </div>

        <div class="setting-container">
          <div class="setting-item">
            <span class="setting-item-title">图标</span>
            <div class="setting-item-content" style="margin-bottom: 20px;">
              <sb-upload v-model="form.icon" :showButton="false" bucket="public"></sb-upload>
              <!--<img class="icon" :src="appInfo.icon" onerror="src='http://public.hiapp.net/src/image/logo-hi.png'">-->
            </div>
          </div>

          <div class="setting-item">
            <span class="setting-item-title">名称</span>
            <div class="setting-item-content">
              <input class="setting-input" v-model="form.name">
            </div>
          </div>

          <div class="setting-item">
            <span class="setting-item-title">版本号</span>
            <div class="setting-item-content">
              <span>{{appInfo.version}}</span>
            </div>
          </div>

          <div class="setting-item">
            <span class="setting-item-title">Bundle Id</span>
            <div class="setting-item-content">
              <span>{{appInfo.bundle_id}}</span>
            </div>
          </div>

          <div class="setting-item">
            <span class="setting-item-title">大小</span>
            <div class="setting-item-content">
              <span>{{appInfo.size}}MB</span>
            </div>
          </div>

        </div>

      </div>

      <div class="setting-area">
        <div class="setting-title">
          即将完成
        </div>

        <div class="setting-container">

          <div class="setting-item edit">
            <span class="setting-item-title">版本说明</span>
            <div class="setting-item-content">
              <textarea class="setting-textarea" v-model="form.updateIntro"></textarea>
            </div>
          </div>

          <div class="button-area">
            <div class="big-button" @click="onCreate">
              <span>{{form.version_id ? '保 存' : '发布新版本'}}</span>
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
        action: '', // update/updateFromSign/edit
        appInfo: {
          icon: '',
          name: '',
          version: '',
          size: '',
          bundle_id: ''
        },
        form: {
          signapp_id: null,
          upload_id: null,
          disapp_id: null,
          version_id: null,
          updateIntro: '',
          icon: '',
          name: ''
        }
      }
    },
    components: {
      sbUpload
    },
    methods: {
      onCreate () {
        if (this.action == 'update') {
          api.post('disapp/version/update', this.form, (res) => {
            if (res.status === 200) {
              const data = res.data
              if (data.code === 0) {
                var info = data.data
                this.$router.push({
                  name: 'disapp/list',
                })
              } else {
                this.$message.error(data.message)
              }
            } else {
              this.$message.error(res)
            }
          })
        }

        if (this.action == 'updateFromSign') {
          api.post('disapp/upadte/fromsign', this.form, (res) => {
            if (res.status === 200) {
              const data = res.data
              if (data.code === 0) {
                var info = data.data
                this.$router.push({
                  name: 'disapp/list',
                })
              } else {
                this.$message.error(data.message)
              }
            } else {
              this.$message.error(res)
            }
          })
        }

        if (this.action == 'edit') {
          api.post('disapp/version/modify', this.form, (res) => {
            if (res.status === 200) {
              const data = res.data
              if (data.code === 0) {
                var info = data.data
                this.$router.push({
                  name: 'disapp/list',
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
      requestAppInfo () {
        if (this.action == 'update') {
          api.post('app/info', {id: this.form.upload_id}, (res) => {
            if (res.status === 200) {
              const data = res.data
              if (data.code === 0) {
                var info = data.data
                this.appInfo = info
                this.form.icon = info.icon
                this.form.name = info.name
              } else {
                this.$message.error(data.message)
              }
            } else {
              this.$message.error(res)
            }
          })
        }

        if (this.action == 'updateFromSign') {
          api.post('signapp/info', {id: this.form.signapp_id}, (res) => {
            if (res.status === 200) {
              const data = res.data
              if (data.code === 0) {
                var info = data.data
                this.appInfo = info
                this.form.updateIntro = info.update_intro
                this.form.icon = info.icon
                this.form.name = info.name
              } else {
                this.$message.error(data.message)
              }
            } else {
              this.$message.error(res)
            }
          })
        }

        if (this.action == 'edit') {
          api.post('disapp/version/info', {id: this.form.version_id}, (res) => {
            if (res.status === 200) {
              const data = res.data
              if (data.code === 0) {
                var info = data.data
                this.appInfo = info
                this.form.updateIntro = info.update_intro
                this.form.icon = info.icon
                this.form.name = info.name
              } else {
                this.$message.error(data.message)
              }
            } else {
              this.$message.error(res)
            }
          })
        }
      }
    },
    created: function () {
      this.action = this.$route.query.action
      this.form = this.$route.query
      this.requestAppInfo()
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';

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
    width: 120px;
    height: 120px;
    border-radius: 22px;
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
</style>
