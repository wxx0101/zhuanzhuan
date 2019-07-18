import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import navList from "../mock/navList"

const reducer = (state = {
    navList, slideArr: [], filterArr: [], pageData: [],mess: "",info: {}, showPage: {
        page: 1,
        pageSize: 10,
        list: []
    }
}, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "INFO":
            newState.info = action.info;
            return newState;
        case "SLIDEDATA":
            {
                let { name, path } = action
                let flag = newState.slideArr.findIndex(item => item.name === name && item.path === path)
                if (flag === -1) {
                    newState.slideArr.unshift({ name, path })
                }
                return newState;
            }
        case "DELbTN":
            {
                let { index } = action
                newState.slideArr.splice(index, 1)
                return newState;
            }
        case "PAGEDATA":
            {
                let { pageData } = action;
                newState.pageData = pageData;
                newState.filterArr = pageData;
                newState.showPage.list = newState.pageData.filter((Item, ind) => ind >= 0 && ind < 10)
                return newState;
            }
        case "PAGE":
            {
                let { page, pageSize } = action;
                let minnum = (page - 1) * pageSize;
                let maxnum = page * pageSize;
                // console.log(minnum,maxnum)
                newState.showPage.list = newState.filterArr.filter((item, ind) => {
                    return ind >= minnum && ind < maxnum
                })
                return newState;
            }
        case "SUBMIT":
            {
                let { options } = action
                let { maxNum, minNum, kefuName, stateStr, timeArr, types } = options
                let newArr = [];
                newState.pageData.forEach(item => {
                    let price = item.money * 10000
                    if (maxNum*1 > price && price > minNum*1) {
                        if (!stateStr || item.handleState === stateStr) {
                            if(types === "默认" || item.type === types){
                                if(kefuName === "默认" || item.customerName === kefuName){
                                    let date = new Date(item.date)
                                    if(!timeArr.length || (date>timeArr[0] && date<timeArr[1])){
                                        newArr.push(item)
                                    }
                                }
                            }
                        }
                    }
                })
                newState.filterArr = newArr;
                newState.showPage.list = newArr.filter((Item, ind) => ind >= 0 && ind < 10)
                return newState;
            }
        case "CHANGEFACE":
            {
                let {obj} = action
                // console.log(obj.facePhoto)
                newState.info = obj
                return newState;
            }
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store;