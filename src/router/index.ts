import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TimeTable from "@/pages/TimeTable/TimeTable.vue";

import { routes as timetableRoutes } from "@/router/timetable";

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: TimeTable,
    children: [
        ...timetableRoutes,
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
