import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import Actions from "../../store/Actions"
import Cookies from "js-cookie"

export class setting extends Component {
    state = {
        imgUrl: "",
        files: null,
        open: false,
        val: ""
    }
    render() {
        let { info } = this.props
        let { imgUrl, files, open,val } = this.state
        return <div className="setBox">
            <h2>账户信息</h2>

            <div className="con">
                <h2>账户头像</h2>
                <div className="img-box">
                    <img src={imgUrl ? imgUrl : info.facePhoto} alt="" />
                    <input type="file" onChange={this.fileFn} />
                </div>
                <p>您可以上传一张图片作为头像</p>
                <button onClick={files && this.submitImage.bind(this)}>上传</button>
                <h3>账号管理</h3>
            </div>

            <div className="setPwd">
                <p>
                    登录手机号：<b>{info.phone}</b>
                </p>
                {
                    open && <p>
                        请输入新密码：<input type="password" value={val} onChange={(e) => {
                            this.setState({
                                val: e.target.value
                            })
                        }} />
                        <i onClick={this.setPwdFn.bind(this)}>确定修改密码</i>
                    </p>
                }
                <p>
                    登录密码： <span onClick={this.setBtnFn.bind(this)}>修改密码</span>
                </p>
            </div>
        </div>
    }
    submitImage() {
        let { files } = this.state
        this.props.changeFace(files)
        this.setState({
            files: null
        })
    }
    setPwdFn(){
        let {val} = this.state
        this.props.setPwdFn(val)
        Cookies.remove("sessionid")
        this.props.history.push("/Login")
    }
    setBtnFn() {
        this.setState({
            open: true
        })
    }
    fileFn = (e) => {
        let files = e.target.files[0]
        let fileReader = new FileReader()
        fileReader.readAsDataURL(files)
        fileReader.onload = () => {
            this.setState({ imgUrl: fileReader.result, files })
        }
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        info: state.info
    }
}

const mapDispatchToProps = (dispath) => {
    return bindActionCreators(Actions, dispath)
}

export default connect(mapStateToProps, mapDispatchToProps)(setting)
