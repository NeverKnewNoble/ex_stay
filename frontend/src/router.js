import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    name: 'Login',
    path: '/account/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    name: 'SignUpPage',
    path: '/signup',
    component: () => import('@/pages/Signup.vue'),
  },
  {
    name: 'ForgotPasswordPage',
    path: '/forgot_password',
    component: () => import('@/pages/forgotPassword.vue'),
  },
  {
    name: 'BookingPage',
    path: '/booking',
    component: () => import('@/pages/bookingPage.vue'),
  },
  {
    name: 'CatalogPage',
    path: '/catalogue',
    component: () => import('@/pages/Catalogs.vue'),
  },
  {
    name: 'myBookingPage',
    path: '/my_bookings',
    component: () => import('@/pages/myBookings.vue'),
  }
]

let router = createRouter({
  history: createWebHistory('/frontend'),
  routes,
})


router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn

  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }

  if (!isLoggedIn) {
    // Allow access only to Home, Login, signUp and forgotpassword when not logged in
    if (to.name === 'Home' || to.name === 'Login' || to.name === 'SignUpPage' || to.name === "ForgotPasswordPage") {
      next()
    } else {
      next({ name: 'Login' }) // Redirect to Login if trying to access any other page
    }
  } else {
    // If logged in, prevent access to Login page
    if (to.name === 'Login') {
      next({ name: 'Home' }) // Redirect logged-in users to Home if they try to access Login
    } else {
      next()
    }
  }
})

export default router
