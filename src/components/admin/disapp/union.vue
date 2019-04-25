<template>
  <div>

    <disapp-select :show.sync="showDisappSelect" :platform="platform == 'ios' ? 'android' : 'ios'" :title="platform == 'ios' ? '选择应用' : '选择应用'" @selected="onDisappSelected"></disapp-select>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>分发托管</el-breadcrumb-item>
      <el-breadcrumb-item>关联应用</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="write-content">

      <div class="setting-area">
        <div class="setting-title">
          关联应用
        </div>

        <div class="setting-container" v-if="action == 'create'">

          <div class="setting-item edit">
            <span class="setting-item-title">当前应用</span>
            <div class="setting-item-content">
              <div class="app-select-wrap">
                <div class="app-select-icon-wrap" v-if="currentAppInfo.icon">
                  <img class="app-select-icon" :src="currentAppInfo.icon" alt="">
                </div>
                <div class="app-select-title-wrap" v-if="currentAppInfo.name">
                  {{currentAppInfo.name}}
                </div>
              </div>
            </div>
          </div>

          <div class="setting-item edit" v-if="platform == 'android'" @click="onShowSelect">
            <span class="setting-item-title">iOS 应用</span>
            <div class="setting-item-content">
              <div class="app-select-wrap app-select-wrap-enable">
                <div class="app-select-button" v-if="!selectAppInfo.name">
                  点击选择
                </div>
                <div class="app-select-icon-wrap" v-if="selectAppInfo.icon">
                  <img class="app-select-icon" :src="selectAppInfo.icon" alt="">
                </div>
                <div class="app-select-title-wrap" v-if="selectAppInfo.name">
                  {{selectAppInfo.name}}
                </div>
              </div>
            </div>
          </div>

          <div class="setting-item edit" v-if="platform == 'ios'" @click="onShowSelect">
            <span class="setting-item-title">Android 应用</span>
            <div class="setting-item-content">
              <div class="app-select-wrap app-select-wrap-enable">
                <div class="app-select-button" v-if="!selectAppInfo.name">
                  点击选择
                </div>
                <div class="app-select-icon-wrap" v-if="selectAppInfo.icon">
                  <img class="app-select-icon" :src="selectAppInfo.icon" alt="">
                </div>
                <div class="app-select-title-wrap" v-if="selectAppInfo.name">
                  {{selectAppInfo.name}}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="setting-container" v-if="action == 'edit'">

          <div class="setting-item edit">
            <span class="setting-item-title">iOS 应用</span>
            <div class="setting-item-content">
              <div class="app-select-wrap">
                <div class="app-select-icon-wrap">
                  <img class="app-select-icon" :src="appsInfo.ios_icon" alt="">
                </div>
                <div class="app-select-title-wrap">
                  {{appsInfo.ios_name}}
                </div>
              </div>
            </div>
          </div>

          <div class="setting-item edit">
            <span class="setting-item-title">Android 应用</span>
            <div class="setting-item-content">
              <div class="app-select-wrap">
                <div class="app-select-icon-wrap">
                  <img class="app-select-icon" :src="appsInfo.android_icon" alt="">
                </div>
                <div class="app-select-title-wrap">
                  {{appsInfo.android_name}}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="setting-container">

          <div class="button-area">
            <div class="big-button" @click="onCreate" v-if="action=='create'">
              <span>确定关联</span>
            </div>
            <div class="big-button" @click="onDelete" v-if="action == 'edit'">
              解除关联
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: center; margin: 60px 0 30px 0;">
          <div>
            <p class="setting-tip" style="margin-bottom: 10px;">温馨提示：</p>
            <p class="setting-tip">iOS 应用和 Android 应用建立关联后，进入任一个应用的下载页；</p>
            <p class="setting-tip">系统会自动帮您跳转到当前手机系统对应的应用页面</p>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  /* eslint-disable */
  import api from '../../../util/api.js'
  import disappSelect from '../../common/disappSelect.vue'

  export default {
    data () {
      return {
        shortLink: '',
        action: '',
        id: '',
        platform: '',
        showDisappSelect: false,
        currentAppInfo: {
          icon: null,
          name: null,
          id: null
        },
        selectAppInfo: {
          icon: null,
          name: null,
          id: null
        },
        appsInfo: {
          ios_icon: '',
          ios_name: '',
          android_icon: '',
          android_name: ''
        },
        form: {
        }
      }
    },
    components: {
      disappSelect
    },
    methods: {
      onDelete () {
        api.post('disapp/union/delete', {
          id: this.id
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$message.success('关联已解除')
              this.$router.push({
                name: 'disapp/list'
              })
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      onDisappSelected (item) {
        this.selectAppInfo.icon = item.icon
        this.selectAppInfo.name = item.name
        this.selectAppInfo.id = item.record_id
      },
      onShowSelect () {
        this.showDisappSelect = true
      },
      onCreate () {
        if (this.action == 'create') {
          var ios_id = ''
          var android_id = ''
          if (this.platform == 'ios') {
            ios_id = this.currentAppInfo.id
            android_id = this.selectAppInfo.id
          } else {
            ios_id = this.selectAppInfo.id
            android_id = this.currentAppInfo.id
          }

          api.post('disapp/union/create', {
            ios_id: ios_id,
            android_id: android_id,
            shortLink: this.shortLink
          }, (res) => {
            if (res.status === 200) {
              const data = res.data
              if (data.code === 0) {
                this.$message.success('关联成功')
                this.$router.push({
                  name: 'disapp/list'
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
      requestAppsInfo () {
        api.post('disapp/union/info', {
          id: this.id
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              var info = data.data
              this.appsInfo = info
              this.shortLink = info.short_link
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      requestShortLink () {
        this.shortLink = ''
        api.post('disapp/union/shortlink/next', {}, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.shortLink = data.data.short_link
              this.$forceUpdate()
            }
          }
        })
      }
    },
    created: function () {
      this.action = this.$route.query.action

      if (this.action == 'edit') {
        this.id = this.$route.query.id
        this.requestAppsInfo()
      } else {
        this.platform = this.$route.query.platform
        this.currentAppInfo = this.$route.query.currentAppInfo
        this.requestShortLink()
      }
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';
  .app-select-wrap {
    border-radius: 3px;
    -webkit-box-shadow: 0 1px 0 0 #EEEFF0, -1px 0 0 0 #EEEFF0, 1px 0 0 0 #EEEFF0, 0 1px 3px 0 rgba(190, 200, 214, 0.22), 0 2px 3px 0 rgba(190, 200, 214, 0.13), 0 -1px 0 0 #F8F9FA;
    box-shadow: 0 1px 0 0 #EEEFF0, -1px 0 0 0 #EEEFF0, 1px 0 0 0 #EEEFF0, 0 1px 3px 0 rgba(190, 200, 214, 0.22), 0 2px 3px 0 rgba(190, 200, 214, 0.13), 0 -1px 0 0 #F8F9FA;
    height: 60px;
    width: 100%;
    display: flex;
    cursor: no-drop;
  }
  .app-select-wrap-enable {
    cursor: pointer;
  }
  .app-select-wrap-enable:hover {
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
    -webkit-box-shadow: 0 1px 3px 0 rgba(191, 200, 214, 0.22), 0 2px 3px 0 rgba(191, 200, 214, 0.13), 0 2px 20px 0 #EBEFF5;
    box-shadow: 0 1px 3px 0 rgba(191, 200, 214, 0.22), 0 2px 3px 0 rgba(191, 200, 214, 0.13), 0 2px 20px 0 #EBEFF5;
  }
  .app-select-icon-wrap {
    display: flex;
    align-items: center;
    padding-left: 16px;
  }
  .app-select-icon {
    width: 37px;
    height: 37px;
    border-radius: 8px;
  }
  .app-select-title-wrap {
    padding-left: 16px;
    color: rgb(104, 114, 140);
    line-height: 60px;
    font-size: 16px;
  }
  .app-select-button {
    width: 100%;
    line-height: 60px;
    text-align: center;
    color: #4488FF;
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
