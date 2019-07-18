import React from "react"
import {Switch,Redirect,Route } from "react-router-dom"

function RouterView({ routes = [] }) {
    const routesArr = routes.length && routes.filter(item => !item.redirect)
    const redirectArr = routes.length && routes.filter(item => item.redirect).map((item,key) => {
        return <Redirect key={key} from={item.path} to={item.redirect} />
    })
    return <Switch>
        {
            routesArr.map((item,key) => <Route key={key} path={item.path} render={(props) => {
                return <item.component {...props} routes={item.children} />
            }} />).concat(redirectArr)
        }

    </Switch>
}
export default RouterView;