// 구글로그인화면
import LoginView from '@/views/login/LoginView.vue'
// 메인대시보드
import MainLayoutView from '@/views/mainBoard/MainLayoutView.vue'
import TabMainView from '@/views/mainBoard/tab/TabMainView.vue'
import TabProgramView from '@/views/mainBoard/tab/program/TabProgramView.vue'


// NotFound
import NotFoundView from '@/views/NotFoundView.vue'

import { refreshApi } from '@/api/userAPI';

// 로그인이 안되어있으면 페이지 접근 제한
const checkAuth = () => {
  return async function (to, from, next) {
    try {
      if (localStorage.getItem("refresh-token")) {
        await refreshApi();
        next()
      } else {
        alert('로그인이 필요합니다.1');
        next('/login')
      }
    } catch (error) {
      console.error(error);
    }
  }
}

// 로그인이 되어있으면 LOGIN 페이지 접근 제한
const isLoggedIn = () => {
  return async (to, from, next) => {
    try {
      if (!localStorage.getItem("refresh-token")) {
        next()
      } else {
        alert('로그인 되어있습니다.')
        next('/')
      }

    } catch (err) {
      console.error(err);
    }
  }
}



export const routes = [
  {
    path: "*",
    name: 'notfound',
    component: NotFoundView
  },
  {
    path: "/",
    redirect() {
      return "/main"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    beforeEnter: isLoggedIn()
  },
  {
    path: "/main",
    name: "MainLayout",
    component: MainLayoutView,
    redirect: "/",
    children: [
      {
        path: "",
        name: "Main",
        component: TabMainView,
        // beforeEnter: checkAuth(),
      }
    ]
  },
]