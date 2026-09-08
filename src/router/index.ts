import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'Impact Medical Logistics | Precision Surgical Courier, Nationwide' },
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('@/views/ServicesView.vue'),
      meta: { title: 'Services | Impact Medical Logistics' },
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('@/views/PricingView.vue'),
      meta: { title: 'Pricing | Impact Medical Logistics' },
    },
    {
      path: '/platform',
      name: 'platform',
      component: () => import('@/views/PlatformView.vue'),
      meta: { title: 'Platform | Impact Medical Logistics' },
    },
    {
      path: '/compliance',
      name: 'compliance',
      component: () => import('@/views/ComplianceView.vue'),
      meta: { title: 'Compliance | Impact Medical Logistics' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: 'About | Impact Medical Logistics' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: { title: 'Contact | Impact Medical Logistics' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'Page Not Found | Impact Medical Logistics' },
    },
  ],
})

router.afterEach((to) => {
  const title = to.meta.title
  if (typeof title === 'string') document.title = title
})

export default router
