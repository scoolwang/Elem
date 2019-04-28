<template>
  <div>

    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>证书签名</el-breadcrumb-item>
      <el-breadcrumb-item>签名记录</el-breadcrumb-item>
    </el-breadcrumb> -->

    <div class="write-content">

      <el-table :data="tableData">
        <el-table-column prop="icon" label="应用图标">
          <div slot-scope="scope">
            <img class="pic" :src="scope.row.icon" onerror="src='http://public.hiapp.net/src/image/logo-hi.png'">
          </div>
        </el-table-column>
        <el-table-column prop="name" label="应用名称">
          <div slot-scope="scope">
            <span class="content">{{ scope.row.name }}</span>
          </div>
        </el-table-column>
        <el-table-column prop="version" label="版本号">
        </el-table-column>
        <el-table-column prop="size" label="文件大小">
          <div slot-scope="scope">
            <span class="content">{{ scope.row.size }}MB</span>
          </div>
        </el-table-column>
        <el-table-column prop="create_at" label="创建时间" width="170">
        </el-table-column>
        <el-table-column prop="bundle_id" label="Bundle Id" width="170">
          <div slot-scope="scope">
            <span class="content">{{ scope.row.bundle_id }}</span>
          </div>
        </el-table-column>
        <el-table-column prop="type" label="签名类型">
          <div slot-scope="scope">
            <span class="content" v-if="scope.row.type == 'sign'">新签名</span>
            <span class="content" v-if="scope.row.type == 'resign'">重签</span>
            <span class="content" v-if="scope.row.type == 'signver'">更新应用</span>
          </div>
        </el-table-column>
        <el-table-column prop="state" label="签名状态">
          <div slot-scope="scope">
            <span class="content" v-if="scope.row.state == '0'">失败</span>
            <span class="content" v-if="scope.row.state == '1'">成功</span>
            <span class="content" v-if="scope.row.state == '2'">队列中</span>
            <span class="content" v-if="scope.row.state == '3'">处理中</span>
            <span class="content" v-if="scope.row.state == '4'">上传中</span>
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
        api.post('signapp/recordlist', {
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
