<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>分发托管</el-breadcrumb-item>
      <el-breadcrumb-item>浏览记录</el-breadcrumb-item>
    </el-breadcrumb>

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
        <el-table-column prop="platform" label="平台">
        </el-table-column>
        <el-table-column prop="browser" label="浏览器">
        </el-table-column>
        <el-table-column prop="update_at" label="浏览时间" width="170">
        </el-table-column>
        <el-table-column prop="update_ip" label="浏览IP" width="170">
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
      addApp () {
        this.showUpload = true
      },
      onUploaded (id) {
        this.$router.push({
          name: 'disapp/createVersion',
          query: {
            upload_id: id,
            disapp_id: this.id
          }
        })
      },
      onCurrentChange (page) {
        this.requestList(page)
      },
      requestList (page) {
        api.post('disapp/version/lookrecord', {
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
    text-decoration: underline;
    cursor: pointer;
    color: black;
  }
  .link:hover {
    color: #4488FF;
  }
</style>
