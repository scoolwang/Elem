<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>工单列表</el-breadcrumb-item>
      <el-breadcrumb-item>工单详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="write-content">
      <div class="back-btn" @click="onBack">
        <span>返回列表</span>
      </div>

      <div class="info-wrap">
        <p class="info-txt">{{info.title}}</p>
      </div>

      <div class="msg-wrap" v-for="item in list">
        <div class="content-wrap">
          <div class="content-head-wrap">
            <span class="user">{{item.by == 0 ? '您' : '客服'}}：</span>
            <span class="create-time">{{item.create_at}}</span>
          </div>
          <span class="message">{{item.message}}</span>
        </div>
      </div>

      <div class="setting-container">

        <div class="setting-item edit">
          <span class="setting-item-title">回复内容</span>
          <div class="setting-item-content">
            <textarea class="setting-textarea" v-model="form.message"></textarea>
          </div>
        </div>

        <div class="button-area">
          <div class="big-button" @click="onCreate">
            <span>提交</span>
          </div>
        </div>

      </div>

    </div>


  </div>
</template>

<script>
  /* eslint-disable */
  import api from '../../../util/api.js'

  export default {
    data () {
      return {
        id: '',
        list: [],
        form: {
          message: ''
        },
        info: {},
        buttonLoading: false
      }
    },
    components: {
    },
    methods: {
      onCreate () {
        if (this.info.id && this.form.message.length > 0) {
          api.post('feedback/addmessage', {
            id: this.id,
            message: this.form.message
          }, (res) => {
            if (res.status === 200) {
              const data = res.data
              if (data.code === 0) {
                this.form.message = ''
                this.$message.success('已提交')
                this.request()
              } else {
                this.$message.error(data.message)
              }
            } else {
              this.$message.error(res)
            }
          })
        }
      },
      onBack () {
        this.$router.push({
          name: 'feedback/list'
        })
      },
      request () {
        api.post('feedback/detail', {
          id: this.id
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.list=data.data.list
              this.info.title = data.data.title
              this.info.id = data.data.id
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
      this.id = this.$route.query.id
      this.request()
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';
  .back-btn {
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
  .back-btn:hover {
    transition: all .3s ease;
    box-shadow: 0 1px 3px 0 rgba(191, 200, 214, 0.22), 0 2px 3px 0 rgba(191, 200, 214, 0.13), 0 2px 20px 0 #EBEFF5;
  }
  .back-btn i {
    font-size: 14px;
    margin-right: 2px;
  }
  .back-btn span {
    font-size: 14px;
  }
  .info-wrap {
    border-bottom: 1px solid #eceeee;
    padding: 30px 10px 30px 10px;
  }
  .info-txt {
    margin: 0;
    font-size: 18px;
    margin-bottom: 4px;
    color: rgb(104, 114, 140);
  }
  .content-wrap {
    margin-top: 30px;
    border-bottom: 1px dashed #eceeee;
    padding: 0 10px 30px 10px;
    margin-bottom: 10px;
  }
  .content-head-wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }
  .user {
    color: rgb(104, 114, 140);
    font-size: 14px;
    font-weight: 600;
  }
  .create-time {
    color: rgb(104, 114, 140);
    font-size: 14px;
  }
  .message {
    font-size: 14px;
    margin-bottom: 8px;
    color: rgb(104, 114, 140);
    white-space: pre-wrap;
  }
  .setting-container {
    padding-left: 136px;
    padding-top: 32px;
  }
  .setting-item {
    display: flex;
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
    width: 340px;
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
