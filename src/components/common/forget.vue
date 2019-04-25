<template>
  <div class="container">

    <div>

      <div style="display: flex; justify-content: center; padding: 30px 0 40px 0;">
      </div>

      <el-card>
        <div class="head">
          <span>忘 记 密 码</span>
        </div>

        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">

          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" auto-complete="off" placeholder="6-16位英文或数字"></el-input>
          </el-form-item>

          <el-form-item label="新登录密码" prop="password">
            <el-input v-model="form.password" auto-complete="off" type="password" placeholder="6-16位英文或数字"></el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" auto-complete="off" type="phone"></el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="validValue">
            <div class="valid-wrap">
              <el-input v-model="form.validValue" auto-complete="off" type="valid"></el-input>
              <el-button class="send send-disable" size="small" type="primary" round v-if="timer != null">{{seconds}}秒后重发</el-button>
              <el-button class="send" size="small" type="primary" round v-if="timer == null" :loading="sendSMSLoading" @click="onSendSMS">发送验证码</el-button>
            </div>
          </el-form-item>

          <el-button class="login-btn" type="primary" :loading="forgetButtonLoading" @click="submitForm">确 定</el-button>

        </el-form>

      </el-card>

      <div class="bottom-text-wrap">
        <div>
          已有账号？<span @click="onGotoLogin">前往登录</span>
        </div>
        <div>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
  /* eslint-disable */
  import api from '../../util/api.js'

  export default {
    data () {
      return {
        seconds: 0,
        timer: null,
        forgetButtonLoading: false,
        sendSMSLoading: false,
        form: {
          username: '',
          password: '',
          password2: '',
          phone: '',
          validValue: '',
          validId: ''
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
          type: 'forget'
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
              this.requestForget()
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
      requestForget () {
        this.forgetButtonLoading = true

        api.post('user/forget', this.form, (res) => {
          this.forgetButtonLoading = false

          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$message.success('登录密码已重设')
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

</style>
