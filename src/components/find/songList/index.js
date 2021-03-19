import React, { Component } from 'react'

import { Link, withRouter } from 'react-router-dom'

import { Icon } from 'antd-mobile';

//转换数字格式
import { formatNumber } from '../../../utils/util'

import './songs.scss'

class Songs extends Component {
    render() {
        const { hotsongList } = this.props
        console.log(hotsongList, "@@@@@@@@@@")

        return (
            <div className="recommend-box">
                <div onClick={() => this.props.history.push('/songList')} className="recommend-content">
                    热门歌单 <Icon type="right" size="xs" className="recommend-icon" />
                </div>
                <ul>
                    {hotsongList.map(sheet => {
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
