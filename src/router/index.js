/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import miss from '@/components/common/404'
import admin from '@/components/admin/admin'
import reg from '@/components/common/reg'
import login from '@/components/common/login'
import forget from '@/components/common/forget'

import userInfo from '@/components/admin/user/info'
import userSetting from '@/components/admin/user/setting'
import userShare from '@/components/admin/user/share'

import disappList from '@/components/admin/disapp/list'
import disappVersions from '@/components/admin/disapp/versions'
import disappCreate from '@/components/admin/disapp/create'
import disappCreateVersion from '@/components/admin/disapp/createVersion'
import disappLook from '@/components/admin/disapp/look'
import disappDownload from '@/components/admin/disapp/download'
import disappUnion from '@/components/admin/disapp/union'

import signappList from '@/components/admin/signapp/list'
import signappRecordList from '@/components/admin/signapp/recordList'

import webappList from '@/components/admin/webapp/list'
import storeappList from '@/components/admin/storeapp/list'
import orderRecharge from '@/components/admin/order/recharge'
import orderList from '@/components/admin/order/list'

import noticeList from '@/components/admin/notice/list'
import noticeDetail from '@/components/admin/notice/detail'
import feedbackList from '@/components/admin/feedback/list'
import feedbackDetail from '@/components/admin/feedback/detail'
import feedbackCreate from '@/components/admin/feedback/create'

import packappList from '@/components/admin/packapp/list'
import packappCreate from '@/components/admin/packapp/create'

Vue.use(Router)

const dic = {
  routes: [
    {
      path: '/',
      title: '管理台',
      name: 'admin',
      component: admin,
      redirect: { name: 'user/info' },
      children: [
        {
          path: 'packapp/list',
          title: '',
          name: 'packapp/list',
          component: packappList
        },
        {
          path: 'packapp/create',
          title: '',
          name: 'packapp/create',
          component: packappCreate
        },
        {
          path: 'order/recharge',
          title: '',
          name: 'order/recharge',
          component: orderRecharge
        },
        {
          path: 'order/list',
          title: '',
          name: 'order/list',
          component: orderList
        },
        {
          path: 'user/info',
          title: '',
          name: 'user/info',
          component: userInfo
        },
        {
          path: 'user/setting',
          title: '',
          name: 'user/setting',
          component: userSetting
        },
        {
          path: 'user/share',
          title: '',
          name: 'user/share',
          component: userShare
        },
        {
          path: 'storeapp/List',
          title: '',
          name: 'storeapp/list',
          component: storeappList
        },
        {
          path: 'webapp/List',
          title: '',
          name: 'webapp/list',
          component: webappList
        },
        {
          path: 'signapp/list',
          title: '',
          name: 'signapp/list',
          component: signappList
        },
        {
          path: 'signapp/recordlist',
          title: '',
          name: 'signapp/recordlist',
          component: signappRecordList
        },
        {
          path: 'disapp/create',
          title: '',
          name: 'disapp/create',
          component: disappCreate
        },
        {
          path: 'disapp/createVersion',
          title: '',
          name: 'disapp/createVersion',
          component: disappCreateVersion
        },
        {
          path: 'disapp/list',
          title: '',
          name: 'disapp/list',
          component: disappList
        },
        {
          path: 'disapp/versions',
          title: '',
          name: 'disapp/versions',
          component: disappVersions
        },
        {
          path: 'disapp/look',
          title: '',
          name: 'disapp/look',
          component: disappLook
        },
        {
          path: 'disapp/download',
          title: '',
          name: 'disapp/download',
          component: disappDownload
        },
        {
          path: 'disapp/union',
          title: '',
          name: 'disapp/union',
          component: disappUnion
        },
        {
          path: 'orderList',
          name: 'orderList',
          component: orderList
        },
        {
          path: 'notice/list',
          name: 'notice/list',
          component: noticeList
        },
        {
          path: 'notice/detail',
          name: 'notice/detail',
          component: noticeDetail
        },
        {
          path: 'feedback/list',
          name: 'feedback/list',
          component: feedbackList
        },
        {
          path: 'feedback/detail',
          name: 'feedback/detail',
          component: feedbackDetail
        },
        {
          path: 'feedback/create',
          name: 'feedback/create',
          component: feedbackCreate
        }
      ]
    },
    {
      path: '/login',
      title: '登录',
      name: 'login',
      component: login
    },
    {
      path: '/reg',
      title: '注册',
      name: 'reg',
      component: reg
    },
    {
      path: '/forget',
      title: '',
      name: 'forget',
      component: forget
    },
    {
      path: '/miss',
      component: miss,
      name: 'miss',
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { name: 'miss' }
    },
    {
      meta: {
        title: '首页'
      },
      path: '/',
      hidden: true,
      redirect: { name: 'user/info' }
    }
  ],
  mode: 'history'
}

export default new Router(dic)
