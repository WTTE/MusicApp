import React, { Component } from 'react'
import { Badge } from 'antd-mobile';
import { Link, withRouter } from 'react-router-dom'
import style from './topList.module.scss'

class TopList extends Component {

    goTo = (url) => {
        this.props.history.push(url)
    }

    render() {
        const { list } = this.props
        console.log(list, "这是传到电台排行榜页面的list")

        return (
            <div className={style.topList}>
                <ul className={style.top}>
                    {
                        list.map(item =>
                            <Link to={{ pathname: '/podcastDetail2', state: { name: item.program.name, coverUrl: item.program.coverUrl, description: item.program.description, createTime: item.program.createTime } }} className={style.Linkbox}>
                                <li key={item.rank} >
                                    {/* 电台排名左侧图片部分 */}
                                    <div className={style.left}>
                                        <Badge text={item.rank} corner>
                                            <img src={item.program.coverUrl} alt="" />
                                        </Badge>
                                    </div>

                                    {/* 电台排名名称和信息部分 */}
                                    <div className={style.right}>
                                        <div className={style.title}>{item.program.name}</div>
                                        <div className={style.content}>简介：{item.program.description}</div>
                                    </div>
                                </li>
                            </Link>

                        )
                    }
                </ul>
            </div>
        )
    }
}
export default withRouter(TopList);
