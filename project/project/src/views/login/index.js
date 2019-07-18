import React, { Component } from 'react'
import request from "../../utils/request"
import Cookies from "js-cookie"

class Index extends Component {
  state = {
    con: "获取验证码",
    num: 3,
    open:true,
    phone: "",
    password: "",
    checkcode: ""
  }
  render() {
    let { con, phone, password, checkcode } = this.state
    return (
      <div className="loginBox">
        <div className="box">
          <i className="iconfont iconlogo"></i>
          <span>赚赚金融渠道管理系统</span>
          <p><input type="text" placeholder="注册邮箱/手机号" value={phone} onChange={(e) => {
            this.setState({
              phone: e.target.value
            })
          }} /></p>
          <p><input type="password" placeholder="登录密码" value={password} onChange={(e) => {
            this.setState({
              password: e.target.value
            })
          }} /></p>
          <p><input type="text" placeholder="验证码" value={checkcode} onChange={(e) => {
            this.setState({
              checkcode: e.target.value
            })
          }} /><b onClick={this.yzmBtn.bind(this)}>{con}</b></p>
          <p><i>忘记密码</i></p>
          <p><button onClick={this.loginBtn.bind(this)}>登录</button></p>
        </div>

        <h1>Welcome</h1>
        <p>赚赚金融股&nbsp;开创信贷“1+N”模式的综合互联网金融服务共享平台</p>
        <ul>
          <li>Copyright@2016 ZHUANZHUANJINRONG ALL RIGHTS RESERVED. 赚赚金融 保留所有权利</li>
          <li>隐私政策</li>
          <li>条款与条约</li>
        </ul>
      </div>
    )
  }
  yzmBtn() {
    let { num,open } = this.state
    if(!open){
      return
    }else{
      this.setState({open:false})
    }
    this.timer = setInterval(() => {
      this.setState({
        con: `${num--}秒后获取`
      })
      if (num < 0) {
        request.get("/api/checkCode").then(res => {
          let {Verification} = res
          this.setState({
            con: Verification
          })
        })
        clearInterval(this.timer)
      }
    }, 1000)
  }
  loginBtn() {
    let { phone, password, checkcode } = this.state
    // console.log(phone, password, checkcode)
    request.post("/api/login", {
      phone,
      password,
      checkcode
    }).then(res => {
      let { code,message } = res;
      if(code){
        alert(message)
      }else{
        Cookies.set("sessionid",res.sessionId,{
          expires: 5
        })
        this.props.history.push("/Index")
      }
    })
  }
  componentDidMount() {

  }
}


export default Index;


// 13412341234
// anere