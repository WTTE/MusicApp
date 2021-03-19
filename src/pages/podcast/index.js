import React, { Component } from 'react'

//引入Tab组件
import { Tabs } from 'antd-mobile';

//引入自己封装的轮播图组件
import MyCarousel from '../../components/find/carousel'

import PodcastList from '../../components/podcast/list'
import PodcastList2 from '../../components/podcast/list2'

import TopList from '../../components/podcast/topList'

//从封装的方法中引入get请求的方法
import { get } from '../../utils/ajax'

import style from './podcast.module.scss'

class Podcast extends Component {
    state = {
        banners: [],//初始化轮播图数组
        recommend: [],//初始化推荐电台数组
        hot: [],//初始化热门电台数据
        rankingList: []//初始化排行榜列表
    }

    componentDidMount() {
        this.initPage()
    }
    initPage = () => {
        Promise.all([
            this.getBanners(),//获取轮播图数据
            this.getRecommend(),//获取推荐电台
            this.getHot(),//获取热门电台
            this.getRankingList()//获取排行榜数据
        ])
    }

    //获取轮播图数据
    getBanners = async () => {
        const res = await get('/dj/banner')
        //打桩查看获取到的轮播图数组
        console.log(res, "dj的banner")
        this.setState({
            banners: res.data
        })
    }

    //获取推荐电台
    getRecommend = async () => {
        const res = await get('/personalized/djprogram')
        console.log(res, "dj的推荐电台数据")
        this.setState({
            recommend: res.result
        })
    }

    //获取热门电台
    getHot = async () => {
        const res = await get('/dj/hot?limit=20')
        console.log(res, "dj的热门电台数据")
        this.setState({
            hot: res.djRadios
        })
    }

    //获取排行榜数据
    getRankingList = async () => {
        const res = await get('/dj/program/toplist?limit=28')
        console.log(res, "dj的排行榜数据")
        this.setState({
            rankingList: res.toplist
        })
    }

    render() {
        const { banners, recommend, hot, rankingList } = this.state

        //tab标签栏标签
        const tabs = [
            { title: '推荐电台' },
            { title: '排行榜' }
        ];
        return (
            <div className={style.podcast}>
                {/* 注意使用swipeable={false}取消Tabs组件滑动切换 */}
                <Tabs tabs={tabs} tabBarActiveTextColor='rgb(203, 63, 46)' swipeable={false}>
                    <div>
                        {/* 轮播图部分 */}
                        <MyCarousel banners={banners}></MyCarousel>
                        {/* 付费精品部分 */}
                        <PodcastList2 title={"电台推荐"} list={recommend}></PodcastList2>
                        {/* 热门电台部分 */}
                        <PodcastList title={"热门电台"} list={hot}></PodcastList>


                    </div>

                    <div>
                        <TopList list={rankingList}></TopList>
                    </div>

                </Tabs>

            </div >
        )
    }
}
export default Podcast;