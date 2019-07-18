import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment';
import { DatePicker, Input, Select } from 'antd';
import {bindActionCreators} from "redux"
import Actions from "../store/Actions"

export class FromTable extends Component {
    state = {
        ind: 0,
        newTypeData: [],
        newKefuData: [],
        stateList: [
            {
                name: "全部",
                num: 0
            },
            {
                name: "未处理",
                num: 1
            },
            {
                name: "补全中",
                num: 2
            },
            {
                name: "已完成",
                num: 3
            },
            {
                name: "返佣中",
                num: 4
            }
        ],
        optionsData: {
            timeArr: [],
            minNum: 10000,
            maxNum: 1000000,
            stateStr: 0,
            types: "默认",
            kefuName: "默认"
        }
    }
    render() {
        const { RangePicker } = DatePicker;
        const { Option } = Select;
        let { ind, stateList, newTypeData, newKefuData, optionsData } = this.state;
        return (
            <>
                <div className="timeBox">
                    <h2>处理时间：</h2>  <RangePicker
                        disabledDate={this.disabledDate}
                        disabledTime={this.disabledRangeTime}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                        }}
                        onOk={(e) => { this.timeFn(e) }}
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <h2>金额范围：</h2>
                    <Input placeholder="10000" style={{ width: 100 }} onChange={(e) => { this.changeIpt(e) }} />
                    --
                    <Input placeholder="1000000" style={{ width: 100 }} onPressEnter={(e) => { this.enterCode(e) }} />
                </div>
                <ul>
                    <h2>处理状态：</h2>
                    {
                        stateList.map((item, index) => <li key={index} className={index === ind ? "active" : ""} onClick={this.stateBtn.bind(this, index, item.name,item.num)}>{item.name}</li>)
                    }

                    <h2>转单类型：</h2>
                    <Select defaultValue="请选择类型" style={{ width: 120 }} onChange={(e) => this.handleChangeTypes(e, optionsData)}>
                        <Option value="默认" disabled>请选择类型</Option>
                        {
                            newTypeData && newTypeData.map((item, index) => <Option key={index} value={item}>{item}</Option>)
                        }
                    </Select>

                    <div className="small"><h2>客服名称：</h2>

                        <Select defaultValue="请选择客服" style={{ width: 120 }} onChange={(e) => this.handleChangeKefu(e, optionsData)}>
                            <Option value="默认">请选择客服</Option>
                            {
                                newKefuData && newKefuData.map((item, index) => <Option key={index} value={item}>{item}</Option>)
                            }
                        </Select></div>

                </ul>
                <button onClick={this.submitBtn.bind(this)}>提交</button>
            </>
        )
    }
    submitBtn() {
        // console.log(this.state.optionsData)
        this.props.getSubmitData(this.state.optionsData)
    }
    changeIpt(e) {
        let minVal = e.target.value;
        let options = this.state.optionsData
        this.setState({
            optionsData: {
                ...options,
                minNum: minVal
            }
        })
    }
    enterCode(e) {
        let maxVal = e.target.value
        let options = this.state.optionsData
        if (options.minNum < maxVal) {
            this.setState({
                optionsData: {
                    ...options,
                    maxNum: maxVal
                }
            })
        } else {
            alert("最大值不能小于最小值")
        }
    }
    timeFn(e) {
        let time = e.map(item => {
            return new Date(item._d)
            // console.log(new Date(item._d).toLocaleDateString())
        })
        let options = this.state.optionsData
        this.setState({
            optionsData: {
                ...options,
                timeArr: time
            }
        })
    }
    handleChangeTypes(value, optionsData) {
        // console.log(`类型 ${value}`);
        let val = value
        this.setState({
            optionsData: {
                ...optionsData,
                types: val
            }
        })
    }
    handleChangeKefu(value, optionsData) {
        // console.log(`客服 ${value}`);
        let val = value
        this.setState({
            optionsData: {
                ...optionsData,
                kefuName: val
            }
        })
    }
    stateBtn(index, ele,num) {
        this.setState({
            ind: index
        })
        let options = this.state.optionsData
        this.setState({
            optionsData: {
                ...options,
                stateStr: num
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        let { pageData } = nextProps
        let newTypeData = Array.from(new Set(pageData.map(item => {
            return item.type
        })))
        this.setState({ newTypeData })
        let newKefuData = Array.from(new Set(pageData.map(item => {
            return item.customerName
        })))
        this.setState({ newKefuData })
    }
}

const mapStateToProps = (state) => {
    return {
        pageData: state.pageData
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FromTable)
