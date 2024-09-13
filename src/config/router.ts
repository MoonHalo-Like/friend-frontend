import * as VueRouter from 'vue-router'
import Index from "../pages/Index.vue";
import Team from "../pages/Team.vue";
import UserUpDate from "../pages/UserUpDate.vue";
import Search from "../pages/Search.vue";
import EditUser from "../pages/UserEdit.vue";
import SearchResult from "../pages/SearchResult.vue";
import Login from "../pages/Login.vue";
import TeamAdd from "../pages/TeamAdd.vue";
import TeamUpdate from "../pages/TeamUpdate.vue";
import User from "../pages/User.vue";
import MyTeam from "../pages/MyTeam.vue";
import Tag from "../pages/Tag.vue";


export const routes = [
    {
        path: '/',
        meta: {
            title: '主页'
        },
        component: Index
    },
    {
        path: '/team',
        meta: {
            title: '队伍'
        },
        component: Team
    },
    {
        path: '/team/add',
        meta: {
            title: '添加队伍'
        },
        component: TeamAdd
    },
    {
        path: '/team/update',
        meta: {
            title: '更新队伍'
        },
        component: TeamUpdate
    },
    {
        path: '/user',
        meta: {
            title: '用户信息'
        },
        component: User
    },
    {
        path: '/user/update',
        meta: {
            title: '个人信息'
        },
        component: UserUpDate
    },
    {
        path: '/user/myTeam',
        meta: {
            title: '我的队伍'
        },
        component: MyTeam
    },
    {
        path: '/search',
        meta: {
            title: '搜索'
        },
        component: Search
    },
    {
        path: '/user/list',
        meta: {
            title: '搜索'
        },
        component: SearchResult
    },
    {
        path: '/user/edit',
        meta: {
            title: '修改信息'
        },
        component: EditUser
    },
    {
        path: '/login',
        meta: {
            title: '登录'
        },
        component: Login
    },
    {
        path: '/tag',
        meta: {
            title: '标签管理'
        },
        component: Tag
    },
]

// 创建路由
const router = VueRouter.createRouter({
    // 指定路由的历史管理方式，hash 模式指的是 URL 的路径是通过 hash 符号（#）进行标识
    history: VueRouter.createWebHistory(),
    // routes: routes 的缩写
    routes,
})

export default router