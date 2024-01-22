export default {
    // path 保证全局唯一
    path: '/system/org',
    component: () => import('./OrgView.vue'),
    meta: { title: 'system-org' }
}
