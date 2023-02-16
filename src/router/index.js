import { createRouter, createWebHashHistory } from 'vue-router'
import { useStore } from 'vuex';

const store = new useStore()

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        redirect: '/filmrec',
        name: '首页',
        component: () => import('@/views/home/home'),
        children: [
            {
                path: '/filmrec',
                component: () => import('@/views/filmrec/filmrec')
            },
            {
                path: '/films',
                component: () => import('@/views/films/films'),
            },
            {
                path: '/cinema',
                component: () => import('@/views/cinema/cinema')
            },
            {
                path: '/detail/:id',
                component: () => import('@/views/films/children/detail')
            },
            {
                path: '/book',
                component: () => import('@/views/book//book'),
                children: [
                    {
                        path: '/choosebase/:id?',
                        component: () => import('@/views/book/children/choosebase'),
                    },
                    {
                        path: '/chooseseat',
                        component: () => import('@/views/book/children/chooseseat')
                    },
                    {
                        path: '/confirm',
                        component: () => import('@/views/book/children/confirm')
                    },
                    {
                        path: '/paysuccess',
                        component: () => import('@/views/book/children/paysuccess')
                    },
                ]
            },
            {
                path: '/profile',
                component: () => import('@/views/profile/profile'),
                children: [
                    {
                        path: '/information',
                        component: () => import('@/views/profile/children/information')
                    },
                    {
                        path: '/order',
                        component: () => import('@/views/profile/children/order')
                    },
                ]
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/home/login/login')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
// router.beforeEach((to, from) => {
//     if (from.path.indexOf('detail')) {
//         store.dispatch('FromPage', 'movie')
//         console.log('电影已选择', store);
//         return true
//     }
//     else if (from.path.indexOf('cinema')) {
//         store.commit('setFromPage', 'cinema')
//         console.log('影院已选择',);
//     }

// },)

export default router
