import React, { Component } from 'react'

import Header from '../../components/podcastDetail/header'

class podcastDetail2 extends Component {
    render() {
        console.log(this.props.location.state, "这是电台详情页面2接收到的数据")
        return (
            <div>
                {/* 电台详情头部部分 */}
                <Header detail={this.props.location.state}></Header>
            </div>
        )
    }
}
export default podcastDetail2
