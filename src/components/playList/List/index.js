import React, { useState, useEffect } from 'react'

import { PullToRefresh } from 'antd-mobile';

//转换数字格式
import { formatNumber } from '../../../utils/util'

import { Link, withRouter } from 'react-router-dom'

import style from './playList.module.scss'

// const Item = List.Item;
// const Brief = Item.Brief;

const List2 = (props) => {
    //上拉刷新部分初始化
    let [refreshing, setRefreshing] = useState(false)
    let [down] = useState(false)//将方向由下拉改成上拉
    let [height] = useState(document.documentElement.clientHeight)

    //只要父组件给当前组件传递了新的props.songsList，那么就把当前PullToRefresh的状态变为false
    useEffect(() => {
        setRefreshing(false)
    }, [props.songsList])//如果父亲传过来的songsList发生改变，就将setRefreshing变为false

    return (
        <div className={style.playList}>
            <div className={style.content}>
                {props.title}歌单
            </div>
            {/* 使用上拉刷新组件对原本组件进行包裹 */}
            <PullToRefresh
                //拉动多少回触发刷新
                distanceToRefresh={30}
                //指定样式
                style={{
                    height: height - 50,
                    overflow: 'auto',
                }}
                //指定提示文字
                indicator={down ? {} : { deactivate: '上拉加载更多' }}
                //指定拉动方向
                direction={down ? 'down' : 'up'}
                //PullToRefresh是否正在刷新
                refreshing={refreshing}
                //刷新之后回调函数
                onRefresh={() => {
                    console.log("正在加载")
                    setRefreshing(true)
                    props.changeIndex && props.changeIndex();
                }}
                getScrollContainer={() => (undefined)}
            >
                <ul>
                    {props.songsList.map(item => {
                        return <li key={item.name}>
                            {/* 路由传递params参数 */}
                            <Link to={`/sheet/${item.id}`} className={style.box}>
                                <img src={item.coverImgUrl} alt="" />
                                <div>{item.name}</div>
                                <p className={style.playCount}>
                                    {/* <i key="1" className={style.iconfont1}>&#xe7fd;</i> */}
                                    {formatNumber(item.playCount)}
                                </p>
                            </Link>
                        </li>
                    })
                    }
                </ul>
            </PullToRefresh>
        </div>

    )
}

export default withRouter(List2);
