import React from "react"
import { BrowserRouter } from "react-router-dom"
import routes from "./routerSetting"
import RouterView from "./routerView"

function Router() {
    return <BrowserRouter>
        <RouterView routes={routes} />
    </BrowserRouter>
}
export default Router;