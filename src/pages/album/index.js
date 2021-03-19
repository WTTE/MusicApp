import React, { Component } from 'react'
//从封装的方法中引入get请求的方法
import { get } from '../../utils/ajax'

//引入自己封装的专辑页面头部部分
import Header from '../../components/album/header'

import Songs from '../../components/singersDetail/songs'

import {inject,observer} from 'mobx-react'

@inject('appStore') @observer
class Album extends Component {
    state = {
        info: {},//初始化专辑信息
        songs: []//初始化歌手专辑页面列表
    }
    // 组件挂载完毕时执行
    componentDidMount() {
        //将通过params传递过来的数据中的id赋给id
        const id = this.props.match.params.id
        console.log(id, "这是歌手专辑页面拿到的id")
        //触发发送请求的方法getDetail
        this.getAlbum(id)
    }

    //发送请求id
    getAlbum = async (id) => {
        //发送get请求
        const res = await get(`/album?id=${id}`)
        //打印返回的结果
        console.log(res, "这是歌手专辑页面列表")
        const album = res.album || {}
        const info = {
            coverImgUrl: album.blurPicUrl,
            description: album.description,
            name: album.name,
            updateTime: album.publishTime,
            creator: {
                nickname: album.artist && album.artist.name,
                avatarUrl: album.artist && album.artist.picUrl,
            }
        }
        this.setState({
            info:info,//将专辑信息存入state的info
            songs:res.songs || []//将专辑歌曲存入state的songs
        })
    }

    onSelectSong = (obj)=>{
        this.props.appStore.onSelectSong(obj)
    }

    render() {
        const {info,songs}=this.state
        return (
            <div>
                <Header detail={info}></Header>
                <Songs list={songs} onSelectSong={this.onSelectSong}></Songs>
            </div>
        )
    }
}
export default Album;
