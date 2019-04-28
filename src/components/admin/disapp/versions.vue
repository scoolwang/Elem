<template>
  <div>

    <app-upload :show.sync="showUpload" :accept="uploadPlatfrom" @uploaded="onUploaded"></app-upload>

    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>分发托管</el-breadcrumb-item>
      <el-breadcrumb-item>应用概览</el-breadcrumb-item>
      <el-breadcrumb-item>应用版本</el-breadcrumb-item>
    </el-breadcrumb> -->

    <div class="button-area">
      <div class="btn-wrap">
        <appUploadBtn text="上传新版本" @click.native='addApp'></appUploadBtn>
      </div>
    </div>

    <div class="write-content">

      <el-table :data="tableData">
        <el-table-column prop="icon" label="应用图标">
          <div slot-scope="scope">
            <img class="pic" :src="scope.row.icon" onerror="src='http://public.hiapp.net/src/image/logo-hi.png'">
          </div>
        </el-table-column>
        <el-table-column prop="name" label="应用ID" width="300">
          <div slot-scope="scope">
            <span class="content">{{ scope.row.record_id }}</span>
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
        <el-table-column prop="update_intro" label="版本说明" width="150">
          <div slot-scope="scope">
            <span class="content">{{ scope.row.update_intro }}</span>
          </div>
        </el-table-column>
        <el-table-column label="操作" width="170" fixed="right">
          <div slot-scope="scope">
            <el-button
            size="small"
            type="primary"
            plain
            round
            @click="onEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              plain
              round
              @click="onDelete(scope.$index, scope.row)"
              :disabled="scope.row.enable === '0'">删除
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
  import appUpload from '../../common/appUpload.vue'
  import appUploadBtn from '../../common/appUploadBtn.vue'

  export default {
    data () {
      return {
        showUpload: false,
        id: '',
        tableData: null,
        pages: 0,
        uploadPlatfrom: ''
      }
    },
    components: {
      appUpload,
      appUploadBtn
    },
    methods: {
      addApp () {
        console.log(this.tableData)
        if (this.tableData && this.tableData.length > 0) {
          if (this.tableData[0]['platform'] == 'ios') {
            this.uploadPlatfrom = 'ipa'
          } else {
            this.uploadPlatfrom = 'apk'
          }
          this.showUpload = true
        }
      },
      onUploaded (id) {
        this.$router.push({
          name: 'disapp/createVersion',
          query: {
            action: 'update',
            upload_id: id,
            disapp_id: this.id
          }
        })
      },
      onCurrentChange (page) {
        this.requestList(page)
      },
      onEdit (index, row) {
        const item = this.tableData[index]
        this.$router.push({
          name: 'disapp/createVersion',
          query: {
            action: 'edit',
            version_id: item.record_id,
            disapp_id: this.id
          }
        })
      },
      onDelete (index, row) {
        this.$confirm('是否确定删除此版本？', '提醒', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          const item = this.tableData[index]
          api.post('disapp/version/delete', {
            id: item.record_id
          }, (res) => {
            if (res.status === 200) {
              const data = res.data
              if (data.code === 0) {
                this.$message.success(data.message)
                this.requestList(1)
              } else {
                this.$message.error(data.message)
              }
            } else {
              this.$message.error(res)
            }
          })
        }).catch(() => {
        })
      },
      requestList (page) {
        api.post('disapp/version/list', {
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
      if (this.$route.query && this.$route.query.id) {
        this.id = this.$route.query.id
        this.requestList(1)
      }
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
    width: 57px;
    height: 57px;
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
