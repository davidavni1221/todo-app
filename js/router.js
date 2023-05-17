import homePage from './pages/home-page.js'
import todoApp from './pages/todo-app.js'
import todoEdit from './pages/todo-edit.js'
import todoDetails from './pages/todo-details.js'
import userProfile from './pages/user-profile.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/todo',
        component: todoApp
    },
    {
        path: '/todo/edit/:todoId?',
        component: todoEdit,
        name:'edit',
        props:true
    },
    {
        path: '/todo/:todoId',
        component: todoDetails
    },
    {
        path: '/user',
        component: userProfile,
        name:'user',
    },
]

export const myRouter = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
})