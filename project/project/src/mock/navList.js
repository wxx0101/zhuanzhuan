let navList = [
    {
        name: "首页",
        path: "/Index/Home"
    },
    {
        name: "订单管理",
        foods: [
            {
                name: "贷款订单",
                path: "/Index/Orders/dk"
            },
            {
                name: "转单订单",
                path: "/Index/Orders/zd"
            },
            {
                name: "保险订单",
                path: "/Index/Orders/bx"
            }
        ]
    },
    {
        name: "财务管理",
        foods: [
            {
                name: "财务订单",
                path: "/Index/Finance/one"
            },
            {
                name: "财务订单",
                path: "/Index/Finance/two"
            },
            {
                name: "财务订单",
                path: "/Index/Finance/three"
            }
        ]
    },
    {
        name: "组织架构",
        path: "/Index/Framework"
    },
    {
        name: "数据统计",
        path: "/Index/Statistics"
    },
    {
        name: "商务管理",
        path: "/Index/Administration"
    }
]

export default navList;