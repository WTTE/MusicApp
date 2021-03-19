import React, { Component } from 'react'

import { Link, withRouter } from 'react-router-dom'

import { Icon } from 'antd-mobile';

//转换数字格式
import { formatNumber } from '../../../utils/util'

import './dailyRecommend.scss'

class DailyRecommend extends Component {
    render() {
        //从父亲find传过来的props中解构赋值出recommendList
        const { recommendList } = this.props
        console.log(recommendList, "@@@@@@@@@@")

        return (
            <div className="recommend-box">
                <div onClick={() => this.props.history.push('/recommend')} className="recommend-content">
                    每日推荐 <Icon type="right" size="xs" className="recommend-icon" />
                </div>
                <ul>
                    {recommendList.map(sheet => {
                        return <li key={sheet.id}>
                            {/* 路由传递params参数 */}
                            <Link to={`/sheet/${sheet.id}`} className="sheet-box">
                                <img src={sheet.picUrl} alt="" />
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

export default withRouter(DailyRecommend);