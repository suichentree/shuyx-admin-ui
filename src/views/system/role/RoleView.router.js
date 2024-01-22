export default {
    // path 保证全局唯一
    path: '/system/role',
    component: () => import('./RoleView.vue'),
    meta: { title: 'system-role' }
}
