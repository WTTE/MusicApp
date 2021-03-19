import React, { Component } from 'react'

import { Link, withRouter } from 'react-router-dom'

import { Icon } from 'antd-mobile';

import style from './list.module.scss'

class PodcastList extends Component {
    render() {
        const { title, list } = this.props
        console.log(list, "这是从电台主页面传到子组件的list")

        return (
            <div className={style.box}>
                <div onClick={() => this.props.history.push('/recommend')} className={style.content}>
                    {title} <Icon type="right" size="xs" className={style.icon} />
                </div>
                <ul>
                    {list.map(item => {
                        return <li key={item.id}>
                            {/* 路由传递state参数 */}
                            <Link to={{ pathname: '/podcastDetail2', state: { name: item.name, coverUrl: item.picUrl, description: item.rcmdtext, createTime: item.createTime } }} className={style.Linkbox}>
                                <img src={item.picUrl} alt="" />
                                <div>{item.name}</div>
                            </Link>
                        </li>
                    })
                    }
                </ul>
            </div>
        )
    }
}
export default withRouter(PodcastList);
