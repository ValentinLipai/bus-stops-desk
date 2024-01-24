import { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Bus Lines',
        component: () => import('@/containers/BusLines.vue'),
    },
    {
        path: '/stops',
        name: 'Stops',
        component: () => import('@/containers/BusStops.vue'),
    }
]