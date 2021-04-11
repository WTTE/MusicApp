import React, { Component } from 'react'

//引入BrowserRouter,对组件进行包裹
import { BrowserRouter } from 'react-router-dom'
import './App.css';

//引入导航栏切换组件ToggleNav
import ToggleNav from "./components/toggleNav"

//引入路由组件RouterMap
import RouterMap from './router';

//引入标签组件ToggleTab
import ToggleTab from './components/toggleTab'

//引入在线字体
import './assets/iconfont/style.css';


function App() {

    return (
        <BrowserRouter>
            {/* 导航栏切换 */}
            <ToggleNav></ToggleNav>
            {/* 路由切换 */}
            <RouterMap></RouterMap>
            {/* TabBar判断 */}
            <ToggleTab></ToggleTab>
        </BrowserRouter>
    )

}

export default App;