import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BasicLayout from '../layouts/BasicLayout.vue';
import BlankLayout from '../layouts/BlankLayout.vue';
import WelcomePage from '../views/WelcomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BasicLayout,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          meta: { title: '欢迎', icon: 'icon-icon-test' },
          component: WelcomePage,
        },
        {
          path: '/admins',
          name: 'admins',
          meta: { title: '管理页', icon: 'icon-tuijian', flat: true },
          component: BlankLayout,
          redirect: () => ({ name: 'page1' }),
          children: [
            {
              path: 'page-1',
              name: 'page1',
              meta: { title: 'OpenAI后台管理' },
              component: () => import('../views/admins/Index.vue'),
            },           
            {
              path: 'test-image',
              name: 'testimage',
              meta: { title: '图片测试' },
              component: () => import('../views/admins/test/TestImage.vue'),
            },
            {
              path: 'test-chat',
              name: 'testchat',
              meta: { title: '会话测试' },
              component: () => import('../views/admins/test/TestChat.vue'),
            },
            {
              path: 'cus-index',
              name: 'cusindex',
              meta: { title: '客户 - 列表' },
              component: () => import('../views/admins/cus/Index.vue'),
            },
          ]
        }
      ]
    },
    {
      path: '/adminlogin',
      name: 'login',
      meta: { title: '后台登录' },
      component: () => import('../views/admins/Login.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
