import React, { Component } from 'react'

import { get } from '../../utils/ajax'
import { withRouter } from 'react-router-dom'

import './rankingList.scss'

class RankingList extends Component {

    //初始化state
    state = {
        rankingList: [],
        rankingList2: []
    }

    //组件挂载完毕获取排行榜数据
    componentDidMount() {
        this.getTopList()
    }
    //获取排行榜数据的方法
    getTopList = async () => {
        //获取数据
        const res = await get('/toplist/detail')
        const list = res.list

        console.log(list, "排行榜数据")
        this.setState({
            //对获取到的list进行拆分处理，分别保存到state中的rankingList和rankingList2
            rankingList: list.slice(0, 4),
            rankingList2: list.slice(4)
        })
    }

    //定义跳转排行榜歌单详情页面的方法，利用编程式路由导航进行跳转
    goDetail = (id) => {
        const { history } = this.props
        //编程式路由导航
        history.push(`/sheet/${id}?isTop=1`)
    }


    render() {
        //从state中获取rankinglist，rankingList2
        const { rankingList, rankingList2 } = this.state

        return (
            <div className="listTotal">
                <div className="title">官方榜</div>
                <div className="style-box1">
                    <ul >
                        {rankingList.map((item) => {
                            return (
                                <li key={item.id} className="list-item" onClick={() => this.goDetail(item.id)}>
                                    <div>
                                        <img src={item.coverImgUrl} alt="官方排行榜歌单封面图片" />
                                        <b className="updateState">{item.updateFrequency}</b>
                                    </div>
                                    <div className="list-info">
                                        <div className="name">{item.name}</div>
                                        <div>
                                            {item.tracks.map((song, index) => <p key={song.first}>{index + 1}.{song.first} - {song.second}</p>)}
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="title">更多榜单</div>
                <div className="style-box2">
                    <ul>
                        {rankingList2.map((item) => {
                            return (
                                <li key={item.id} className="list2-item" onClick={() => this.goDetail(item.id)}>
                                    <div className="img-box">
                                        <img src={item.coverImgUrl} alt="其他排行榜歌单封面图" />
                                    </div>
                                    <b className="updateState2">{item.updateFrequency}</b>
                                    <div className="list2-info">
                                        {item.name}
                                    </div>

                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}


export default withRouter(RankingList);