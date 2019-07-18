import React, { Component } from 'react'
import request from "../utils/request"
import { connect } from 'react-redux'
import {bindActionCreators} from "redux"
import Actions from "../store/Actions"

const islogin = (Index) => {
     class Child extends Component {
        state = {
            loginOpen: false
        }
        render() {
            let { loginOpen } = this.state
            return  loginOpen && <Index {...this.props} />
        }
        componentDidMount(){
            request.get("/api/islogin").then(res => {
                 // console.log(res.info)
                this.props.getInfo(res.info)
                this.setState({
                    loginOpen: true
                })
            }).catch(error => {
                if(error.status === 401){
                    this.props.history.push("/Login")
                }
            })
        }
    }
     return connect(mapStateToProps, mapDispatchToProps)(Child)
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions,dispatch)
}

export default islogin;