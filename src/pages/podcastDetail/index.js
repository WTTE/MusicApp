import React, { Component } from 'react'

//从封装的方法中引入get请求的方法
import { get } from '../../utils/ajax'

import Header from '../../components/podcastDetail/header'
import Songs from '../../components/singersDetail/songs'
import { inject, observer } from 'mobx-react'


@inject('appStore') @observer
class PodcastDetail extends Component {
    state = {
        detail1: {},//电台详情页面的数据
        songs: []//电台详情页面的歌曲数据
    }

    // 组件挂载完毕时执行
    componentDidMount() {
        //将通过params传递过来的数据中的id赋给id
        const id = this.props.match.params.id
        //触发发送请求的方法getDetail
        this.getDetail(id)
    }

    //发送请求
    getDetail = async (id) => {
        //发送get请求
        const res = await get(`/dj/program/detail?id=${id}`)
        //打印返回的结果
        console.log(res, "FFFFFFFFF")
        this.setState({
            //将返回的结果中的playlist赋给detail
            detail1: res.program || {},
            songs: res.program.songs || []
        })
    }

    onSelectSong = (obj) => {
        this.props.appStore.onSelectSong(obj)
    }

    render() {
        const { detail1, songs } = this.state

        return (
            <div>
                {/* 电台详情头部部分 */}
                <Header detail={detail1}></Header>

                {/* 电台歌单列表部分 */}
                <Songs list={songs}  onSelectSong={this.onSelectSong}></Songs>
            </div>
        )
    }
}

export default PodcastDetail;
