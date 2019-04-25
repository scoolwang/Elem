<template>
  <div class="container">
    <div class="wrap">
      <div>
        <img class="img" src="../../images/404.png">
      </div>
      <div class="text-wrap">
        <span>您可以选择前往</span>
        <span class="link" @click="onclick('login')">登录</span>
        <span>或</span>
        <span class="link" @click="onclick('user/info')">管理台</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  div.container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  div.wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .img {
    width: 400px;
  }
  .text-wrap {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  span {
    font-size: 17px;
    color: rgb(104, 114, 140);
    padding: 0 2px;
  }
  span.link {
    cursor: pointer;
    color: #347EFF;
  }
</style>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      onclick (value) {
        this.$router.push({
          name: value
        })
      }
    },
    created: function () {
    }
  }
</script>
