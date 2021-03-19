import React, { Component } from 'react'
import dayjs from 'dayjs'
//从封装的方法中引入get请求的方法
import { get } from '../../utils/ajax'
import Loading from '../../components/Loading'
import { withRouter } from 'react-router-dom'

//引入Tab组件
import { Tabs } from 'antd-mobile';

import Songs from '../../components/singersDetail/songs'
// import Albums from '../../components/singersDetail/albums'

import style from './content.module.scss'
import Scroll from '../../components/scroll';

import { inject, observer } from 'mobx-react'
@inject('appStore') @observer
class Content extends Component {

    //初始化state
    state = {
        id: "",//歌手的id
        songs: [],//歌手热门歌曲列表
        albums: [],//歌手专辑的列表
        singerinfo: {},//歌手信息
        songsLoading: false, //获取单曲的loading
        albumsLoading: false, //获取专辑的loading
    }


    componentDidMount() {
        //拿到父组件通过params传过来的id
        const { id } = this.props
        console.log(id, "idididididididid")
        //将id保存到state状态中
        this.setState({
            id
        })
        this.getSongs(id)
    }

    //获取歌手数据的方法
    getSongs = async (id) => {
        // 有数据就不再去请求
        if (this.state.songs.length) {
            return
        }
        this.setState({
            songsLoading: true
        })
        //没有数据发送请求拿取歌手数据
        const res = await get(`/artists?id=${id}`)
        console.log(res, "单曲部分已选择")
        this.setState({
            songsLoading: false,
            songs: res.hotSongs || []
        })
    }


    //获取专辑列表的方法
    getAlbums = async (id) => {
        //有数据就不再去请求
        if (this.state.albums.length) {
            return
        }
        this.setState({
            albumsLoading: true
        })
        //没有数据发送请求拿取歌手数据
        const res = await get(`/artist/album?id=${id}`)
        console.log(res, "专辑部分已选择")
        this.setState({
            albumsLoading: false,
            albums: res.hotAlbums || []
        })
    }

    //获取歌手简介信息的方法
    getSingerInfo = async (id) => {
        if (this.state.singerinfo.briefDesc) {
            return
        }
        const res = await get(`/artist/desc?id=${id}`)
        console.log(res, "简介部分已选择")
        this.setState({
            singerinfo: res
        })
    }

    handleChange = (tab, index) => {
        const id = this.state.id
        switch (index) {
            case 0: {
                this.getSongs(id)
                break;
            }
            case 1: {
                this.getAlbums(id)
                break;
            }
            case 2: {
                this.getSingerInfo(id)
                break;
            }
            default: {
                this.getSongs(id)
            }
        }
    }
    onSelectSong = (obj) => {
        this.props.appStore.onSelectSong(obj)
    }

    goTo = (url) => {
        this.props.history.push(url)
    }

    render() {
        const { songs, songsLoading, albums, albumsLoading, singerinfo } = this.state
        const { currentSong, playlist } = this.props.appStore

        console.log(singerinfo, "检查简介部分的info")

        //tab标签栏标签
        const tabs = [
            { title: '单曲' },
            { title: '专辑' },
            { title: '简介' }
        ];

        const h = playlist.length ? 60 : 0
        const height = { height: `calc(100vh - ${88 + h}px` }

        return (

            <Tabs tabs={tabs} tabBarActiveTextColor='rgb(203, 63, 46)' initialPage={0} onChange={this.handleChange}>
                <div>
                    {/* 歌手歌曲列表部分 */}
                    <div className={style.item} style={height}>
                        <Songs list={songs} onSelectSong={this.onSelectSong} currentSong={currentSong}></Songs>
                        <Loading loading={songsLoading} style={{ position: 'absolute', top: '50%' }} />
                    </div>
                </div>
                <div>
                    {/* 歌手专辑列表部分 */}
                    <div className={style.item} style={height}>
                        <Scroll>
                            <div className={style.albumsList}>
                                <ul className={style.albums}>
                                    {
                                        albums.map(item => <li key={item.id} onClick={() => this.goTo(`/album/${item.id}`)}>

                                            <div className={style.left}>
                                                <img src={item.picUrl} alt="" />
                                            </div>

                                            <div className={style.right}>
                                                <div className={style.title}>{item.name}</div>
                                                <div className={style.date}>{dayjs(item.publishTime).format('YYYY-MM-DD')}&nbsp;&nbsp;{item.size}首</div>
                                            </div>
                                        </li>)
                                    }
                                </ul>
                            </div>
                        </Scroll>
                    </div>
                    <Loading loading={albumsLoading} style={{ position: 'absolute', top: '50%' }} />
                </div>
                <div>
                    {/* 歌手简介部分 */}
                    <div className={style.item} style={height}>
                        <div className={style.singerinfo}>
                            <div className={style.title}>
                                简介:
                            </div>
                            <div className={style.info}>
                                {singerinfo.briefDesc}
                            </div>
                        </div>
                    </div>
                </div>
            </Tabs>

        )
    }
}

export default withRouter(Content);