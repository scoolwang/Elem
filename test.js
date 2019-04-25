var _axios = require('axios')

_axios.post('http://localhost:5000/disapp/parse', {
  objectName: 'ipa/051d801422ea4bd596a5370b06f5cd78.ipa',
  token: '7fa8e669cb095a161bac132de34f79bf'
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})

_axios.post('http://localhost:5000/disapp/parse', {
  objectName: 'ipa/615bab53c0054c97a3dfe10407ece021.ipa',
  token: '7fa8e669cb095a161bac132de34f79bf'
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})

_axios.post('http://localhost:5000/disapp/parse', {
  objectName: 'ipa/a030f51cc6f44064b91e9657980693a0.apk',
  token: '7fa8e669cb095a161bac132de34f79bf'
}).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})
