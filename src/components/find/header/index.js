import React, { Component } from 'react'

import { Link,withRouter } from 'react-router-dom'

//引入day.js,需要先：npm install dayjs --save
import dayjs from 'dayjs'

//转换数字格式
import { formatNumber } from '../../../utils/util'

import './style/header.scss'

class Header extends Component {
    render() {
        console.log(this.props, "HHHH")
        //将props传递过来的中的detail赋给detail
        const detail = this.props.detail

        return (
            <div className="total">
                {/* 背景图片 */}
                <img src={detail.coverImgUrl || ''} alt="歌单封面背景虚化" className="coverImgback" />
                {/* 头部主体部分 */}
                <div className="main">
                    <div className="left">
                        <img src={detail.coverImgUrl} alt="歌单封面" />
                        <p className="playCount">
                            <i key="1" className="iconfont666">&#xe7fd;</i>
                            {formatNumber(detail.playCount)}
                        </p>
                    </div>

                    <div className="right">
                        <div className="name">{detail.name}</div>
                        <div className="author">
                            <img src={detail.creator && detail.creator.avatarUrl} alt="歌单作者照片或者歌单照片" />
                            <span>{detail.creator && detail.creator.nickname}</span>
                        </div>
                        <div className="date">{dayjs(detail.updateTime).format('YYYY-MM-DD')} 更新</div>
                    </div>
                </div>

                {/* 下方评论和分享部分 */}
                <div className="footer">
                    <Link to={`/comment/${detail.id}`}>
                        <div className="footer-item">
                            <span><i key="1" className="iconfont666">&#xe809;</i> {formatNumber(detail.commentCount)}</span>
                        </div>
                    </Link>
                    <span className="line"></span>
                    <div className="footer-item">
                        <span><i key="2" className="iconfont666">&#xe7f8;</i> {formatNumber(detail.shareCount)}</span>
                    </div>
                    <span className="line"></span>
                    <div className="footer-item">
                        <span><i key="3" className="iconfont666">&#xe7eb;</i> {formatNumber(detail.subscribedCount)}</span>
                    </div>
                </div>
            </div >
        )
    }
}
export default withRouter(Header);
