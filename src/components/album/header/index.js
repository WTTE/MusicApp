import React, { Component } from 'react'

//引入day.js,需要先：npm install dayjs --save
import dayjs from 'dayjs'

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
            </div>
        )
    }
}

export default Header;