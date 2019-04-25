<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>消息列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="write-content">

      <el-table :data="tableData">
        <el-table-column prop="name" label="标题内容">
          <div slot-scope="scope">
            <span class="content link" @click="onDetail(scope.$index, scope.row)">{{ scope.row.title }}</span>
          </div>
        </el-table-column>
        <el-table-column prop="create_at" label="创建时间" width="200">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100">
          <div slot-scope="scope">
            <span class="content" v-if="scope.row.type == 0">消息</span>
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
      onCurrentChange (page) {
        this.requestList(page)
      },
      onDetail (index, row) {
        const item = this.tableData[index]
        this.$router.push({
          name: 'notice/detail',
          query: {
            id: item.record_id
          }
        })
      },
      requestList (page) {
        api.post('notice/list', {
          id: this.id,
          page: page
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.tableData = data.data.list
              this.pages = data.data.totalCount
              this.$store.commit('changeNoticeAllReaded', true)
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

</style>
