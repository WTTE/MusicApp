import React from 'react';

//引入BrowserRouter,对组件进行包裹
import { BrowserRouter } from 'react-router-dom'
import './App.css';

//引入导航栏切换组件ToggleNav
import ToggleNav from "./components/toggleNav"

//引入路由组件RouterMap
import RouterMap from './router';

//引入标签组件TabBar
import Tabs from './components/tabs'

//引入在线字体
import './assets/iconfont/style.css';

function App() {
    return (
        <BrowserRouter>
            <ToggleNav></ToggleNav>
            <RouterMap></RouterMap>
            <Tabs></Tabs>
        </BrowserRouter>
    )
}

export default App;