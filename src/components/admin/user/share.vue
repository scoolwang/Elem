<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
      <el-breadcrumb-item>推广返现</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="info-container">

      <div class="usedata" style="flex: 2;">
        <div class="apps-wrap">
          <div class="app-item-wrap">
            <div class="usedata-item">
              <p class="count">{{shareProfitInfo.people_count}}</p>
              <p class="label">
                当前推广客户数
              </p>
            </div>
          </div>
          <div class="app-item-wrap">
            <div class="usedata-item">
              <p class="count">{{shareProfitInfo.payed_count}}</p>
              <p class="label">
                当前已购买人数
              </p>
            </div>
          </div>
          <div class="app-item-wrap">
            <div class="usedata-item">
              <p class="count">￥{{shareProfitInfo.frozen_cost}}</p>
              <p class="label">待到账
                <el-tooltip class="item" effect="dark" content="正在后台审核的奖励金额" placement="top">
                  <i class="fas fa-info-circle info-icon"></i>
                </el-tooltip>
              </p>
            </div>
          </div>
          <div class="app-item-wrap">
            <div class="usedata-item">
              <p class="count">￥{{shareProfitInfo.withdrawing_cost}}</p>
              <p class="label">提取中
                <el-tooltip class="item" effect="dark" content="正在提现中的奖励金额" placement="top">
                  <i class="fas fa-info-circle info-icon"></i>
                </el-tooltip>
              </p>
            </div>
          </div>
          <div class="app-item-wrap">
            <div class="usedata-item">
              <p class="count">￥{{shareProfitInfo.withdrawed_cost}}</p>
              <p class="label">已领取
                <el-tooltip class="item" effect="dark" content="已发放到支付宝的奖励金额" placement="top">
                  <i class="fas fa-info-circle info-icon"></i>
                </el-tooltip>
              </p>
            </div>
          </div>
          <div class="app-item-wrap">
            <div class="usedata-item">
              <p class="count">￥{{shareProfitInfo.can_withdraw_cost}}</p>
              <p class="label">可提取
                <el-tooltip class="item" effect="dark" content="可立即提取到支付宝的奖励金额" placement="top">
                  <i class="fas fa-info-circle info-icon"></i>
                </el-tooltip>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="info-container" style="height: 184px;">
      <div class="userinfo" style="flex: 1;">
        <div class="userinfo-header">
          <p>返现账户</p>
        </div>
        <div class="share-rule-wrap">
          <p style="margin: 0; text-align: center">
            返现到支付宝：
            <b>{{shareProfitInfo.alipay_account ? shareProfitInfo.alipay_account : '提现账号未设置'}}</b>
          </p>
          <p style="text-align: center">
            <span class="big-button" v-if="shareProfitInfo.can_withdraw_cost > 0" @click="onWithdraw">立即提取</span>
            <span class="big-button big-button-disable" v-if="shareProfitInfo.can_withdraw_cost == 0">立即提取</span>
          </p>
        </div>
      </div>

      <div class="userinfo" style="margin-bottom: 16px; flex: 1; margin-left: 10px; height: 184px;">
        <div class="userinfo-header">
          <p>推广链接</p>
        </div>
        <div class="share-rule-wrap">
          <p style="margin: 0; text-align: center">
            每位推广客户的第一笔订单返现 <b>30%</b>，之后每笔返现 <b>20%</b>
          </p>
          <p style="text-align: center">
            <span class="big-button mini-copy-btn" :data-clipboard-text="shareLink" v-if="shareProfitInfo.alipay_account">复制推广链接</span>
            <span class="big-button big-button-disable" v-if="!shareProfitInfo.alipay_account">复制推广链接</span>

          </p>
        </div>
      </div>
    </div>

    <div class="write-content">

      <el-tabs v-model="tabIndex" @tab-click="onTabChange">
        <el-tab-pane label="关联客户" name="0">
          <el-table :data="userTableData">
            <el-table-column prop="child_username" label="客户名" width="200">
            </el-table-column>
            <el-table-column prop="create_at" label="关联时间">
            </el-table-column>
            <el-table-column prop="" label="累计订单金额">
              <div slot-scope="scope">
                <span class="content">￥100</span>
              </div>
            </el-table-column>
            <el-table-column prop="bonus" label="累计返现金额">
              <div slot-scope="scope">
                <span class="content">￥200</span>
              </div>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination
              layout="prev, pager, next"
              :total="userPages"
              @current-change="onUserListPageChange">
            </el-pagination>
            <p class="count">共{{userPages}}条记录</p>
          </div>
        </el-tab-pane>

        <el-tab-pane label="返现订单" name="1">
          <el-table :data="orderTableData">
            <el-table-column prop="child_username" label="客户名" width="200">
            </el-table-column>
            <el-table-column prop="child_order_at" label="支付时间" width="170">
            </el-table-column>
            <el-table-column prop="" label="支付金额">
              <div slot-scope="scope">
                <span class="content money-txt">￥{{ scope.row.child_order_cost}}</span>
              </div>
            </el-table-column>
            <el-table-column prop="" label="返现比例">
              <div slot-scope="scope">
                <span class="content">{{ scope.row.percent}}%</span>
              </div>
            </el-table-column>
            <el-table-column prop="" label="返现金额">
              <div slot-scope="scope">
                <span class="content money-txt">￥{{ scope.row.profit}}</span>
              </div>
            </el-table-column>
            <el-table-column prop="withdraw_enable_at" label="可提取时间" width="170">
            </el-table-column>
            <el-table-column prop="" label="状态">
              <div slot-scope="scope">
                <span class="content" v-if="scope.row.state == 0">待到账</span>
                <span class="content" v-if="scope.row.state == 1">已提现</span>
                <span class="content" v-if="scope.row.state == 2">提现中</span>
                <span class="content" v-if="scope.row.state == 3">已取消</span>
              </div>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination
              layout="prev, pager, next"
              :total="orderPages"
              @current-change="onOrderListPageChange">
            </el-pagination>
            <p class="count">共{{orderPages}}条记录</p>
          </div>
        </el-tab-pane>

      </el-tabs>


    </div>


  </div>
