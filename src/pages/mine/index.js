import React from 'react'
import { Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import user from './user.png'
import { get } from '../../utils/ajax'
//引入自己封装的每日推荐组件
import DailyRecommend from '../../components/find/dailyRecommend'

import style from './style/index.module.scss'

@inject('appStore') @observer
class MyPage extends React.Component {

    state = {
        recommendList: []
    }

    //当组件挂载完毕，执行getBanners方法获取轮播图数据
    componentDidMount() {
        this.getRecommends()
    }

    //获取每日推荐歌单数据
    getRecommends = async () => {
        const res = await get('/personalized')
        //打桩查看获取到的每日推荐歌单数据
        console.log(res, "000000000")
        this.setState({
            //取前六个
            recommendList: res.result.slice(0, 12)
        })
    }

    goTo = (url) => {
        this.props.history.push(url)
    }

    render() {
        const { likeSongs, playHistorys } = this.props.appStore
        const { recommendList } = this.state
        return (
            <div className={style.container}>
                {/* 头像昵称部分 */}
                <div className={style.user}>
                    <div className={style.img}>
                        <img src={user} alt="" />
                    </div>

                    <div className={style.name}>
                        <span>Sonder.</span>
                        <p className={style.vip}>SVIP</p>
                        <p className={style.vipLevel}>Lv.12</p>
                    </div>

                    <div className={style.Icon}>
                        <Icon type="right" size="md" className="recommend-icon" />
                    </div>
                </div>

                {/* 功能框部分 */}
                <div className={style.section}>
                    <ul>

                        <li>
                            <i key="1" className="iconfont666" style={{ fontSize: "21px", color: "rgb(203, 63, 46)" }}>&#xe813;</i>
                            <div className={style.title}>本地歌曲</div>
                            <div className={style.number}>0首</div>
                            <i key="2" className="iconfont666" style={{ fontSize: "18px", color: "rgb(203, 63, 46)" }}>&#xe60c;</i>
                        </li>

                        <li>
                            <i key="3" className="iconfont666" style={{ fontSize: "21px", color: "rgb(203, 63, 46)" }}>&#xe823;</i>
                            <div className={style.title} onClick={() => this.goTo('/history/isHistory=1')}>播放历史</div>
                            <div className={style.number}>{playHistorys.length}首</div>
                            <i key="4" className="iconfont666" style={{ fontSize: "18px", color: "rgb(203, 63, 46)" }}>&#xe60c;</i>
                        </li>

                        <li>
                            <i key="5" className="iconfont666" style={{ fontSize: "19px", color: "rgb(203, 63, 46)" }}>&#xe81a;</i>
                            <div className={style.title} onClick={() => this.goTo('/history')}>我的喜欢</div>
                            <div className={style.number}>{likeSongs.length}首</div>
                            <i key="6" className="iconfont666" style={{ fontSize: "18px", color: "rgb(203, 63, 46)" }}>&#xe60c;</i>
                        </li>

                        <li>
                            <i key="7" className="iconfont666" style={{ fontSize: "21px", color: "rgb(203, 63, 46)" }}>&#xe7f9;</i>
                            <div className={style.title}>我的下载</div>
                            <div className={style.number}>0首</div>
                            <i key="8" className="iconfont666" style={{ fontSize: "18px", color: "rgb(203, 63, 46)" }}>&#xe60c;</i>
                        </li>

                    </ul>
                </div>

                {/* 推荐部分 */}
                <DailyRecommend recommendList={recommendList}></DailyRecommend>


            </div>
        )
    }
}

export default withRouter(MyPage);