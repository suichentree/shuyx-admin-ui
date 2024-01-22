export default {
    // path 保证全局唯一
    path: '/system/menu',
    component: () => import('./MenuView.vue'),
    meta: { title: 'system-menu' }
}
