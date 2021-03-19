import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Find from '../pages/find'
import RankingList from '../pages/rankingList'
// import Podcast from '../pages/podcast'
import MyPage from '../pages/mine'
import SongList from '../pages/songList'
import Recommend from '../pages/recommend'
import Singers from '../pages/singers'
import SheetPage from '../pages/sheet'
import PlayList from '../pages/playList'
import SingersDetail from '../pages/singersDetail'
import Album from '../pages/album'
import Comment from '../pages/comment'
import PodcastDetail from '../pages/podcastDetail'
import PodcastDetail2 from '../pages/podcastDetail2'
import Search from '../pages/search'
import Player from '../home/Player'
import HistoryPage from '../pages/historyPage'

import { inject, observer } from 'mobx-react'
import style from './mask.module.scss'

@inject('appStore') @observer
class RouterMap extends Component {
    toggleExpand = () => {
        this.props.appStore.toggleExpand()
    }

    render() {
        const { isExpandSider } = this.props.appStore
        return (
            <div>
                <div>
                    <Switch>
                        <Route path="/find" exact component={Find} />
                        <Route path="/rankingList" component={RankingList} />

                        {/* 电台功能被砍，直接跳转歌单 */}
                        <Route path="/podcast" component={SongList} />
                        
                        <Route path="/mine" component={MyPage} />
                        <Route path="/songList" component={SongList} />
                        <Route path="/recommend" component={Recommend} />
                        <Route path="/singers" component={Singers} />
                        <Route path={`/singersDetail/:id`} component={SingersDetail} />
                        <Route path={`/sheet/:id`} component={SheetPage} />
                        <Route path={`/playList/:id`} component={PlayList} />
                        <Route path={`/album/:id`} component={Album} />
                        <Route path={`/comment/:id`} component={Comment} />
                        <Route path={`/podcastDetail/:id`} component={PodcastDetail} />
                        <Route path="/podcastDetail2" component={PodcastDetail2} />
                        <Route path="/search" component={Search} />
                        <Route path={`/history`} component={HistoryPage}/>

                        <Redirect to="/find" />
                    </Switch>
                </div>
                <Player />
                {isExpandSider && <div className={style.mask} onClick={this.toggleExpand} />}
            </div>
        )
    }
}

export default RouterMap;