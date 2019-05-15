<template>
  <div class="container reg-container">
    <hd></hd>
    <div>

      <!-- <div style="display: flex; justify-content: center; padding: 30px 0 40px 0;">
      </div> -->

      <el-card>
      <div class="head">
        <span>欢迎注册飞网</span>
      </div>

      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">

        <el-form-item label="" prop="username">
          <el-input v-model="form.username" auto-complete="off" placeholder="输入用户名,6-16位英文或数字"></el-input>
        </el-form-item>

        <el-form-item label="" prop="password">
          <el-input v-model="form.password" auto-complete="off" type="password" placeholder="输入账号密码，6-16位英文或数字"></el-input>
        </el-form-item>

        <el-form-item label="" prop="phone">
          <el-input placeholder="请输入手机号" v-model="form.phone" auto-complete="off" type="phone"></el-input>
        </el-form-item>

        <el-form-item label="" prop="validValue">
          <div class="valid-wrap">
            <el-input placeholder="验证码" v-model="form.validValue" auto-complete="off" type="valid"></el-input>
            <el-button class="send send-disable" size="small" type="primary" round v-if="timer != null">{{seconds}}秒后重发</el-button>
            <el-button class="send" size="small" round v-if="timer == null" :loading="sendSMSLoading" @click="onSendSMS">发送验证码</el-button>
          </div>
        </el-form-item>

        <el-form-item label="推荐人ID" prop="phone" v-if="form.rmdUser">
          <el-input placeholder="推荐人ID" v-model="form.rmdUser" auto-complete="off" disabled=""></el-input>
        </el-form-item>

        <el-button class="login-btn" type="primary" :loading="regButtonLoading" @click="submitForm">注 册</el-button>

        <p style="font-size: 13px; margin-bottom: 0; color: rgb(104, 114, 140);text-align:center;">
          点击 “注册” 即表示您同意并愿意遵守 <a class="link" href="https://www.51gsc.com/protocol.html">服务协议</a>
        </p>

      </el-form>

    </el-card>

    <!-- <div class="bottom-text-wrap">
      <div>
        已有账号？<span @click="onGotoLogin">前往登录</span>
      </div>
      <div>
      </div>
    </div> -->

    </div>

  </div>

</template>

<script>
  /* eslint-disable */
  import api from '../../util/api.js'
  import hd from './Header.vue'
  export default {
    data () {
      return {
        seconds: 0,
        timer: null,
        regButtonLoading: false,
        sendSMSLoading: false,
        form: {
          username: '',
          password: '',
          password2: '',
          phone: '',
          validValue: '',
          validId: '',
          rmdUser: ''
        },
        validImg: '',
        rules: {
          username: [
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入账号'))
                } else if (value.length < 6) {
                  callback(new Error('账号长度必须大于6位'))
                }
                callback()
              },
              trigger: 'blur',
              required: true
            }
          ],
          password: [
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入密码'))
                } else if (value.length < 6) {
                  callback(new Error('密码长度必须大于6位'))
                }
                callback()
              },
              trigger: 'blur',
              required: true
            }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          validValue: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      hd
    },
    methods: {
      onSendSuccess () {
        this.seconds = 60
        this.timer = setInterval(() => {
          this.seconds --
          if (this.seconds < 0) {
            this.seconds = 0
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      },
      onSendSMS () {
        if (this.timer) {
          return
        }

        if (this.form.phone.length == 0) {
          this.$message.error('请输入手机号')
          return
        }

        this.sendSMSLoading = true
        api.post('getsms', {
          phone: this.form.phone,
          type: 'reg'
        }, (res) => {
          this.sendSMSLoading = false
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.form.validId = data.data.id
              this.$message.success('验证码已发送')
              this.onSendSuccess()
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      submitForm () {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.form.validId) {
              this.requestReg()
            } else {
              this.$message.error('验证码不正确')
            }
          } else {
            return false
          }
        })
      },
      onGotoLogin () {
        this.$router.push({name: 'login'})
      },
      requestReg () {
        this.regButtonLoading = true

        api.post('user/reg', this.form, (res) => {
          this.regButtonLoading = false

          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$message.success('注册成功')
              this.onGotoLogin()
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
      // 推荐人
      if (this.$route.query.user_id) {
        this.form.rmdUser = this.$route.query.user_id
        localStorage.rmd_user_id = this.form.rmdUser
      } else if (localStorage.rmd_user_id) {
        this.form.rmdUser = localStorage.rmd_user_id
      }
    }
  }
</script>

<style scoped>
  @import '../../css/common.css';
  @import '../../css/login.css';

  .valid-wrap {
    display: flex;
  }

  .el-button.el-button--primary.send {
    font-size: 13px;
    width: auto;
    height: auto;
    margin: 0 0 0 18px;
  }

  .send-disable {
    background-color: #EBEDF0 !important;
    border: #EBEDF0 !important;
    color: #8c939d !important;
    cursor: not-allowed !important;
  }
  .send-disable:hover {
    background-color: #EBEDF0 !important;
    border: #EBEDF0 !important;
    color: #8c939d !important;
  }

  .link {
    color: #347EFF;
    cursor: pointer;
  }
  div.reg-container {
    top: 61px !important;
  }
  .el-card {
    border: none;
    box-shadow: none;
    background: none;
  }
  .el-form-item {
    margin-bottom: 15px !important;
  }
  .login-btn {
    margin: 20px 0 !important;
  }
  .el-button.is-round  {
    border-radius: 4px;
    border-left:none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    height: 40px;
  }

</style>
<style>
  .valid-wrap .el-input__inner {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .is-error .el-button.is-round {
    border-color: #fa5555;
  }
  .is-success .el-button.is-round {
    border-color: #4758ee;
  }
  .login-btn:hover {
    background-color: #4758ee !important;
  }
  .el-button.is-round span {
    color: #999;
  }
</style>
