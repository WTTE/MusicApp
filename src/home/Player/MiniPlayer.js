import React from 'react'
import style from './style/miniPlayer.module.scss'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router'
import './style/animate.scss'


@inject('appStore') @observer
class MiniPlayer extends React.Component {

    open = () => {
        this.props.appStore.setFullScreen(true)
    }
    togglePlay = (e) => {
        e.stopPropagation()
        this.props.appStore.togglePlay()
    }
    showPlaylist = (e) => {
        e.stopPropagation()
        this.props.appStore.setStore({
            isShowPlaylist: true
        })
    }

    render() {
        const { currentSong, playing } = this.props.appStore
        return (
            <div className={style['mini-player']} onClick={this.open} style={{ marginBottom: ["find", "podcast", "rankingList", "mine"].indexOf(this.props.location.pathname.split("/")[1]) > -1 ? ' 50px' : "" }}>
                <div className={style.icon}>
                    <img src={currentSong.image} alt="" className={`rotate ${playing ? '' : 'rotate-pause'}`} />
                </div>
                <div className={style.text}>
                    <h3>{currentSong.name}</h3>
                    <p>{currentSong.artists}</p>
                </div>
                <div className={style.control} onClick={this.togglePlay}>
                    <span className={`iconfont ${style.iconfont} ${playing ? 'icon-iconstop' : 'icon-icon--1'}`} />
                </div>
                <div className={style.control} onClick={this.showPlaylist}>
                    <span className={`iconfont icon-liebiao3 ${style.iconfont2}`} />
                </div>
            </div>
        )
    }
}

export default withRouter(MiniPlayer);