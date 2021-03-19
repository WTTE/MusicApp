import React, { Component } from 'react'

import { Link, withRouter } from 'react-router-dom'

import { Badge, Icon } from 'antd-mobile';

import style from './list.module.scss'

class PodcastList2 extends Component {
    render() {
        const { title, list } = this.props
        console.log(list, "这是从电台主页面传到子组件的list")

        return (
            <div className={style.box}>
                <div onClick={() => this.props.history.push('/recommend')} className={style.content}>
                    {title}<Icon type="right" size="xs" className={style.icon} />
                </div>
                <ul>
                    {list.map(item => {
                        return <li key={item.id}>
                            {/* 路由传递params参数 */}
                            <Link to={`/podcastDetail/${item.id}`} className={style.Linkbox}>
                                <Badge text={'推'} corner>
                                    <img src={item.picUrl} alt="" />
                                </Badge>
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
export default withRouter(PodcastList2);
