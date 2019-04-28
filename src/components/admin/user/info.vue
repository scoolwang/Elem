<template>
  <div>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
      <el-breadcrumb-item>概览</el-breadcrumb-item>
    </el-breadcrumb> -->

    <!--<div class="tip-container">-->
      <!--<div class="tip-icon-wrap">-->
        <!--<span class="fas fa-bell"></span>-->
      <!--</div>-->
      <!--<p>-->
        <!--独立证书稳定签名中，10个包以上的客户可直接与客服联系-->
      <!--</p>-->
    <!--</div>-->

    <div class="info-container">
      <div class="userinfo" style="width: 346px;">
        <div class="userinfo-header">
          <p>账户信息</p>
        </div>
        <div class="userinfo-item-wrap">
          <div class="userinfo-item">
            <i class="fas fa-mobile"></i>
            <p>{{userInfo.phone}}</p>
          </div>
          <div class="userinfo-item">
            <i class="fas fa-id-card"></i>
            <p>{{userInfo.state == 1 ? '已实名认证' : '未实名认证'}}</p>
          </div>
        </div>
      </div>

      <div class="usedata">
        <div class="apps-wrap">
          <div class="app-item-wrap">
            <div class="usedata-item">
              <p class="count">{{resourceInfo.resource_dispatch_free}}</p>
              <p class="label">
                今日免费下载点数
                <el-tooltip class="item" effect="dark" content="实名认证每天赠送1000下载点，未实名认证赠送30下载点；下载时优先使用免费下载点，每天0点自动清零" placement="top">
                  <i class="fas fa-info-circle info-icon"></i>
                </el-tooltip>
              </p>
            </div>
          </div>
          <div class="app-item-wrap">
            <div class="usedata-item">
              <p class="count">{{resourceInfo.resource_dispatch_pay}}</p>
              <p class="label">
                剩余付费下载点数
                <el-tooltip class="item" effect="dark" content="付费点数每天0点不会清零，并且永不过期" placement="top">
                  <i class="fas fa-info-circle info-icon"></i>
                </el-tooltip>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="usedata">
        <div class="apps-wrap">
          <div class="app-item-wrap">
            <div class="usedata-item">
              <p class="count">{{resourceInfo.disapp}}</p>
              <p class="label">分发应用数</p>
            </div>
          </div>
          <div class="app-item-wrap">
            <div class="usedata-item">
              <p class="count">{{resourceInfo.signapp}}</p>
              <p class="label">签名应用数</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="min-width: 1000px;">
      <div class="window-container" style="display: flex; background-color: rgba(0,0,0,0); height: 200px; margin-bottom: 16px;">
        <div style="width: 346px; display: flex; flex-direction: column;">
          <div class="window-header">
            <p>推广返现</p>
          </div>
          <div style="flex: 1; background-color: white;">
            <div style="padding-top: 46px; display: flex; align-items: center; justify-content: center; font-size: 14px; color: rgba(104,104,104,0.7)">
              <span style="color: rgb(104, 114, 140);">累计获得</span>
              <span style="padding: 0 6px; color: #347EFF; opacity: 0.85; font-size: 18px; font-weight: 700;">￥{{userInfo.all_profit ? userInfo.all_profit / 100 : 0}}</span>
              <span style="color: rgb(104, 114, 140);">返现</span>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 10px;">
              <p class="free-resource-txt">推荐新用户，每单都返现</p>
            </div>
          </div>
        </div>

        <div style="flex: 1; display: flex; flex-direction: column;  margin-left: 10px;">
          <div class="window-header">
            <p>最新消息</p>
          </div>
          <div style="flex: 1; background-color: white; padding-top: 20px;">
            <p class="notice-txt" v-for="notice in userInfo.notices" @click="onNoticeClick(notice.record_id)">
              <span class="notice-txt-title">{{notice.title}}</span>
              <span style="width: 146px; padding-left: 20px;">{{notice.create_at}}</span>
            </p>
          </div>
        </div>

      </div>
    </div>

    <div class="window-container">
      <div class="window-header">
        <p>近7天下载量总览</p>
      </div>

      <div style="padding: 20px 20px 10px 20px;">
        <div>
          <area-shadow-chart v-if="chartData" :data="chartData" :height="chartHeight"/>
        </div>
      </div>

    </div>

    <div class="notice-container" v-if="false">
      <div class="container-header">
        <p>公告通知</p>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
  import api from '../../../util/api.js'
  import LineChart from '../../common/chart'
  import AreaShadowChart from "../../common/AreaShadow";

  export default {
    data () {
      return {
        userInfo: {},
        resourceInfo: {},
        chartData: null,
        chartOptions: null,
        chartHeight: 300
      }
    },
    components: {
      LineChart,
      AreaShadowChart
    },
    methods: {
      onGetFreePoints () {
        api.post('resource/getfree', this.contactForm, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$message.success(data.message)
              this.request()
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      onNoticeClick (id) {
        this.$router.push({
          name: 'notice/detail',
          query: {
            id: id
          }
        })
      },
      request () {
        api.post('user/info', this.contactForm, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.userInfo = data.data
            }
          }
        })

        api.post('resource/info', {}, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.resourceInfo = data.data
            }
          }
        })

        api.post('disapp/downloaddata', {}, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {

              this.chartData = {
                labels: ["6天前", "5天前", "4天前", "3天前", "前天", "昨天", "今天"],
                datasets: [
                  {
                    label: "",
                    data: data.data,
                    borderColor: 'rgba(68,136,255,1)',
                    pointBackgroundColor: 'white',
                    pointBorderColor: 'rgba(68,136,255,1)',
                    pointHoverBackgroundColor: 'rgba(68,136,255,1)',
                    pointHoverBorderColor: 'white',
                    pointRadius: 4,
                    pointBorderWidth: 2,
                    pointHoverRadius: 5,
                    fill: true,
                    borderWidth: 2,
                    backgroundColor: 'rgba(68,136,255,0.2)'
                  }
                ]
              }

            }
          }
        })
      }
    },
    created: function () {
      this.request()
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
  .notice-txt {
    font-size: 14px;
    color: rgb(104, 114, 140);
    cursor: pointer;
    padding: 0 20px;
    margin: 4px 0 0 0;
    display: flex;
    justify-content: space-between;
  }
  .notice-txt:hover {
    color: rgba(104,114,140,.5);
  }
  .notice-txt-title {
    flex: 1;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
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
  .big-button-disable {
    opacity: 0.6;
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

  .free-resource-txt {
    color: rgb(104, 114, 140);
    font-size: 14px;
    line-height: 24px;
    margin: 0;
  }
  .window-container {
    background-color: white;
    border-radius: 3px 3px 0 0;
    margin-top: 10px;
  }
  .window-header {
    height: 34px;
    background-color: #FBFCFE;
    /*box-shadow: 0 1px 0 0 rgba(235, 239, 245, 0.49);*/
    border-bottom: 1px solid rgba(235, 239, 245, 0.6);
  }
  .window-header p {
    margin: 0;
    color: rgb(104, 114, 140);
    font-size: 13px;
    text-indent: 20px;
    line-height: 34px;
    font-weight: 500;
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
  .info-container {
    display: flex;
    min-width: 1000px;
    height: 120px;
    margin-bottom: 16px;
  }
  .userinfo {
    background-color: white;
    padding: 0;
    border-radius: 3px;
  }
  .userinfo-header {
    height: 34px;
    background-color: #FBFCFE;
    box-shadow: 0 1px 0 0 rgba(235, 239, 245, 0.6);
    border-radius: 3px 3px 0 0;
  }
  .userinfo-header p {
    margin: 0;
    color: rgb(104, 114, 140);
    font-size: 13px;
    text-indent: 20px;
    line-height: 34px;
    font-weight: 500;
  }
  .userinfo-item-wrap {
    padding-top: 12px;
  }
  .userinfo-item {
    display: flex;
    height: 30px;
    align-items: center;
    padding-left: 40px;
    color: rgb(104, 114, 140);
    font-size: 14px;
  }
  .userinfo-item i {
    margin-right: 20px;
    opacity: 0.5;
    width: 12px;
    text-align: center;
  }
  .usedata {
    border-radius: 3px;
    display: flex;
    flex: 1;
  }
  .usedata-item p {
    margin: 0;
    text-align: center;
  }
  .usedata-item p.count {
    color: rgb(104, 114, 140);
    font-size: 18px;
  }
  .usedata-item p.label {
    color: rgba(104,114,140,.5);
    font-size: 12px;
  }
  .app-item-wrap {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .resource-wrap {
    margin-left: 10px;
    background-color: white;
    display: flex;
    flex: 1;
  }
  .apps-wrap {
    margin-left: 10px;
    background-color: white;
    display: flex;
    flex: 1;
  }
  .notice-container {
    margin-top: 10px;
    height: 200px;
    background-color: white;
    border-radius: 3px;
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
    font-size: 13px;
    text-indent: 20px;
    line-height: 34px;
    font-weight: 500;
  }
  .big-button span {
    font-size: 14px;
  }
  .big-button i {
    font-size: 14px;
    padding-right: 4px;
  }
  .delete-btn i {
    color: rgb(104, 114, 140);
    opacity: 0.4;
    height: 10px;
    width: 10px;
  }
  .content-info-item p {
    margin: 0;
    text-align: center;
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
</style>
