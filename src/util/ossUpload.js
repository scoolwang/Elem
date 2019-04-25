/* eslint-disable */
import api from './api.js'
import axios from 'axios'
var uuid = require('../util/uuid.js')

function getFileSuffix (filename) {
  var index1 = filename.lastIndexOf(".");
  var index2 = filename.length;
  var suffix = filename.substring(index1+1, index2);
  if (suffix) {
    return '.' + suffix
  } else {
    return ''
  }
}

function getsign(data) {
  return new Promise((resolve, reject) => {
    api.post('oss/getsign', data, (res) => {
      if (res.status === 200) {
        // console.log(res)
        resolve(res)
      } else {
        reject(res)
      }
    })
  })
}

function upload(bucket, dir, data, callback) {
  var fileName = uuid() + getFileSuffix(data.name)

  getsign({
    bucket: bucket,
    dir: dir
  })
  .then(res => {
    res = res.data.data
    // console.log("res:%j", res)

    new Promise((resolve, reject) => {
      // console.log(data)

      var obj = {}
      obj.host = res.host
      obj.key = res.dir + '/' + fileName
      obj.policy = res.policy
      obj.Signature = res.signature
      obj.callback = res.callback
      obj.OSSAccessKeyId = res.accessid

      let formData = new FormData()
      for (let key in obj) {
        formData.append(key, obj[key])
      }
      //append 文件必须放在最后，不然会报key错误
      formData.append("file", data)

      // console.log(formData)

      const CancelToken = axios.CancelToken

      axios({
        cancelToken: new CancelToken(function executor(c) {
          if (callback.cancelCallback) {
            callback.cancelCallback(c)
          }
        }),
        url: res.host,
        method: 'post',
        onUploadProgress: function(progressEvent) {
          if (progressEvent.lengthComputable){
            var progress = progressEvent.loaded / progressEvent.total * 100
            progress = progress.toFixed(0);

            if (callback.progressCallback) {
              callback.progressCallback(progress)
            }

            if (callback.sizeCallback) {
              var size = progressEvent.total / 1024 / 1024
              size = size.toFixed(1)
              if (size == 0.0) {
                size = 0.1
              }
              callback.sizeCallback(size)
            }

            if (progress == 100) {
            }
          }
        },
        data: formData
      }).then(res => {
        // console.log("res:%j", res)
        if (callback.doneCallback) {
          callback.doneCallback({
            isSuccess: true,
            res: {
              objectName: dir + '/' +  fileName
            }
          })
        }
      })
    })
  })
  .catch(e => {
    if (callback.doneCallback) {
      callback.doneCallback({
        isSuccess: false,
        res: e
      })
    }
    // console.log("e:%j", e)
  })
}

export default upload
