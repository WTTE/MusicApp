//引入antd-mobile
import { NavBar } from 'antd-mobile';
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './nav2.module.scss'

//Nav2标题数组
const DetailData = [
    { url: 'sheet', content: '详情' },
    { url: 'singers', content: '热门歌手' },
    { url: 'private', content: '私人FM' },
    { url: 'songList', content: '歌单' },
    { url: 'recommend', content: '每日推荐' },
    { url: 'rankingList', content: '排行榜' },
    { url: 'podcastDetail', content: '电台详情' },
    { url: 'podcast', content: '电台' },
    { url: 'playList', content: '歌单详情' },
    { url: 'singer', content: '歌手详情' },
    { url: 'album', content: '专辑详情' },
    { url: 'comment', content: '评论' },
    { url: 'search', content: '搜索' },
    { url: 'history/isHistory=1', content: '历史记录' },
    { url: 'history', content: '我的喜欢' },
]

//创建顶部导航栏类组件
class Nav2 extends Component {
    goBack = () => {
        this.props.history.goBack()
    }


    render() {
        // console.log(this.props.location, "@@@@@@@@@###########");
         //将url后面携带的参数赋给httpUrl
        const httpUrl = this.props.location.pathname;
        console.log(httpUrl, "@@@@@@@@@@@##1313")

        //对标题数组与httpUrl进行匹配查找
        const findResult = DetailData.find((detailObj) => {
            //返回的条件为httpUrl包括标题数组成员的url
            return httpUrl.indexOf(detailObj.url) !== -1
        }) || {}

        return (
            <NavBar
                mode="dark"
                leftContent={
                    <i key="1" className="iconfont666" onClick={this.goBack}>&#xe653;</i>
                }
            >{findResult.content}</NavBar>
        )
    }
}

export default withRouter(Nav2);