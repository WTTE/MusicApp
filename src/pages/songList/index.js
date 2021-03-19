import React, { Component } from 'react'

import MyCarousel from '../../components/songList/carousel'
import Songs from '../../components/songList/songList'

//从封装的方法中引入get请求的方法
import { get } from '../../utils/ajax'

import './songList.scss'

class SongList extends Component {
    state = {
        banners: [],//初始化轮播图数组
        chinasongs: [],//华语歌单数据
        englishsongs: [],//欧美歌单数据
        japansongs: [],//日语歌单数据
        koreasongs: [],//韩语歌单数据
        yueyusongs: [],//粤语歌单数据
        rocksongs: [],//摇滚歌单数据
        propularsongs: [],//流行乐歌单数据
        electronicsongs: [],//电子音乐歌单数据
        acgsongs: [],//ACG歌单数据
        saysongs: [],//说唱歌单数据
        traditionalsongs: []//民谣歌单数
    }


    //当组件挂载完毕，执行getBanners方法获取轮播图数据
    componentDidMount() {
        this.initPage()
    }
    initPage = () => {
        Promise.all([
            this.getBanners(),
            this.getChinesesongs(),
            this.getEnglishsongs(),
            this.getJapansongs(),
            this.getKoreasongs(),
            this.getYueyusongs(),
            this.getRocksongs(),
            this.getPropularsongs(),
            this.getElectronicsongs(),
            this.getAcgsongs(),
            this.getSaysongs(),
            this.getTraditionalsongs()
        ])
    }

    //获取轮播图数据
    getBanners = async () => {
        const res = await get('/top/playlist')
        //打桩查看获取到的轮播图数组
        console.log(res.playlists, "res.playlists")
        this.setState({
            //将返回的res.banners赋给banners
            banners: res.playlists.splice(0, 5)
        })
    }
    getChinesesongs = async () => {
        const res = await get('/top/playlist?cat=华语&limit=6')
        this.setState({
            chinasongs: res.playlists
        })
    }
    getEnglishsongs = async () => {
        const res = await get('/top/playlist?cat=欧美&limit=6')
        this.setState({
            englishsongs: res.playlists
        })
    }
    getJapansongs = async () => {
        const res = await get('/top/playlist?cat=日语&limit=6')
        this.setState({
            japansongs: res.playlists
        })
    }
    getKoreasongs = async () => {
        const res = await get('/top/playlist?cat=韩语&limit=6')
        this.setState({
            koreasongs: res.playlists
        })
    }
    getYueyusongs = async () => {
        const res = await get('/top/playlist?cat=粤语&limit=6')
        this.setState({
            yueyusongs: res.playlists
        })
    }
    getRocksongs = async () => {
        const res = await get('/top/playlist?cat=摇滚&limit=6')
        this.setState({
            rocksongs: res.playlists
        })
    }
    getPropularsongs = async () => {
        const res = await get('/top/playlist?cat=流行&limit=6')
        this.setState({
            propularsongs: res.playlists
        })
    }
    getElectronicsongs = async () => {
        const res = await get('/top/playlist?cat=电子&limit=6')
        this.setState({
            electronicsongs: res.playlists
        })
    }
    getAcgsongs = async () => {
        const res = await get('/top/playlist?cat=ACG&limit=6')
        this.setState({
            acgsongs: res.playlists
        })
    }
    getSaysongs = async () => {
        const res = await get('/top/playlist?cat=说唱&limit=6')
        this.setState({
            saysongs: res.playlists
        })
    }
    getTraditionalsongs = async () => {
        const res = await get('/top/playlist?cat=民谣&limit=6')
        this.setState({
            traditionalsongs: res.playlists
        })
    }

    render() {
        const { banners, chinasongs, englishsongs, japansongs, koreasongs, yueyusongs, rocksongs, propularsongs, electronicsongs, acgsongs, saysongs, traditionalsongs } = this.state

        return (
            <div className="All">
                {/* 轮播图部分 */}
                <div className="MyCarousel">
                    <MyCarousel banners={banners}></MyCarousel>
                </div>

                {/* 下方歌单部分 */}
                <div className="song">
                    <Songs title={"华语歌单"} songList={chinasongs} ></Songs>
                </div>
                <div className="song">
                    <Songs title={"欧美歌单"} songList={englishsongs} ></Songs>
                </div>
                <div className="song">
                    <Songs title={"日语歌单"} songList={japansongs} ></Songs>
                </div>
                <div className="song">
                    <Songs title={"韩语歌单"} songList={koreasongs} ></Songs>
                </div>
                <div className="song">
                    <Songs title={"粤语歌单"} songList={yueyusongs} ></Songs>
                </div>
                <div className="song">
                    <Songs title={"摇滚歌单"} songList={rocksongs} ></Songs>
                </div>
                <div className="song">
                    <Songs title={"流行歌单"} songList={propularsongs} ></Songs>
                </div>
                <div className="song">
                    <Songs title={"电子歌单"} songList={electronicsongs} ></Songs>
                </div>
                <div className="song">
                    <Songs title={"ACG歌单"} songList={acgsongs} ></Songs>
                </div>
                <div className="song">
                    <Songs title={"说唱歌单"} songList={saysongs} ></Songs>
                </div>
                <div className="song">
                    <Songs title={"民谣歌单"} songList={traditionalsongs} ></Songs>
                </div>
            </div>
        )
    }
}

export default SongList;