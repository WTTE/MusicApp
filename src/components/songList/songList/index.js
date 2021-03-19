import React, { Component } from 'react'

import { Link, withRouter } from 'react-router-dom'

import { Icon } from 'antd-mobile';

//转换数字格式
import { formatNumber } from '../../../utils/util'

import './songs.scss'

class Songs extends Component {
    render() {
        const { title, songList } = this.props
        // console.log(title, songList, "@@@@@@@@@@")

        //使用字符串截取，将传过来的title中的"歌单"两字去掉
        const cat = title.substring(0, title.length - 2)
        console.log(cat, "cat")

        return (
            <div className="recommend-box">
                <div onClick={() => this.props.history.push(`/playList/${cat}`)} className="recommend-content">
                    {title} <Icon type="right" size="xs" className="recommend-icon" />
                </div>
                <ul>
                    {songList.map(sheet => {
                        return <li key={sheet.id}>
                            <Link to={`/sheet/${sheet.id}`} className="sheet-box">
                                <img src={sheet.coverImgUrl} alt="" />
                                <div>{sheet.name}</div>
                                <p className="playCount">
                                    <i key="1" className="iconfont666">&#xe7fd;</i>
                                    {formatNumber(sheet.playCount)}
                                </p>
                            </Link>
                        </li>
                    })
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(Songs);
