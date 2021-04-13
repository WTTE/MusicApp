//这是sheet的主体歌曲列表页面，需要对传入songs组件的数据进行二次处理
import React, { Component } from 'react'

import Songs from '../../components/singersDetail/songs'

import Loading from '../../components/Loading'

import PropTypes from 'prop-types'

import style from './content.module.scss'

import { inject, observer } from 'mobx-react'


@inject('appStore') @observer
class Content extends Component {
    static propTypes = {
        info: PropTypes.object,
    }
    static defaultProps = {
        info: {}
    }
    state = {
        songs: [],//初始化传入子组件Songs的数据的数组
        loading: false
    }

    componentDidUpdate(prevProps) {
        const info = this.props.info
        console.log(info, "这是content组件中的info")
        if (info !== prevProps.info) { //将传递过来的info与上个state状态的info进行比较，不同的话执行下面的setState方法
            this.setState({
                songs: info.tracks ? info.tracks.slice(0, 30) : [] //将接口返回的info数据中的tracks进行拆分，从下标0到下标30
            })
        }
    }

    getSongs = (size = 0) => {
        const { info } = this.props
        const allList = info.tracks ? info.tracks.slice() : []

        if (this.state.songs.length >= allList.length) {
            return
        }

        this.setState({
            loading: true
        })

        let list = []
        //增加两秒的延迟，实际项目中可以不用，这里只是为显示这样一个加载中的过程
        setTimeout(() => {
            list = allList.slice(size, size + 30)
            this.setState({
                songs: this.state.songs.concat(list),
                loading: false
            })
        }, 2000)
    }

    loadingMore = () => {
        if (this.state.loading) {
            return
        }
        const size = this.state.songs.length
        this.getSongs(size)
    }

    onSelectSong = (obj) => {
        this.props.appStore.onSelectSong(obj)
    }

    render() {
        const { info } = this.props

        const { songs, loading } = this.state

        console.log(songs, "这是经过slice处理过的songs数组")

        const { currentSong, playlist } = this.props.appStore

        const h = playlist.length ? 60 : 0
        const height = { height: `calc(100vh - ${180 + h}px` }

        return (
            <div className={style.content} style={height}>
                <Songs list={songs} loading={loading} loadingMore={this.loadingMore} onSelectSong={this.onSelectSong} currentSong={currentSong}></Songs>
                <Loading loading={this.props.loading} />
            </div>
        )
    }
}

export default Content;