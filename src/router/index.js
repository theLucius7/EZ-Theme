const Dashboard = () => import('@/views/dashboard/Dashboard.vue');
import { createRouter, createWebHashHistory } from 'vue-router';
import { SITE_CONFIG, DEFAULT_CONFIG, isBrowserRestricted, TRAFFICLOG_CONFIG, isXiaoV2board, AUTH_LAYOUT_CONFIG } from '@/utils/baseConfig';
import i18n from '@/i18n';
import pageCache from '@/utils/pageCache';

const LandingPage = () => import('@/views/landing/LandingPage.vue');
const CustomLandingPage = () => import('@/views/landing/CustomLandingPage.vue');
const ApiValidation = () => import('@/views/errors/ApiValidation.vue');

const getAuthComponent = (componentName) => {
  const layoutType = AUTH_LAYOUT_CONFIG?.layoutType || 'center';
  return () => import(`@/views/auth/${layoutType}/${componentName}.vue`);
};

const Login = getAuthComponent('Login');
const Register = getAuthComponent('Register');
const ForgotPassword = getAuthComponent('ForgotPassword');
const Dashboard = () => import('@/views/dashboard/Dashboard.vue');
const MainBoard = () => import('@/views/layout/MainBoard.vue');
const Profile = () => import('@/views/profile/UserProfile.vue');
const BrowserRestricted = () => import('@/views/errors/BrowserRestricted.vue');
const NotFound = () => import('@/views/errors/NotFound.vue');
const CustomerService = () => import('@/views/service/CustomerService.vue');
  {
    path: '/browser-restricted',

    path: '/api-validation',
    name: 'ApiValidation',
    component: ApiValidation,
    meta: {
      titleKey: 'common.apiChecking',
      requiresAuth: false
    }
  },
  {
    path: '/landing',
    name: 'Landing',
    component: getCustomOrDefaultLandingPage(),
    meta: {
      titleKey: 'landing.mainText',
      requiresAuth: false
    },
    beforeEnter: (to, from, next) => {
      if (!DEFAULT_CONFIG.enableLandingPage) {
        next('/login');
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      titleKey: 'common.login',
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      titleKey: 'common.register',
      requiresAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      titleKey: 'common.forgotPassword',
      requiresAuth: false,
      keepAlive: true
    }
  },
  {
    path: '/browser-restricted',
    name: 'BrowserRestricted',
    component: BrowserRestricted,
    meta: {
      titleKey: 'errors.browserRestricted',
      requiresAuth: false
    }
  },
  {
    path: '/customer-service',
    name: 'CustomerService',
    component: CustomerService,
    meta: {
      titleKey: 'service.title',
      requiresAuth: false 
    }
  },
  {
    path: '/',
    component: MainBoard,
    meta: { 
      requiresAuth: true 
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          titleKey: 'menu.dashboard',
          requiresAuth: true,
          keepAlive: true
        }
      },
      {
        path: 'shop',
        name: 'Shop',
        component: () => import('@/views/shop/Shop.vue'),
        meta: {
          titleKey: 'menu.shop',
          requiresAuth: true,
          keepAlive: true
        }
      },
      {
        path: 'order-confirm',
        name: 'OrderConfirm',
        component: () => import('@/views/shop/OrderConfirm.vue'),
        meta: {
          titleKey: 'orders.confirmOrder',
          requiresAuth: true,
          activeNav: 'Shop' 
        }
      },
      {
        path: 'payment',
        name: 'Payment',
        component: () => import('@/views/shop/Payment.vue'),
        meta: {
          titleKey: 'orders.payment',
          requiresAuth: true,
          activeNav: 'Shop' 
        }
      },
      {
        path: 'invite',
        name: 'Invite',
        component: () => import('@/views/invite/Invite.vue'),
        meta: {
          titleKey: 'menu.invite',
          requiresAuth: true,
          keepAlive: true
        }
      },
      {
        path: 'more',
        name: 'More',
        component: () => import('@/views/more/MoreOptions.vue'),
        meta: {
          titleKey: 'menu.more',
          requiresAuth: true
        }
      },
      {
        path: 'docs',
        name: 'Docs',
        component: () => import('@/views/docs/DocsPage.vue'),
        meta: {
          titleKey: 'more.viewHelp',
          requiresAuth: true,
          activeNav: 'More' 
        }
      },
      {
        path: 'docs/:id',
        name: 'DocDetail',
        component: () => import('@/views/docs/DocDetail.vue'),
        meta: {
          titleKey: 'more.viewHelp',
          requiresAuth: true,
          activeNav: 'More' 
        }
      },
      {
        path: 'nodes',
        name: 'NodeList',
        component: () => import('@/views/servers/NodeList.vue'),
        meta: {
          titleKey: 'nodes.title',
          requiresAuth: true,
          activeNav: 'More' 
        }
      },
      {
        path: 'orders',
        name: 'OrderList',
        component: () => import('@/views/orders/OrderList.vue'),
        meta: {
          titleKey: 'orders.title',
          requiresAuth: true,
          activeNav: 'More' 
        }
      },
      {
        path: 'tickets',
        name: 'TicketList',
        component: () => import('@/views/ticket/TicketList.vue'),
        meta: {
          titleKey: 'tickets.title',
          requiresAuth: true,
          activeNav: 'More' 
        }
      },
      {
        path: 'mobile/tickets',
        name: 'MobileTickets',
        component: () => import('@/views/ticket/MobileTicketList.vue'),
        meta: {
          titleKey: 'tickets.title',
          requiresAuth: true,
          activeNav: 'More' 
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
        meta: {
          titleKey: 'profile.title',
          requiresAuth: true,
          activeNav: 'More' 
        }
      },
      {
        path: 'trafficlog',
        name: 'TrafficLog',
        component: () => import('@/views/trafficLog/TrafficLog.vue'),
        meta: {
          titleKey: 'trafficLog.title',
          requiresAuth: true,
          activeNav: 'More' 
        },
        beforeEnter: (to, from, next) => {
          if (!TRAFFICLOG_CONFIG.enableTrafficLog) {
            next('/dashboard');
          } else {
            next();
          }
        }
      },
      {
        path: 'wallet/deposit',
        name: 'Deposit',
        component: () => import('@/views/wallet/WalletDeposit.vue'),
        meta: {
          titleKey: 'wallet.deposit.title',
          requiresAuth: true,
          activeNav: 'More' 
        },
        beforeEnter: (to, from, next) => {
          if (!isXiaoV2board()) {
            next('/dashboard');
          } else {
            next();
          }
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      titleKey: 'errors.notFound',
      requiresAuth: false
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach(async (to, from, next) => {
  if (to.name !== 'BrowserRestricted' && isBrowserRestricted()) {
    next({ name: 'BrowserRestricted' });
    return;
  }
  
  const { shouldCheckApiAvailability } = await import('@/utils/apiAvailabilityChecker');
  if (shouldCheckApiAvailability() && to.name !== 'ApiValidation') {
    const availableUrl = sessionStorage.getItem('ez_api_available_url');
    if (!availableUrl) {
      const apiRedirectQuery = {
        redirect: to.path,
        ...to.query
      };
      next({ 
        name: 'ApiValidation',
        query: apiRedirectQuery
      });
      return;
    }
  }
  
  const getTitle = () => {
    if (to.meta.titleKey) {
      try {
        const title = i18n.global.t(to.meta.titleKey);
        return `${title} - ${SITE_CONFIG.siteName}`;
      } catch (error) {
        return SITE_CONFIG.siteName;
      }
    }
    return SITE_CONFIG.siteName;
  };
  
  document.title = getTitle();
  
  const token = localStorage.getItem('token');
  
  const loginStatusChanged = 
    (from.meta.requiresAuth && !to.meta.requiresAuth) || 
    (!from.meta.requiresAuth && to.meta.requiresAuth);
  
  if (loginStatusChanged) {
    try {
      const { reloadMessages } = await import('@/i18n');
      await reloadMessages();
    } catch (error) {
    }
  }
  
  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' });
  } else if (to.path === '/login' && token) {
    next({ path: '/dashboard' });
  } else {
    document.body.classList.add('page-transitioning');
    
    if (to.meta.keepAlive && to.name) {
      pageCache.addRouteToCache(to.name);
    } else if (to.name && to.meta.keepAlive === false) {
      pageCache.removeRouteFromCache(to.name);
    }
    
    next();
  }
});

router.afterEach(() => {
  setTimeout(() => {
    document.body.classList.remove('page-transitioning');
  }, 400);
});

function getCustomOrDefaultLandingPage() {
  if (!SITE_CONFIG.customLandingPage) {
    return LandingPage;
  }
  return CustomLandingPage;
}

export default router; 
