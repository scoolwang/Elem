<template>
  <div>
    <wechat-pay :show.sync="showWechatPay" :qrcode="wechatPayQrcode"></wechat-pay>

    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>充值订单</el-breadcrumb-item>
      <el-breadcrumb-item>购买</el-breadcrumb-item>
    </el-breadcrumb> -->

    <div class="tip-container">
      <div class="tip-icon-wrap">
        <span class="fas fa-bell"></span>
      </div>
      <p>
        部分证书暂停销售；<b>独享证书</b> 稳定签名中，红包类 App 请勿购买，一经发现直接冻结不予退款。
      </p>
    </div>

    <div class="write-content">
      <el-tabs v-model="productType" @tab-click="onRequestPrice">
        <el-tab-pane label="分发" name="0">
          <div class="cell-container">
            <div class="product-cell product-cell-dispatch" :class="[dispatch_index == index ? 'product-cell-checked' : '']" v-for="(item, index) in dispatch_products" @click="onSelectDispatch(index)">
              <div class="title" :class="[dispatch_index == index ? 'title-checked' : '']">
                <span>{{formatNum(item.value) + item.unit}}</span>
                <i :class="[dispatch_index == index ? 'fas fa-check-circle icon-checked' : 'far fa-circle']"></i>
              </div>
              <div class="discount-tip-wrap">
                <span class="discount-tip" :class="[item.discount_price / item.price < 1 ? '' : 'discount-tip-hidden']">立享{{getDiscount(item)}}折优惠</span>
              </div>
              <div class="bottom-wrap">
                <div class="origin-price-wrap">
                  <span class="origin-price">￥{{item.price}}</span>
                </div>
                <div class="price-wrap">
                  <span class="price-unit">￥</span>
                  <span class="price-value">{{item.discount_price}}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="product-tip">* 应用大小每 20M，扣1下载点（如：19M 扣1点，39M 扣2点）</p>
            <p class="product-tip">* 无过期时间</p>
            <p class="product-tip">* 最大支持 1.5G 文件</p>
          </div>
        </el-tab-pane>

        <el-tab-pane label="共享证书签名" name="1">
          <div class="cell-container">
            <div class="product-cell product-cell-sign" :class="[sign_index == index ? 'product-cell-checked' : '']" v-for="(item, index) in sign_products" @click="onSelectSign(index)">
              <div class="title" :class="[sign_index == index ? 'title-checked' : '']">
                <span>{{item.value + item.unit}}</span>
                <i :class="[sign_index == index ? 'fas fa-check-circle icon-checked' : 'far fa-circle']"></i>
              </div>
              <div class="discount-tip-wrap">
                <span class="discount-tip" :class="[item.discount_price / item.price < 1 ? '' : 'discount-tip-hidden']">立享{{getDiscount(item)}}折优惠</span>
              </div>
              <div class="bottom-wrap">
                <div class="origin-price-wrap">
                  <span class="origin-price">￥{{item.price}}</span>
                </div>
                <div class="price-wrap">
                  <span class="price-unit">￥</span>
                  <span class="price-value">{{item.discount_price}}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="product-tip">* 免上架 AppStore</p>
            <p class="product-tip">* 自动对任意扩展名的 dylib 签名</p>
            <p class="product-tip">* 24小时自助签名</p>
            <p class="product-tip">* 免费补签</p>
            <p class="product-tip">* 免费更新</p>
          </div>
        </el-tab-pane>

        <el-tab-pane label="独立证书签名" name="2">
          <div class="cell-container">
            <div class="product-cell product-cell-pro-sign" :class="[pro_sign_index == index ? 'product-cell-checked' : '']" v-for="(item, index) in pro_sign_products" @click="onSelectProSign(index)">
              <div class="title" :class="[pro_sign_index == index ? 'title-checked' : '']">
                <span>{{item.value + item.unit}}</span>
                <i :class="[pro_sign_index == index ? 'fas fa-check-circle icon-checked' : 'far fa-circle']"></i>
              </div>
              <div class="discount-tip-wrap">
                <span class="discount-tip" :class="[item.discount_price / item.price < 1 ? '' : 'discount-tip-hidden']">立享{{getDiscount(item)}}折优惠</span>
              </div>
              <div class="bottom-wrap">
                <div class="origin-price-wrap">
                  <span class="origin-price">￥{{item.price}}</span>
                </div>
                <div class="price-wrap">
                  <span class="price-unit">￥</span>
                  <span class="price-value">{{item.discount_price}}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="product-tip">* 免上架 AppStore</p>
            <p class="product-tip">* 自动对任意扩展名的 dylib 签名</p>
            <p class="product-tip">* 24小时自助签名</p>
            <p class="product-tip">* 免费补签</p>
            <p class="product-tip">* 免费更新</p>
            <p class="product-tip red">* 稳定性更强</p>
          </div>
        </el-tab-pane>

        <el-tab-pane label="独享证书签名" name="3">
          <div class="cell-container">
            <div class="product-cell product-cell-pro-sign" :class="[ex_sign_index == index ? 'product-cell-checked' : '']" v-for="(item, index) in ex_sign_products" @click="onSelectExSign(index)">
              <div class="title" :class="[ex_sign_index == index ? 'title-checked' : '']">
                <span>{{item.value + item.unit}}</span>
                <i :class="[ex_sign_index == index ? 'fas fa-check-circle icon-checked' : 'far fa-circle']"></i>
              </div>
              <div class="discount-tip-wrap">
                <span class="discount-tip" :class="[item.discount_price / item.price < 1 ? '' : 'discount-tip-hidden']">立享{{getDiscount(item)}}折优惠</span>
              </div>
              <div class="bottom-wrap">
                <div class="origin-price-wrap">
                  <span class="origin-price">￥{{item.price}}</span>
                </div>
                <div class="price-wrap">
                  <span class="price-unit">￥</span>
                  <span class="price-value">{{item.discount_price}}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p class="product-tip">* 免上架 AppStore</p>
            <p class="product-tip">* 自动对任意扩展名的 dylib 签名</p>
            <p class="product-tip">* 24小时自助签名</p>
            <p class="product-tip">* 免费补签</p>
            <p class="product-tip">* 免费更新</p>
            <p class="product-tip red">* 独家证书</p>
            <p class="product-tip red">* QQ微信抢红包应用禁止使用，一经发现冻结应用且不予退款</p>
          </div>
        </el-tab-pane>

        <!--<el-tab-pane label="签名应用更新" name="3">-->
          <!--<div class="cell-container">-->
            <!--<div class="product-cell product-cell-update" :class="[update_index == index ? 'product-cell-checked' : '']" v-for="(item, index) in update_products" @click="onSelectUpdate(index)">-->
              <!--<div class="title" :class="[update_index == index ? 'title-checked' : '']">-->
                <!--<span>更新{{item.value + item.unit}}</span>-->
                <!--<i :class="[update_index == index ? 'fas fa-check-circle icon-checked' : 'far fa-circle']"></i>-->
              <!--</div>-->
              <!--<div class="discount-tip-wrap">-->
                <!--<span class="discount-tip" :class="[item.discount_price / item.price < 1 ? '' : 'discount-tip-hidden']">立享{{getDiscount(item)}}折优惠</span>-->
              <!--</div>-->
              <!--<div class="bottom-wrap">-->
                <!--<div class="origin-price-wrap">-->
                  <!--<span class="origin-price">￥{{item.price}}</span>-->
                <!--</div>-->
                <!--<div class="price-wrap">-->
                  <!--<span class="price-unit">￥</span>-->
                  <!--<span class="price-value">{{item.discount_price}}</span>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div>-->
            <!--<p class="product-tip">* 同时支持对用共享证书或独立证书签名的应用更新</p>-->
          <!--</div>-->
        <!--</el-tab-pane>-->

      </el-tabs>

      <el-tabs v-model="paymentType">
        <el-tab-pane class="cell-container" label="支付方式" name="0">

          <div class="payment" @click="onSelectPayment(0)">
            <div class="payment-check-wrap">
              <i :class="[payment == 0 ? 'fas fa-check-circle payment-check payment-check-on' : 'far fa-circle payment-check']"></i>
            </div>
            <div class="payment-image-wrap">
              <img class="payment-image" src="http://public.hiapp.net/src/image/alipay.png" alt="">
            </div>
          </div>

          <div class="payment" @click="onSelectPayment(1)">
            <div class="payment-check-wrap">
              <i :class="[payment == 1 ? 'fas fa-check-circle payment-check payment-check-on' : 'far fa-circle payment-check']"></i>
            </div>
            <div class="payment-image-wrap">
              <img class="payment-image" src="http://public.hiapp.net/src/image/wechatpay.png" alt="">
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>

      <div style="display: flex; margin-bottom: 20px;">
        <div class="button-area">
          <div class="big-button" @click='onPay'>
            <i class="fas fa-shopping-cart"></i>
            <span>支付￥{{useRMB}}</span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
