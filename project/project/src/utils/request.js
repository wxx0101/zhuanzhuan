import Cookies from 'js-cookie'


const format = (obj) => {
    return Object.entries(obj).map(item => `${item[0]}=${typeof item[1]=="object" ? JSON.stringify(item[1]) : item[1]}`).join('&')
}

const requestFn = (url,data,method) => {
    let baseOptions = {
        method,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "authorization": Cookies.get("sessionid")
        }
    }
    if(url === '/api/facePhoto'){
         delete baseOptions.headers["content-type"]
    }
    if(method === "GET"){
        url = `${url}${format(data) ? "?"+format(data) : ""}`
    }else{
        baseOptions.body = data instanceof FormData ? data : format(data)
    }
    return fetch(url,baseOptions).then(res => {
        if(res.ok){
            return res.json()
        }else{
            return Promise.reject(res)
        }
    })
}



export default {
    get(url,data={}){
        return requestFn(url,data,"GET")
    },
    post(url,data){
        return requestFn(url,data,"POST")
    }
}

// export default {
//     get(url, data = {}) {
//         return fetch(`${url}?${format(data)}`, {
//             method: "GET",
//             headers: {
//                 "content-type": "application/x-www-from-urlencoded"
//             }
//         }).then(res => {
//             if (res.ok) {
//                 return res.json()
//             } else {
//                 return Promise.reject(res)
//             }
//         }).then(res => {
//             return res.Verification;
//         })
//     },
//     post(url, data) {
//         return fetch(url, {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json;charset=utf-8"
//             },
//             body: JSON.stringify(data)/*  */
//         }).then(res => { 
//             if (res.ok) {
//                 return res.json()
//             } else {
//                 return Promise.reject(res)
//             }
//         })
//     }
// }