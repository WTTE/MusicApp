import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import MiniPlayer from './MiniPlayer'
import NormalPlayer from './NormalPlayer'
import PlayList from './PlayList'
import { withRouter } from 'react-router-dom'

@inject('appStore') @observer
class Player extends Component {

    componentDidMount() {
        this.props.appStore.setStore({
            audio: this.audio
        })
    }

    onCanPlay = () => {
        this.props.appStore.onCanPlay()
    }
    onError = () => {
        this.props.appStore.onError()
    }
    onEnded = () => {
        this.props.appStore.onEnded()
    }
    onTimeUpdate = (e) => {
        this.props.appStore.onTimeUpdate(e)
    }

    //判断在何页面展示MiniPlayer
    MiniPlayerOpen = () => {
        var exceptUrl = ["history/isHistory=1", "history"]
        //注意this.props.location.pathname取到的字符串包含特殊字符，需要处理后进行比较
        const pathUrl = this.props.location.pathname.split("/")[1]
        console.log(pathUrl, "这是MiniPlayerOpen中的pathUrl")
        if (exceptUrl.indexOf(pathUrl) > -1) {
            // console.log("迷你播放器不弹出")
            return null;
        }
        else {
            // console.log("弹出！！！")
            return <MiniPlayer></MiniPlayer>;
        }
    }


    render() {
        const { playlist, currentSong, isShowPlaylist, playingLineNum, isFullScreen } = this.props.appStore
        return (
            <div style={{ display: playlist.length > 0 ? '' : 'none' }}>
                <NormalPlayer playingLineNum={playingLineNum} isFullScreen={isFullScreen} />

                {/* 在什么页面展示Mini播放器的判断 */}
                {this.MiniPlayerOpen()}

                <PlayList currentSong={currentSong} isShowPlaylist={isShowPlaylist} />

                {/* 使用H5的audio标签实现音乐播放 */}
                <audio
                    onCanPlay={this.onCanPlay}
                    onError={this.onError}
                    onEnded={this.onEnded}
                    onTimeUpdate={this.onTimeUpdate}
                    src={currentSong.url}
                    ref={audio => this.audio = audio} />
            </div>
        )
    }
}

export default withRouter(Player);