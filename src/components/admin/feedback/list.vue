<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>工单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="button-area">
      <div class="big-button" @click='addFeedback'>
        <span>创建</span>
      </div>
    </div>

    <div class="write-content">

      <el-table :data="tableData">
        <el-table-column prop="name" label="标题内容">
          <div slot-scope="scope">
            <span class="content link" @click="onDetail(scope.$index, scope.row)">{{ scope.row.title }}</span>
          </div>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
          <div slot-scope="scope">
            <span class="content" v-if="scope.row.type == 0">咨询</span>
            <span class="content" v-if="scope.row.type == 1">建议</span>
          </div>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="100">
          <div slot-scope="scope">
            <span class="content" v-if="scope.row.state == 0">已结单</span>
            <span class="content" v-if="scope.row.state == 1">等待回复</span>
            <span class="content text-green" v-if="scope.row.state == 2">已回复</span>
            <span class="content" v-if="scope.row.state == 3">超时关闭</span>
            <span class="content" v-if="scope.row.state == 4">已关闭</span>
          </div>
        </el-table-column>
        <el-table-column prop="create_at" label="创建时间" width="200">
        </el-table-column>
        <el-table-column prop="update_at" label="最后回复时间" width="200">
        </el-table-column>
        <el-table-column label="操作" width="100">
          <div slot-scope="scope">
            <el-button
              v-if="scope.row.state != '0' && scope.row.state != '4'"
              size="small"
              type="primary"
              plain
              round
              @click="onClose(scope.row.record_id)">结单
            </el-button>
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
      onClose (id) {
        api.post('feedback/close', {
          id: id
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.$message.success('已结单')
              this.requestList(1)
            } else {
              this.$message.error(data.message)
            }
          } else {
            this.$message.error(res)
          }
        })
      },
      addFeedback () {
        this.$router.push({
          name: 'feedback/create'
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
        api.post('feedback/list', {
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
  .text-green {
    color: red;
    opacity: 0.6;
  }

</style>
