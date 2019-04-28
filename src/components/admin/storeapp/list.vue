<template>
  <div>

    <app-upload :show.sync="showUpload"></app-upload>

    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>代上架</el-breadcrumb-item>
      <el-breadcrumb-item>应用列表</el-breadcrumb-item>
    </el-breadcrumb> -->

    <p class="center-tip">暂未开放，敬请期待~</p>

  </div>
</template>

<script>
/* eslint-disable */
  import api from '../../../util/api.js'
  import appUpload from '../../common/appUpload.vue'
  import appUploadBtn from '../../common/appUploadBtn.vue'

  export default {
    data () {
      return {
        noticeType: '0',
        tableData: null,
        pages: 0,
        searchType: 'product_name',
        searchWords: '',
        showUpload: false
      }
    },
    components: {
      appUpload,
      appUploadBtn
    },
    methods: {
      addApp () {
        this.showUpload = true
      },
      onCurrentChange (page) {
        this.request(page)
      },
      request (page) {
        const size = 10
        // api.productList({
        //   page: page,
        //   size: size,
        //   searchType: this.searchType,
        //   searchWords: this.searchWords
        // }, (res) => {
        //   if (res.status === 200) {
        //     const data = res.data
        //     if (data.code === 0) {
        //       this.tableData = data.data.list
        //       this.pages = data.data.totalCount
        //     } else {
        //       this.$message(data.message)
        //     }
        //   } else {
        //     this.$message('请求超时')
        //   }
        // })
      },
      addProduct () {
        this.$router.push({
          name: 'addProduct'
        })
      },
      onEdit (index, row) {
        let data = this.tableData[index]
        console.log(data)
        let form = {
          productId: data.productId,
          name: data.name,
          price: data.price / 100,
          desc: data.desc,
          alipay_qrcode: data.alipay_qrcode,
          wechat_qrcode: data.wechat_qrcode,
          is_on_sell: data.is_on_sell + ''
        }
        // 跳转
        this.$router.push({
          name: 'addProduct',
          query: form
        })
      },
      onStock (index, row) {
        let data = this.tableData[index]
        // 跳转
        this.$router.push({
          name: 'stockList',
          query: {
            productId: data.productId
          }
        })
      },
      onDelete (index, row) {
        this.$confirm('删除商品会连库存一起删除，是否确定删除？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'default'
        }).then(() => {
          let data = this.tableData[index]
          api.deleteProduct({
            productId: data.productId
          }, (res) => {
            if (res.status === 200) {
              const data = res.data
              this.$message(data.message)
              this.request(1)
            } else {
              this.$message('请求超时')
            }
          })
        }).catch(() => {
        })
      },
      onSearch () {
        this.request(1)
      }
    },
    created: function () {
      this.request(1)
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';

  .top-pannel {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
  }
  .btn-wrap {
    display: flex;
    align-items: center;
  }
  .input-with-select {
    width: 600px;
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
    text-decoration: underline;
    cursor: pointer;
    color: black;
  }
  .link:hover {
    color: #4488FF;
  }
</style>
