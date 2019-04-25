<template>
  <div style="position: relative;">

    <a href="javascript:;" class="upload" :style="{'width': size.width + 'px', 'height': size.height + 'px', 'line-height': size.height + 'px'}">
      <span v-if="!value">+</span>
      <img class="upload-img" :src="preview_img" :style="{'width': size.width + 'px', 'height': size.height + 'px'}">
      <input id="input" type="file" class="upload-file" :style="{'width': size.width + 'px', 'height': size.height + 'px'}" @change="fileChange">
      <input type="text" ref="input" :value="value" @input="$emit('input', $event.target.value)" hidden>
    </a>

    <el-button style="margin-top: 10px;" size="mini" type="primary" @click="preview" v-if="showButton">查看大图</el-button>
  </div>
</template>

<script>
/* eslint-disable */
  import qcloud from '../../util/qcloud.js'
  import ossUpload from '../../util/ossUpload.js'

  export default {
    data () {
      return {
        preview_img: ''
      }
    },
    props: ['value', 'showButton', 'bucket', 'type'],
    computed: {
      size: function () {
        if (this.type == 'idcard') {
          return {
            width: 237,
            height: 150
          }
        } else if (this.type == 'launch') {
          return {
            width: 200,
            height: 256
          }
        } else {
          return {
            width: 150,
            height: 150
          }
        }
      }
    },
    methods: {
      fileChange (e) {
        var file = e.target.files[0]
        console.log(file)

        if (file.type != 'image/png' && file.type != 'image/jpeg') {
          this.$message.error('只支持上传PNG或JPG格式图片')
          return
        }

        if (file.size > 1024 * 1024 * 2) {
          this.$message.error('图片不能大于2M')
          return
        }

        var bucket = 'feicn-cdn'// 身份证bucket
        var dir = 'idcard'
        if (this.bucket == 'public') {
          bucket = 'feicn-public' //图片bucket
          dir = 'icon'
        }

        ossUpload(bucket, dir, file, {
          progressCallback: progress => {
            // console.log("progress: %j", progress)
          },
          sizeCallback: size => {
          },
          cancelCallback: cancel => {
          },
          doneCallback: res => {
            const windowURL = window.URL || window.webkitURL;
            if(file) {
              const dataURl = windowURL.createObjectURL(file);
              this.preview_img = dataURl
            }
            // console.log("done: %j", res)
            this.$message.success('照片已上传')
            this.$emit('input', res.res.objectName)
          }
        })

      },
      preview () {
        if (!this.value) {
          this.$message('请先上传图片')
        } else {
          this.$alert('<img src="' + this.value + '">', '查看大图', {
            dangerouslyUseHTMLString: true
          })
        }
      }
    },
    created: function () {
      setTimeout(() => {
        this.preview_img = this.value
      }, 200)
    }
  }
</script>

<style scoped>
  .avatar {
    display: block;
  }
  span {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  a.upload {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-decoration: none;
    text-indent: 0;
    text-align: center;
    font-size: 28px;
    color: #c0ccda;
    border: 1px dashed #c0ccda;
    /*border-radius: 6px;*/
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  a.upload:hover {
    border: 1px dashed #4488FF;
    color: #48f;
  }
  a.upload .upload-img {
  }
  a.upload .upload-img[src=""]{
    opacity: 0;
  }
  a.upload .upload-file {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }
  .el-message-box__message {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-message-box__message p img {
    height: 600px;
  }
</style>
