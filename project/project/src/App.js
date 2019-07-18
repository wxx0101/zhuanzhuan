import React, { Component } from 'react'
import Router from "./router/index"
import {Provider} from "react-redux"
import store from "./store/redux"

class App extends Component {
  render() {
    return <Provider store={store}>
        <Router />
    </Provider>
  }
}

export default App;