</template>

<script>
  /* eslint-disable */
  import api from '../../../util/api.js'
  import ClipboardJS from 'clipboard'

  export default {
    data () {
      return {
        tabIndex: 0,
        shareProfitInfo: {
          can_withdraw_cost: 0,
          frozen_cost: 0,
          payed_count: 0,
          people_count: 0,
          withdrawed_cost: 0,
          withdrawing_cost: 0
        },
        userTableData: null,
        userPages: 0,
        shareLink: '',
        orderTableData: null,
        orderPages: 0
      }
    },
    components: {
    },
    methods: {
      onWithdraw () {
        api.post('shareprofit/withdraw', {}, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$message.success('提现成功，预计2个工作日内到账')
              this.requestInfo()
              this.onTabChange()
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      onTabChange () {
        if (this.tabIndex == 0) {
          this.requestUserList(1)
        } else {
          this.requestOrderList(1)
        }
      },
      onUserListPageChange (page) {
        this.requestUserList(page)
      },
      onOrderListPageChange (page) {
        this.requestOrderList(page)
      },
      requestInfo () {
        api.post('shareprofit/info', {}, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.shareProfitInfo = data.data
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      requestUserList (page) {
        api.post('shareprofit/userlist', {
          page: page
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.userTableData = data.data.list
              this.userPages = data.data.totalCount
              this.shareLink = data.data.shareLink
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      requestOrderList (page) {
        api.post('shareprofit/orderlist', {
          page: page
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.orderTableData = data.data.list
              this.orderPages = data.data.totalCount
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
      this.requestInfo()
      this.onTabChange()

      var clipboard = new ClipboardJS('.mini-copy-btn');
      clipboard.on('success', e => {
        this.$message.success('分享链接已复制')
        e.clearSelection();
      });
      clipboard.on('error', e => {
        this.$message.error('分享链接复制失败')
      });
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
  .share-rule-wrap {
    padding: 30px 20px;
    font-size: 14px;
    color: rgb(104, 114, 140);
    display: flex;
    flex-direction: column;
    align-items: center;
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
  .mini-copy-btn {
    margin-left: 10px;
    font-size: 13px;
    color: #4488ff;
    cursor: pointer;
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
  .apps-wrap {
    background-color: white;
    display: flex;
    flex: 1;
  }

  .money-txt {
    /*color: orange;*/
  }

  .button-area {
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .btn-wrap {
    display: flex;
    align-items: center;
  }
  .input-with-select {
    width: 600px;
  }
  img.pic {
    max-width: 57px;
    max-height: 57px;
    border-radius: 10px;
  }
  span.content {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .link {
    cursor: pointer;
  }
  .button-area {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .checkbox {
    margin-right: 20px;
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
