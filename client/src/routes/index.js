import ListProduct from '@/components/ListProduct.vue'
import ProductDetail from '@/components/ProductDetail.vue'
import {createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  { path: '/', component: ListProduct },
  { path: '/:id', component: ProductDetail },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})  