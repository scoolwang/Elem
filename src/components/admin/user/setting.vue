<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
      <el-breadcrumb-item>账户设置</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="write-content">

      <div class="setting-area">
        <div class="setting-title">
          账户信息
        </div>

        <div class="setting-container" v-if="!accountEditable">
          <div class="setting-item">
            <span class="setting-item-title">用户名</span>
            <div class="setting-item-content">
              <span>{{accountForm.username}}</span>
            </div>
          </div>
          <div class="setting-item">
            <span class="setting-item-title">登录密码</span>
            <div class="setting-item-content">
              <span>***</span>
            </div>
          </div>

          <div class="setting-btn" @click="onEdit('account')">
            <i class="el-icon-edit-outline"></i>
            <span>编辑</span>
          </div>
        </div>

        <div class="setting-container" v-if="accountEditable">
          <div class="setting-item edit">
            <span class="setting-item-title">用户名</span>
            <div class="setting-item-content">
              <span>{{accountForm.username}}</span>
            </div>
          </div>

          <el-form :model="accountForm">
            <div class="setting-item edit">
              <span class="setting-item-title">原登录密码</span>
              <div class="setting-item-content">
                <input class="setting-input" type="password" name="" v-model="accountForm.oldPwd">
              </div>
            </div>
            <div class="setting-item edit">
              <span class="setting-item-title">新登录密码</span>
              <div class="setting-item-content">
                <input class="setting-input" type="password" name="" v-model="accountForm.newPwd1">
              </div>
            </div>
            <div class="setting-item edit">
              <span class="setting-item-title">确认密码</span>
              <div class="setting-item-content">
                <input class="setting-input" type="password" name="" v-model="accountForm.newPwd2">
              </div>
            </div>
          </el-form>

          <div class="setting-btn" @click="onSubmit('account')">
            <span>保存</span>
          </div>
        </div>

      </div>

      <div class="setting-area">
        <div class="setting-title">
          实名认证
        </div>

        <!--审核中-->
        <div class="setting-container" v-if="idcardInfo.state == 0">
          <div class="setting-item edit">
            <span class="setting-item-title setting-item-title-tip">您的身份信息已提交，工作人员将在一个工作日内完成审核，请耐心等待...</span>
          </div>
        </div>

        <!--已认证-->
        <div class="setting-container" v-if="idcardInfo.state == 1">
          <div class="setting-item edit">
            <span class="setting-item-title">姓名</span>
            <div class="setting-item-content">
              <span>{{idcardInfo.name}}</span>
            </div>
          </div>
          <div class="setting-item edit">
            <span class="setting-item-title">身份证号</span>
            <div class="setting-item-content">
              <span>{{idcardInfo.cardno}}</span>
            </div>
          </div>
        </div>

        <!--认证失败-->
        <div class="setting-container" v-if="idcardInfo.state == 2">
          <div v-if="!idcardEditable">
            <div class="setting-item edit">
              <span class="setting-item-title setting-item-title-tip setting-text-red">实名认证不通过！</span>
            </div>
            <div class="setting-btn" @click="onEdit('idcard')">
              <i class="el-icon-plus"></i>
              <span>认证</span>
            </div>
          </div>
          <div v-if="idcardEditable">
            <el-form :model="idcardForm">
              <div class="setting-item edit">
                <span class="setting-item-title setting-item-title-tip">请上传与<b> 手机号绑定 </b>的身份证照片，支持 PNG/JPG 格式，图片大小不超过 2M。</span>
              </div>

              <div class="setting-item edit">
                <span class="setting-item-title">身份证正面照</span>
                <div class="setting-item-content">
                  <sb-upload v-model="idcardForm.photo1" :showButton="false" type="idcard"></sb-upload>
                </div>
              </div>

              <div class="setting-item edit">
                <span class="setting-item-title">身份证反面照</span>
                <div class="setting-item-content">
                  <sb-upload v-model="idcardForm.photo2" :showButton="false" type="idcard"></sb-upload>
                </div>
              </div>
            </el-form>
            <div class="setting-btn" :class="[idcardSubmiting ? 'setting-btn-disable': '']" @click="onSubmit('idcard')">
              <span>提交</span>
            </div>
          </div>
        </div>

        <!--没提交过认证-->
        <div class="setting-container" v-if="idcardInfo.state == 3">
          <div v-if="!idcardEditable">
            <div class="setting-btn" @click="onEdit('idcard')">
              <i class="el-icon-plus"></i>
              <span>认证</span>
            </div>
          </div>
          <div v-if="idcardEditable">
            <el-form :model="idcardForm">
              <div class="setting-item edit">
                <span class="setting-item-title setting-item-title-tip">请上传与<b> 手机号绑定 </b>的身份证照片，支持 PNG/JPG 图片，图片大小不超过 2M。</span>
              </div>

              <div class="setting-item edit">
                <span class="setting-item-title">身份证正面照</span>
                <div class="setting-item-content">
                  <sb-upload v-model="idcardForm.photo1" :showButton="false" type="idcard"></sb-upload>
                </div>
              </div>

              <div class="setting-item edit">
                <span class="setting-item-title">身份证正面照</span>
                <div class="setting-item-content">
                  <sb-upload v-model="idcardForm.photo2" :showButton="false" type="idcard"></sb-upload>
                </div>
              </div>
            </el-form>
            <div class="setting-btn" :class="[idcardSubmiting ? 'setting-btn-disable': '']" @click="onSubmit('idcard')">
              <span>提交</span>
            </div>
          </div>
        </div>

      </div>

      <div class="setting-area">
        <div class="setting-title">
          提现账号
        </div>

        <div class="setting-container" v-if="!alipayEditable && alipayForm.alipay_account">
          <div class="setting-item">
            <span class="setting-item-title">
              支付宝账号
              <el-tooltip class="item" effect="dark" content="如与实名认证姓名不同，将无法提现" placement="top">
                <i class="fas fa-info-circle info-icon"></i>
              </el-tooltip>
            </span>
            <div class="setting-item-content">
              <span>{{alipayForm.alipay_account}}</span>
            </div>
          </div>
          <div class="setting-btn" @click="onEdit('alipay')">
            <i class="el-icon-edit-outline"></i>
            <span>编辑</span>
          </div>
        </div>

        <div class="setting-container" v-if="!alipayEditable && !alipayForm.alipay_account">
          <div class="setting-btn" @click="onEdit('alipay')">
            <i class="el-icon-plus"></i>
            <span>填写</span>
          </div>
        </div>

        <div class="setting-container" v-if="alipayEditable">

          <el-form :model="alipayForm">
            <div class="setting-item edit">
              <span class="setting-item-title">
                支付宝账号
                <el-tooltip class="item" effect="dark" content="需与实名认证姓名相同，否则提现款无法到账" placement="top">
                  <i class="fas fa-info-circle info-icon"></i>
                </el-tooltip>
              </span>
              <div class="setting-item-content">
                <input class="setting-input" type="" name="" v-model="alipayForm.alipay_account">
              </div>
            </div>
          </el-form>

          <div class="setting-btn" @click="onSubmit('alipay')">
            <span>保存</span>
          </div>
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
  import sbUpload from '../../common/sbUpload.vue'

  export default {
    data () {
      return {
        accountEditable: false,
        idcardEditable: false,
        alipayEditable: false,
        accountSubmiting: false,
        idcardSubmiting: false,
        alipaySubmiting: false,
        accountForm: {
          oldPwd: '',
          newPwd1: '',
          newPwd2: ''
        },
        idcardInfo: {
          name: null,
          cardno: null,
          state: 3
        },
        idcardForm: {
          photo1: '',
          photo2: ''
        },
        alipayForm: {
          alipay_account: ''
        }
      }
    },
    components: {
      appUpload,
      appUploadBtn,
      sbUpload
    },
    methods: {
      onEdit (type) {
        if (type == 'account') {
          this.accountEditable = true
        } else if (type == 'idcard') {
          this.idcardEditable = true
        } else if (type == 'alipay') {
          this.alipayEditable = true
        }
      },
      onSubmit (type) {
        if (type == 'account') {
          this.onSubmitAccount()
        } else if (type == 'idcard') {
          this.onSubmitIdcard()
        } else if (type == 'alipay') {
          this.onSubmitAlipay()
        }
      },
      onSubmitAccount () {
        if (this.accountSubmiting) {
          return
        }

        if (this.accountForm.oldPwd.length == 0) {
          this.$message.error('请输入原登录密码')
          return
        }

        if (this.accountForm.newPwd1.length < 6 || this.accountForm.newPwd1.length > 16) {
          this.$message.error('密码长度6~16位')
          return
        }

        if (this.accountForm.newPwd1 != this.accountForm.newPwd2) {
          this.$message.error('两次密码不一致')
          return
        }

        this.accountSubmiting = true
        api.post('user/changepwd', {
          oldPwd: this.accountForm.oldPwd,
          newPwd: this.accountForm.newPwd1
        }, (res) => {
          this.accountSubmiting = false

          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$message.success('修改成功')
              this.accountEditable = false
              setTimeout(() => {
                this.$router.push({name: 'login'})
              }, 500)
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      onSubmitIdcard () {
        if (this.idcardSubmiting) {
          return
        }

        if (this.idcardForm.photo1.length == 0) {
          this.$message.error('请上传身份证正面照片')
          return
        }

        if (this.idcardForm.photo2.length == 0) {
          this.$message.error('请上传身份证反面照片')
          return
        }

        this.idcardSubmiting = true
        api.post('user/saveidcard', this.idcardForm, (res) => {
          this.idcardSubmiting = false

          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$message.success('提交成功')
              this.requestUserInfo()
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      onSubmitAlipay () {
        if (this.alipayForm.alipay_account.length == 0) {
          this.$message.error('请填写支付宝账号')
          return
        }

        if (this.alipaySubmiting) {
          return
        }

        this.alipaySubmiting = true
        api.post('user/changealipay', this.alipayForm, (res) => {
          this.alipaySubmiting = false

          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$message.success('修改成功')
              this.alipayEditable = false
              this.requestUserInfo()
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      requestUserInfo () {
        api.post('user/info', this.alipayForm, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              var info = data.data
              this.accountForm.username = info.username
              this.alipayForm.alipay_account = info.alipay_account

              if (info.state == 1) {
                this.idcardInfo.name = info.name
                this.idcardInfo.cardno = info.cardno
              }
              this.idcardInfo.state = info.state
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
      this.requestUserInfo()
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';
  .info-icon {
    color: rgba(68,136,255,.4);
    font-size: 14px;
    cursor: pointer;
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
  .setting-item.edit {
    padding: 6px 0;
  }
  .setting-item-title {
    width: 190px;
    color: rgba(41,47,58, 0.5);
    line-height: 36px;
    font-size: 14px;
  }
  .setting-item-title-tip {
    width: 600px;
    color: rgb(104, 114, 140);
    padding-bottom: 20px;
  }
  .setting-text-red {
    color: #f54545;
  }
  .setting-input {
    border: 1px solid #ECEEF1;
    background-color: rgba(68, 136, 255, 0.02);
    border-radius: 3px;
    color: rgb(104, 114, 140);
    width: 240px;
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
  .setting-btn-disable {
    color: rgba(68, 136, 255, 0.3);
  }
  .setting-btn i {
    font-size: 14px;
    margin-right: 2px;
  }
  .setting-btn span {
    font-size: 14px;
  }
</style>
