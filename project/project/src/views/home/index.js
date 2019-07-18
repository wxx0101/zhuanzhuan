import React, { Component } from 'react'
import { Menu, Icon, Switch, Layout } from "antd"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import Actions from '../../store/Actions';
import { NavLink } from "react-router-dom"
import RouterView from "../../router/routerView"
import Cookies from "js-cookie"

class Index extends Component {
    state = {
        theme: 'dark',
        current: '1'
    }
    render() {
        const { SubMenu } = Menu
        const { Header } = Layout;
        let { navList, info, slideArr, routes } = this.props
        return <div className="wrap">
            <div className="slideBox">
                <div className="logoBox">
                    <img src={"http://localhost:3000" + info.facePhoto} alt="" />
                    <span>北京乐智慧代理</span>
                </div>
                <Switch
                    checked={this.state.theme === 'dark'}
                    onChange={this.changeTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                />
                <br />
                <br />
                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    style={{ width: 160 }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    {
                        navList.map((item, index) => item.foods ? <SubMenu
                            key={index}
                            title={
                                <span>
                                    <Icon type="mail" />
                                    <span>{item.name}</span>
                                </span>
                            }
                        >
                            {
                                item.foods.map(ele => <Menu.Item key={ele.path} onClick={this.slideBtn.bind(this, ele.name, ele.path)}><NavLink to={ele.path}>{ele.name}</NavLink></Menu.Item>)
                            }
                        </SubMenu> : <Menu.Item key={index}>
                                <NavLink to={item.path}>
                                    <Icon type="desktop" />
                                    <span>{item.name}</span>
                                </NavLink>
                            </Menu.Item>)
                    }

                    
                    <Menu.Item className="setting"  onClick={this.settingFn.bind(this)}>
                        <Icon type="desktop" className="iconfont iconshezhi" />
                        <span>设置</span>
                    </Menu.Item>
                    <Menu.Item className="quit" onClick={this.quitFn.bind(this)}>
                        <Icon type="desktop" />
                        <span>退出</span>
                    </Menu.Item>

                </Menu>
            </div>

            <div className="rightBox">
                <div className="topNav">
                    <Header className="header">
                        <Menu
                            className="navTop"
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}
                        >
                            {
                                slideArr && slideArr.map((item, index) => <Menu.Item key={item.path} className="navTopBtn"><NavLink to={item.path}>{item.name}</NavLink><b onClick={this.delBtn.bind(this, index)}>X</b></Menu.Item>)
                            }

                        </Menu>
                    </Header>
                </div>
                <div className="content">
                    <RouterView routes={routes} />
                </div>
            </div>

        </div>
    }
    settingFn(){
        this.props.history.push("/Index/Setting")
    }
    quitFn(){
        Cookies.remove("sessionid")
        this.props.history.push("/Login")
    }
    slideBtn(name, path) {
        this.props.getSlideData(name, path)
    }
    delBtn(index) {
        this.props.getDelBtn(index)
    }
    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light'
        });
    }

    handleClick = e => {
        this.setState({
            current: e.key
        })
    }
    componentDidMount() {
        let name = ""
        let path = this.props.location.pathname;
        this.props.navList.forEach(item => {
            if (item.path === path) {
                name = item.name
                return;
            }
            if (item.foods) {
                item.foods.forEach(item => {
                    if (item.path === path) {
                        name = item.name
                        return;
                    }
                })
            }
        })
        this.props.getSlideData(name, path)
    }

}



const mapStateToProps = (state) => {
    return {
        navList: state.navList,
        info: state.info,
        slideArr: state.slideArr
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)







