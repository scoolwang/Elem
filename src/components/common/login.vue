<template>
  <div class="container login-container">
    <hd></hd>
    <div>

      <!-- <div style="display: flex; align-items: center; justify-content: center; padding: 20px 0 40px 0;">
        <img style="height: 44px; cursor: pointer;" src="../../../src/images/hiapp_logo.png" alt="" @click="goHome">
        <span style="padding-left: 2px; padding-top: 2px; font-weight: 700; opacity: 0.8; font-size: 20px; color: rgb(33,37,46);">控制台</span>
      </div> -->

      <el-card>
      <!-- <div class="head">
        <span>用 户 登 录</span>
      </div> -->

      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">

        <el-form-item label="" prop="username">
          <el-input v-model="form.username" auto-complete="off"  placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item label="" prop="password" class="password-row">
          <el-input v-model="form.password" auto-complete="off" placeholder="登录密码" type="password"></el-input>
          <div class="forget" @click="onGotoForget">
            忘记密码
          </div>
        </el-form-item>

        <el-button class="login-btn" type="primary" :loading="loginButtonLoading" @click="submitForm"> 立 即 登 录</el-button>

      </el-form>

    </el-card>

    <!-- <div class="bottom-text-wrap">
      <div>
        没有账号？ <span @click="onGotoReg">快速注册</span>
      </div>
      <div @click="onGotoForget">
        <span>忘记密码？</span>
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
        loginButtonLoading: false,
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      hd
    },
    methods: {
      goHome () {
        window.open('https://51gsc.com')
      },
      showCaptcha () {
        console.log(TencentCaptcha)
        let captcha = new TencentCaptcha('2077020358',res => {
          console.log(res)

          if (res.ret == 0) {
            var data = Object.assign(this.form, {
              appid: res.appid,
              ticket: res.ticket,
              randstr: res.randstr
            })
            this.requestLogin(data)
          }
        })

        captcha.show()
      },
      submitForm () {
        console.log(this.form.username)
        console.log(this.form.password)
        this.$refs['form'].validate((valid) => {
          if (valid) {
            localStorage.username = this.form.username
            this.showCaptcha()
          } else {
            return false
          }
        })
      },
      onGotoReg () {
        this.$router.push({
          name: 'reg'
        })
      },
      onGotoForget () {
        this.$router.push({
          name: 'forget'
        })
      },
      requestUnread () {
        api.post('user/unread', {}, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$store.commit('changeNoticeAllReaded', data.data.has_new_notice == 0)
              this.$store.commit('changeHasReply', data.data.has_reply == 1)
            }
          }
        })
      },
      requestLogin (data) {
          this.loginButtonLoading = true

          api.post('user/login', data, (res) => {
            this.loginButtonLoading = false

            if (res.status === 200) {
              const data = res.data
              if (data.code === 0) {
                localStorage.token = res.data.data.token
                this.$message.success('登录成功')
                this.requestUnread()
                this.$router.push({
                  name: 'user/info'
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
      this.form.username = localStorage.username
    }
  }
</script>

<style scoped>
@import '../../css/login.css';
@import '../../css/common.css';
div.login-container {
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
  margin-top: 0px !important;
}

.forget {
  width: 86px;
  border: 1px solid #d8dce5;
  border-left: none;
  border-radius: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  height: 38px;
  text-align: center;
  font-size: 12px;
  color: #8f9bb2;
  padding: 0 10px;
}
</style>
<style>
.password-row .el-form-item__content {
  display: flex;
}
.password-row .el-form-item__content .el-input__inner {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

}
.is-error .forget {
  border-color: #fa5555;
}
.is-success .forget {
  border-color: #4758ee;
}
.login-btn:hover {
  background-color: #4758ee !important;
}
</style>
