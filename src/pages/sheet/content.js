//这是sheet的主体歌曲列表页面，需要对传入songs组件的数据进行二次处理
import React, { Component } from 'react'

import Songs from '../../components/singersDetail/songs'

import style from './content.module.scss'

import { inject, observer } from 'mobx-react'


@inject('appStore') @observer
class Content extends Component {

    state = {
        songs: []//初始化传入子组件Songs的数据的数组
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

    onSelectSong = (obj) => {
        this.props.appStore.onSelectSong(obj)
    }

    render() {
        const { songs } = this.state
     
        console.log(songs, "这是经过slice处理过的songs数组")
        return (
            <div className={style.content}>
                <Songs list={songs} onSelectSong={this.onSelectSong}></Songs>
            </div>
        )
    }
}

export default Content;