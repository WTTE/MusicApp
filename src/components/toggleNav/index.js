import React, { useEffect, useState } from 'react'
// 将Nav和Nav2组件引入，从而进行切换操作
import Nav from '../nav'
import Nav2 from '../nav2'
import { withRouter } from 'react-router-dom'

const ToggleNav = (props) => {
    //默认使用第一种nav
    let [NavType, setNavType] = useState("nav")

    // useEffect的执行依赖于路由地址发生改变
    useEffect(() => {
        // rootRouterArr中包含需要采用第一种nav的两个路由
        let rootRouterArr = ["/find", "/mine"]
        //将拿到的路由给path
        const path = props.history.location.pathname
        //对path进行判断,当路由为rootRouterArr两个之一时，采用nav
        if (rootRouterArr.includes(path)) {
            setNavType("nav")
        }
        //否则都采用nav2
        else {
            setNavType("Nav2")
        }
    }, [props.history.location.pathname])

    //返回一个代码片段，利用三元表达式进行返回
    return <React.Fragment>
        {NavType === "nav" ? <Nav></Nav> : <Nav2></Nav2>}
    </React.Fragment>
}

export default withRouter(ToggleNav); 