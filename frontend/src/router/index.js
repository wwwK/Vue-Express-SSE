// 메인대시보드
import MainLayoutView from '@/views/mainBoard/MainLayoutView.vue'
import TabMainView from '@/views/mainBoard/tab/TabMainView.vue'
import EndView from '@/views/king/EndView.vue'


// NotFound
import NotFoundView from '@/views/NotFoundView.vue'

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
    path: "/main",
    name: "MainLayout",
    component: MainLayoutView,
    redirect: "/",
    children: [
      {
        path: "",
        name: "Main",
        component: TabMainView,
      }
    ]
  },
  {
    path: "/end",
    name: "end",
    component: EndView
  },
]