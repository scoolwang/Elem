<template>
    <div class="bg">
		  <img class="img" src="../../images/icon-upload-white.png">
		  <span>{{text}}</span>
    </div>
</template>

<script>
	/* eslint-disable */
  export default {
    data () {
      return {
      }
    },
    props: ['text'],
    methods: {
    	created: function () {
    	}
    }
  }
</script>

<style scoped>
  .bg {
    background-color: #4488FF;
    border: 1px solid #4488FF;
    display: inline-block;
    padding: 12px 14px;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    font-size: 14px;
  }

  .bg:hover {
    background-color: #347EFF;
    -webkit-box-shadow: 0 2px 4px 0 rgba(153, 172, 204, 0.47), 0 2px 10px 0 rgba(68, 136, 255, 0.27) !important;
    box-shadow: 0 2px 4px 0 rgba(153, 172, 204, 0.47), 0 2px 10px 0 rgba(68, 136, 255, 0.27) !important;
  }

  .img {
  	width: 16px;
  	height: 16px;
  	display: inline-block;
  	transform: translateY(3px);
  }

</style>
