import React, { Component } from 'react'

//引入自己封装的轮播图组件
import MyCarousel from '../../components/find/carousel'

//引入自己封装的标签组件
import Tags from '../../components/find/tag'

//引入自己封装的每日推荐组件
import DailyRecommend from '../../components/find/dailyRecommend'

//引入自己封装的歌单组件
import Songs from '../../components/find/songList'

//从封装的方法中引入get请求的方法
import { get } from '../../utils/ajax'

import './find.scss'

class Find extends Component {
    state = {
        banners: [],//初始化轮播图数组
        recommendList: [],  //初始化每日推荐歌单
        hotsongList: [] //初始化热门歌单
    }

    //当组件挂载完毕，执行getBanners方法获取轮播图数据
    componentDidMount() {
        this.initPage()
    }
    initPage = () => {
        Promise.all([
            this.getBanners(),
            this.getRecommends(),
            this.getHotsongList()
        ])
    }
    //获取轮播图数据
    getBanners = async () => {
        const res = await get('/banner')
        //打桩查看获取到的轮播图数组
        console.log(res.banners, "11111111")
        this.setState({
            //将返回的res.banners赋给banners
            banners: res.banners
        })
    }

    //获取每日推荐歌单数据
    getRecommends = async () => {
        const res = await get('/personalized')
        //打桩查看获取到的每日推荐歌单数据
        console.log(res, "000000000")
        this.setState({
            //取前六个
            recommendList: res.result.slice(0, 6)
        })
    }

    //获取热门歌单数据
    getHotsongList = async () => {
        //发送请求
        const res = await get('/top/playlist/highquality?limit=6')
        //打桩查看获取到的热门歌单数据
        console.log(res, "99999999999")
        this.setState({
            //将返回的res.playlists赋给hotsongList
            hotsongList: res.playlists
        })
    }

    render() {
        console.log(this.state, "2222222")
        const { banners, recommendList, hotsongList } = this.state

        return (
            <div className="container">
                {/* 轮播图部分 */}
                <MyCarousel banners={banners}></MyCarousel>

                {/* 标签部分 */}
                <Tags></Tags>


                {/* 分界线  */}
                <hr />

                {/* 每日推荐部分 */}
                <DailyRecommend recommendList={recommendList}></DailyRecommend>

                {/* 分界线  */}
                <hr />

                {/* 歌单部分 */}
                <Songs hotsongList={hotsongList}></Songs>

            </div >
        )
    }
}


export default Find;