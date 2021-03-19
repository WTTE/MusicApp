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
        const exceptUrl = ["/singersDetail", "/history","/history/isHistory=1"]
        if (exceptUrl.indexOf(this.props.location.pathname) !== -1) {
            return null;
        }
        else {
            return <MiniPlayer />
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