export default {
    // path 保证全局唯一
    path: '/system/user',
    component: () => import('./UserView.vue'),
    meta: { title: 'system-user' }
}
