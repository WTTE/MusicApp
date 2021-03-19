//引入Toast弹窗组件为意外情况做准备
import { Toast } from 'antd-mobile'
import 'whatwg-fetch'

const BASE_URL = process.env.REACT_APP_BASE_URL || ''


function dealUrl (url, param) {
    //将基本的服务器地址与传入的url进行拼接得到handleUrl
    let handleUrl = BASE_URL + url
    //如果请求中含有第二个参数param,则进行如下判断
    if (param) {
        //如果handleUrl中含有"?"字符(url里面的？是个分割线，用来区分问号前面的是path，问号后面的是参数),使用自己封装的函数handleUrl进行处理
        if (handleUrl.indexOf('?') === -1) {
            handleUrl = `${handleUrl}?${changeUrl(param)}`
        } else {
            handleUrl = `${handleUrl}&${changeUrl(param)}`
        }
    }
    return handleUrl
}

//将参数转化为'test=1&test2=2'这种字符串形式
function changeUrl (param) {
    //声明一个空字符串
    let str = ''
    if (Object.prototype.toString.call(param) === '[object Object]') {
        const list = Object.entries(param).map(item => {
            return `${item[0]}=${item[1]}`
        })
        str = list.join('&')
    }
    return str
}

//get请求封装
export async function get (url, param) {
    const handleUrl = dealUrl(url, param)
    const response = await fetch(handleUrl, {
        credentials: 'include',
        xhrFields: {
            withCredentials: true       //跨域
        },
    })
    if (response.ok) {
        return response.json()
    } else {
        Toast.offline(response.statusText || '网络错误')
        return response
    }
}

//post请求封装
// export async function post (url, parma) {
//     const handleUrl = BASE_URL + url
//     const response = await fetch(handleUrl, {
//         credentials: 'include',
//         method: 'POST',
//         xhrFields: {
//             withCredentials: true
//         },
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: JSON.stringify(parma),
//     })
//     if (response.ok) {
//         return response.json()
//     } else {
//         Toast.offline(response.statusText || '网络错误')
//         return response
//     }
// }