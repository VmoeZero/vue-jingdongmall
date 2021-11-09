import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Register.vue')
  },
  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "home" */ '@/views/My.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Setting.vue')
  },
  {
    path: '/setting-account',
    name:'SettingAccount',
    component: () => import(/* webpackChunkName: "home" */ '@/views/SettingAccount.vue')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Address.vue')
  },
  {
    path: '/address-edit',
    name: 'AddressEdit',
    component: () => import(/* webpackChunkName: "home" */ '@/views/AddressEdit.vue')
  },
  {
    path: '/category',
    name: 'category',
    component: () => import(/* webpackChunkName: "category" */ '@/views/Category.vue'),
    meta: {
      index: 1
    }
  }
  ,
  {
    path: '/product-list',
    name: 'product-list',
    component: () => import(/* webpackChunkName: "product-list" */ '@/views/ProductList.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import(/* webpackChunkName: "home" */ '@/views/ProductDetail.vue'),
    meta: {
      index: 3
    }
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: () => import(/* webpackChunkName: "cart" */ '@/views/ShopCart.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/create-order',
    name: 'Create-order',
    component: () => import(/* webpackChunkName: "create-order" */ '@/views/CreateOrder.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "order" */ '@/views/Order.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/order-detail',
    name: 'Order-detail',
    component: () => import(/* webpackChunkName: "order-detail" */ '@/views/OrderDetail.vue'),
    meta: {
      index: 3
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
