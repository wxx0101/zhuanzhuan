import request from "../utils/request"
import Cookies from "js-cookie"

const getInfo = (info) => {
    return {
        type: "INFO",
        info
    }
}
const getSlideData = (name, path) => {
    return {
        type: "SLIDEDATA",
        name,
        path
    }
}
const getDelBtn = (index) => {
    return {
        type: "DELbTN",
        index
    }
}
const getpageData = (order) => {
    return dispatch => {
        request.get("/api/list", { order }).then(res => {
            dispatch({
                type: "PAGEDATA",
                pageData: res.data
            })
        })
    }
}
const getPage = (page, pageSize) => {
    return {
        type: "PAGE",
        page,
        pageSize
    }
}
const getSubmitData = (options) => {
    return {
        type: "SUBMIT",
        options
    }
}
const changeFace = (file) => {
    let formData = new FormData()
    formData.append("file",file)
    return dispatch => {
        request.post("/api/facePhoto",formData).then(res => {
            let {obj,sessionId} = res    
            Cookies.set("sessionid",sessionId,{
                expires: 5
              })
            dispatch ({
                type: "CHANGEFACE",
                obj
            })
        })
    }
}
const setPwdFn = (val) => {
    return dispatch => {
        request.post("/api/resetPassword",{newPassword: val}).then(res => {
            // let {message} = res;
            // alert(message)
        })
    }
}

export default { getInfo, getSlideData, getDelBtn, getpageData, getPage, getSubmitData,changeFace,setPwdFn }