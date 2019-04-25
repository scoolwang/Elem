<template>
  <div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>消息列表</el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="write-content">
      <div class="back-btn" @click="onBack">
        <span>返回列表</span>
      </div>

      <div class="title-wrap">
        <p class="title">{{info.title}}</p>
        <p class="time">{{info.create_at}}</p>
      </div>
      <div style="margin-top: 20px">
        <p class="content" v-for="item in info.content">{{item}}</p>
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
        id: '',
        info: {}
      }
    },
    components: {
    },
    methods: {
      onBack () {
        this.$router.push({
          name: 'notice/list'
        })
      },
      request () {
        api.post('notice/detail', {
          id: this.id
        }, (res) => {
          if (res.status === 200) {
            const data = res.data
            if (data.code === 0) {
              this.info = data.data
              this.info.content = this.info.content.split("\n")
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
      this.id = this.$route.query.id
      this.request()
    }
  }
</script>

<style scoped>
  @import '../../../css/common.css';
  .back-btn {
    width: 88px;
    height: 38px;
    border-radius: 3px;
    line-height: 34px;
    box-shadow: 0 1px 0 0 #EEEFF0, -1px 0 0 0 #EEEFF0, 1px 0 0 0 #EEEFF0, 0 1px 3px 0 rgba(190, 200, 214, 0.22), 0 2px 3px 0 rgba(190, 200, 214, 0.13), 0 -1px 0 0 #F8F9FA;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    color: #4488FF;
  }
  .back-btn:hover {
    transition: all .3s ease;
    box-shadow: 0 1px 3px 0 rgba(191, 200, 214, 0.22), 0 2px 3px 0 rgba(191, 200, 214, 0.13), 0 2px 20px 0 #EBEFF5;
  }
  .back-btn i {
    font-size: 14px;
    margin-right: 2px;
  }
  .back-btn span {
    font-size: 14px;
  }
  .title-wrap {
    border-bottom: 1px solid #eceeee;
  }
  .title {
    font-size: 18px;
    font-weight: normal;
    text-align: center;
    margin-bottom: 12px;
    color: rgb(104, 114, 140);
  }
  .time {
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    margin-bottom: 8px;
    color: rgb(104, 114, 140);
  }
  .content {
    margin: 5px 0;
    font-size: 14px;
    font-weight: normal;
    color: rgb(104, 114, 140);
    letter-spacing: 1px;
    word-spacing: 1px;
  }
</style>