/* eslint-disable */
  import api from '../../../util/api.js'
  import wechatPay from '../../common/wechatPay.vue'

  export default {
    data () {
      return {
        productType: 0,
        paymentType: 0,
        payment: 0,
        dispatch_index: 0,
        sign_index: 0,
        pro_sign_index: 0,
        ex_sign_index: 0,
        update_index: 0,
        dispatch_products: [],
        sign_products: [],
        pro_sign_products: [],
        ex_sign_products: [],
        update_products: [],
        usePoints: 0,
        useRMB: 0,
        showWechatPay: false,
        wechatPayQrcode: ''
      }
    },
    components: {
      wechatPay
    },
    methods: {
      formatNum(s) {
        var type = false
        if (/[^0-9\.]/.test(s))
          return "0.00";
        if (s == null || s == "null" || s == "")
          return "0.00";
        s = s.toString().replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s))
          s = s.replace(re, "$1,$2");
        s = s.replace(/,(\d\d)$/, ".$1");
        if (type == 0) {
          var a = s.split(".");
          if (a[1] == "00") {
            s = a[0];
          }
        }
        return s;
      },
      getDiscount (item) {
        var discount = item.discount_price / item.price * 10
        discount = discount.toFixed(1)
        return discount.replace('.0', '')
      },
      onRequestPrice () {
        var id;
        if (this.productType == 0) {
          id = this.dispatch_products[this.dispatch_index].record_id
        }
        if (this.productType == 1) {
          id = this.sign_products[this.sign_index].record_id
        }
        if (this.productType == 2) {
          id = this.pro_sign_products[this.pro_sign_index].record_id
        }
        if (this.productType == 3) {
          id = this.ex_sign_products[this.ex_sign_index].record_id
        }


        api.post('product/price', {
          id: id
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.useRMB = data.data.need_rmb
              this.usePoints = data.data.need_points
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      onSelectPayment (index) {
        this.payment = index
      },
      onPay () {
        var id;
        if (this.productType == 0) {
          id = this.dispatch_products[this.dispatch_index].record_id
        }
        if (this.productType == 1) {
          id = this.sign_products[this.sign_index].record_id
        }
        if (this.productType == 2) {
          id = this.pro_sign_products[this.pro_sign_index].record_id
        }
        if (this.productType == 3) {
          id = this.ex_sign_products[this.ex_sign_index].record_id
        }

        api.post('product/buy', {
          id: id,
          payment: this.payment
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              if (data.data.type == 'points') {
                this.$message.success('购买成功')
                this.$router.push({
                  name: 'order/list'
                })
              } else if (data.data.type == 'wechat') {
                this.wechatPayQrcode = data.data.wechat_qrcode
                this.showWechatPay = true
              } else if (data.data.type == 'alipay') {
                location.href = data.data.alipay_url
              }

            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      onSelectDispatch (index) {
        this.dispatch_index = index
        this.onRequestPrice()
      },
      onSelectSign (index) {
        this.sign_index = index
        this.onRequestPrice()
      },
      onSelectProSign (index) {
        this.pro_sign_index = index
        this.onRequestPrice()
      },
      onSelectExSign (index) {
        this.ex_sign_index = index
        this.onRequestPrice()
      },
      onSelectUpdate (index) {
        this.update_index = index
        this.onRequestPrice()
      },
      request () {
        api.post('products', {}, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.dispatch_products = data.data.dispatch
              this.sign_products = data.data.sign
              this.pro_sign_products = data.data.pro_sign
              this.ex_sign_products = data.data.ex_sign
              this.update_products = data.data.update
              this.onRequestPrice()
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
      if (this.$route.query.tab) {
        this.productType = this.$route.query.tab + ''
      }
      this.request()
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';

  .red {
    color: red !important;
    opacity: 0.9;
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
  .el-tabs {
    padding: 0;
    margin-bottom: 20px;
  }
  .cell-container {
    display: flex;
    /*min-width: 1000px;*/
    flex-wrap: wrap;
  }
  .product-cell {
    margin: 16px 16px 20px 10px;
    width: 160px;
    padding: 14px 14px;
    /*background-color: white;*/
    border-radius: 14px;
    /*border: 1px solid white;*/
    -webkit-box-shadow: 0 6px 26px 0 rgba(18,18,49,.3);
    box-shadow: 0 6px 26px 0 rgba(18,18,49,.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
  }
  .product-cell-dispatch {
    /*background-image: linear-gradient(-36deg, rgb(61,128,245), rgb(100,170,255));*/
    background-image: linear-gradient(-36deg, rgb(23, 31, 38), rgb(70,81,98));
  }
  .product-cell-sign {
    /*background-image: linear-gradient(-36deg, rgb(70,58,243), #4488FF);*/
    background-image: linear-gradient(-36deg, rgb(23, 31, 38), rgb(70,81,98));
  }
  .product-cell-pro-sign {
    background-image: linear-gradient(-36deg, rgb(23, 31, 38), rgb(70,81,98));
  }
  .product-cell-update {
    /*background-image: linear-gradient(-36deg, rgb(66,55,202), rgb(126,100,255));*/
    background-image: linear-gradient(-36deg, rgb(23, 31, 38), rgb(70,81,98));
  }
  .product-cell:hover {
    -webkit-box-shadow: 0 18px 30px 0 rgba(18,18,49,.14);
    box-shadow: 0 18px 30px 0 rgba(18,18,49,.14);
    transition: all .3s;
  }
  .product-cell-checked {
    /*border: 1px solid #4488FF;*/
  }
  .icon-checked {
    /*color: #4488FF;*/
    color: white;
  }
  .title {
    font-weight: 600;
    /*color: #B3B8C5;*/
    color: white;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    line-height: 24px;
    margin-bottom: 10px;
  }
  .title-checked {
    /*color: #4488FF;*/
    color: white;
  }
  .price-wrap {
    /*color: rgb(251, 58, 44);*/
    color: rgb(255, 138, 0);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-weight: 900;
  }
  .price-unit {
    font-size: 14px;
    margin-bottom: -5px;
  }
  .price-value {
    font-size: 28px;
  }
  .origin-price-wrap {
    display: flex;
    align-items: flex-end;
    margin-bottom: -4px;
    padding-right: 6px;
  }
  .origin-price {
    font-size: 12px;
    color: rgb(200,200,200);
    text-decoration: line-through;
  }
  .bottom-wrap {
    display: flex;
    justify-content: flex-end;
    line-height: 24px;
  }
  .discount-tip-wrap {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
  }
  .discount-tip {
    background-color: white;
    color: rgb(33,33,48);
    font-size: 10px;
    padding: 2px 4px;
    border-radius: 3px;
  }
  .discount-tip-hidden {
    background-color: rgba(0,0,0,0);
    color: rgba(0,0,0,0);
  }

  .product-tip {
    color: rgb(104, 114, 140);
    font-size: 14px;
    line-height: 22px;
    margin: 0;
  }

  .payment {
    display: flex;
    height: 40px;
    line-height: 40px;
    margin-right: 30px;
    padding: 20px 0;
    cursor: pointer;
  }
  .payment-check-wrap {
    padding: 0 8px;
  }
  .payment-check {
    font-size: 18px;
    color: #B3B8C5;
  }
  .payment-check-on {
    color: #4488FF;
  }
  .payment-image-wrap {
    display: flex;
    align-items: center;
  }
  .payment-image {
    height: 28px;
  }

  .hibei-text {
    color: rgb(104, 114, 140);
    font-size: 14px;
    padding: 0 8px 0 8px;
  }
  .info-icon {
    color: rgba(68,136,255,.4);
    font-size: 14px;
    cursor: pointer;
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
