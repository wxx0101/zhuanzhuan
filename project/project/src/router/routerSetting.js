import loadable from "react-loadable"
import React, { Component } from 'react'
import islogin from "../components/islogin"

class Loading extends Component {
    render() {
        return <div>
            Loading...
        </div>
    }
}

const Index = loadable({
    loader: () => import("../views/home/index"),
    loading: Loading
})
const Login = loadable({
    loader: () => import("../views/login/index"),
    loading: Loading
})
const Home = loadable({
    loader: () => import("../views/home/component/home"),
    loading: Loading
})
const Orders = loadable({
    loader: () => import("../views/home/component/itemCon"),
    loading: Loading
})
const Finance = loadable({
    loader: () => import("../views/home/component/finance"),
    loading: Loading
})
const Framework = loadable({
    loader: () => import("../views/home/component/framework"),
    loading: Loading
})
const Setting = loadable({
    loader: () => import("../views/home/setting"),
    loading: Loading
})
const Statistics = loadable({
    loader: () => import("../views/home/component/statistics"),
    loading: Loading
})
const Administration = loadable({
    loader: () => import("../views/home/component/administration"),
    loading: Loading
})

const routes = [
    {
        path: "/",
        redirect: "/Index"
    },
    {
        path: "/Index",
        component: islogin(Index),
        children: [
            {
                path: "/Index",
                redirect: "/Index/Home"
            },
            {
                path: "/Index/Home",
                component: Home
            },
            {
                path: "/Index/Orders/:con",
                props: true,
                component: Orders
            },
            {
                path: "/Index/Finance/:con",
                props: true,
                component: Finance
            },
            {
                path: "/Index/Framework",
                component: Framework
            },
            {
                path: "/Index/Statistics",
                component: Statistics
            },
            {
                path: "/Index/Administration",
                component: Administration
            },
            {
                path: "/Index/Setting",
                component: Setting
            }
        ]
    },
    {
        path: "/Login",
        component: Login
    }
]

export default routes;