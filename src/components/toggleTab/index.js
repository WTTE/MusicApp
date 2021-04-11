import React, { Component } from 'react'

import Tabs from '../tabs'

import { withRouter } from 'react-router-dom'

class ToggleTab extends Component {

    //对抽屉弹窗进行判断
    TabsOpen = () => {
        //声明需要出现TabBar的Url的数组
        var includeUrl = ["find", "rankingList", "podcast", "mine"]
        //获取当前Url并进行处理
        const pathUrl = this.props.location.pathname.split("/")[1]
        if (includeUrl.indexOf(pathUrl) > -1) {
            return <Tabs></Tabs>;
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <div>
                {this.TabsOpen()}
            </div>
        )
    }
}

export default withRouter(ToggleTab);