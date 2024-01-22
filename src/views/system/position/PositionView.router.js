export default {
    // path 保证全局唯一
    path: '/system/position',
    component: () => import('./PositionView.vue'),
    meta: { title: 'system-position' }
}
