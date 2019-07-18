import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import Actions from '../../../store/Actions';
import moment from 'moment';
import { Row, Col, Pagination } from 'antd';
import FromTable from "../../../components/fromTable"

export class ItemCon extends Component {
    render() {
        let { showPage,filterArr } = this.props
        return <div className="itemBox">
            <div className="top">
                <FromTable />
            </div>
            <div className="pageBox">
                <Row>
                    <Col span={3}>订单号</Col>
                    <Col span={3}>下单时间</Col>
                    <Col span={2}>用户名称</Col>
                    <Col span={2}>手机号</Col>
                    <Col span={2}>转单类型</Col>
                    <Col span={3}>贷款金额(万元)</Col>
                    <Col span={2}>贷款期限</Col>
                    <Col span={2}>贷款利息</Col>
                    <Col span={2}>订单状态</Col>
                    <Col span={2}>客服</Col>
                    <Col span={1}>操作</Col>
                </Row>
                {
                    showPage.list.map((item, index) => <Row key={index} className="row">
                        <Col span={3} className="code">{item.id}</Col>
                        <Col span={3}>{item.date}</Col>
                        <Col span={2}>{item.serviceName}</Col>
                        <Col span={2}>{item.phone}</Col>
                        <Col span={2}>{item.type}</Col>
                        <Col span={3}>{item.money}</Col>
                        <Col span={2}>{item.order+1}月</Col>
                        <Col span={2}>{item.interestRate}%</Col>
                        <Col span={2}>{this.changeHandState(item.handleState)}</Col>
                        <Col span={2}>{item.customerName}</Col>
                        <Col span={1} className="iconfont iconxiangqing icon"></Col>
                    </Row>)
                }
                <Pagination defaultCurrent={1} total={filterArr.length} pageSize={10} onChange={(page, pageSize) => { this.changePage(page, pageSize) }} />
            </div>

        </div>
    }
    changeHandState(handleState){
        switch(handleState){
            case 1:
                return "未处理";
            case 2:
                return "补全中";
            case 3:
                return "已完成";
            case 4:
                return "返佣中";
            default : 
                return ;
        }
    }
    changePage = (page, pageSize) => {
        this.props.getPage(page, pageSize)
    }
    disabledRangeTime = (_, type) => {
        if (type === 'start') {
            return {
                disabledHours: () => this.range(0, 60).splice(4, 20),
                disabledMinutes: () => this.range(30, 60),
                disabledSeconds: () => [55, 56],
            }
        }
    }
    disabledDate(current) {
        return current && current < moment().endOf('day');
    }
    range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }
    componentDidMount() {
        let name = this.props.location.pathname.slice(-2);
        this.props.getpageData(this.getId(name))
    }
    componentWillReceiveProps(nextProps) {
        let name = nextProps.location.pathname.slice(-2);
        if (this.props.location.pathname !== nextProps.location.pathname) {
            this.props.getpageData(this.getId(name))
        }
    }
    getId(name) {
        switch (name) {
            case "dk":
                return 1;
            case "zd":
                return 2;
            default:
                return 3;
        }
    }
}

const mapStateToProps = (state) => {
    return {
        pageData: state.pageData,
        showPage: state.showPage,
        filterArr: state.filterArr
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemCon)
