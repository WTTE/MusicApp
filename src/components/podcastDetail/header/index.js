import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

//引入day.js,需要先：npm install dayjs --save
import dayjs from 'dayjs'

import style from './podcastDetail.module.scss'

class Header extends Component {
    render() {
        const { detail } = this.props
        console.log(detail, "这是电台详情页面头部部分接收到的父亲传过来的detail")

        return (
            <div className={style.total}>
                {/* 背景图片 */}
                <img src={detail.coverUrl || ''} alt="歌单封面背景虚化" className={style.coverImgback} />
                {/* 头部主体部分 */}
                <div className={style.main}>
                    <div className={style.left}>
                        <img src={detail.coverUrl || ''} alt="歌单封面" />
                    </div>

                    <div className={style.right}>
                        <div className={style.name}>{detail.name}</div>
                        <div className={style.description}>
                            <div>简介：{detail.description}</div>
                        </div>
                        <div className={style.date}>{dayjs(detail.createTime).format('YYYY-MM-DD')} 发布</div>
                    </div>
                </div>
            </div >
        )
    }
}

export default withRouter(Header);