<template>
  <div>

    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>充值订单</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb> -->

    <div class="write-content">

      <el-table :data="tableData">
        <el-table-column prop="record_id" label="订单号" width="300">
        </el-table-column>
        <el-table-column prop="subject" label="产品" width="140">
        </el-table-column>
        <el-table-column prop="value" label="具体配置" width="160">
          <div slot-scope="scope">
            <span class="content">{{ scope.row.value + scope.row.unit}}</span>
          </div>
        </el-table-column>
        <el-table-column prop="total" label="总价">
          <div slot-scope="scope">
            <span class="content">￥{{ scope.row.total }}</span>
          </div>
        </el-table-column>
        <el-table-column prop="pay_type" label="支付方式">
          <div slot-scope="scope">
            <span class="content">{{ scope.row.pay_type == 0 ? '支付宝' : '微信支付' }}</span>
          </div>
        </el-table-column>
        <el-table-column prop="create_at" label="创建时间" width="200">
        </el-table-column>
        <el-table-column prop="pay_at" label="支付时间" width="200">
        </el-table-column>
        <el-table-column prop="state" label="订单状态" width="100" fixed="right">
          <div slot-scope="scope">
            <span class="content" v-if="scope.row.state == 1">已支付</span>
            <span class="content" v-if="scope.row.state == 2">已关闭</span>
            <span class="content" v-if="scope.row.state == 3">过期</span>
            <span class="content" v-if="scope.row.state == 4">未支付</span>
          </div>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="pages"
          @current-change="onCurrentChange">
        </el-pagination>
        <p class="count">共{{pages}}条记录</p>
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
        tableData: null,
        pages: 0,
      }
    },
    components: {
    },
    methods: {
      onClose (index, row) {
        const item = this.tableData[index]
        api.post('order/close', {
          id: item.record_id
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$message.success('订单已关闭')
              this.requestList(1)
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      onCurrentChange (page) {
        this.requestList(page)
      },
      onDetail (index, row) {
        const item = this.tableData[index]
        this.$router.push({
          name: 'feedback/detail',
          query: {
            id: item.record_id
          }
        })
      },
      requestList (page) {
        api.post('order/list', {
          id: this.id,
          page: page
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.tableData = data.data.list
              this.pages = data.data.totalCount
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
      this.requestList(1)
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';
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
