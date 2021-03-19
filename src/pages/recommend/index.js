import React, { Component } from 'react'

import { Link, withRouter } from 'react-router-dom'

//从封装的方法中引入get请求的方法
import { get } from '../../utils/ajax'


//转换数字格式
import { formatNumber } from '../../utils/util'

import style from './recommend.module.scss'

class Recommend extends Component {
    state={
        list:[]//初始化推荐页面的歌单数据数组
    }

    componentDidMount(){
        this.getRecommend()
    }
    
    //获取每日推荐歌单数据
    getRecommend = async () => {
        const res = await get('/personalized')
        //打桩查看获取到的每日推荐歌单数据
        console.log(res, "这是每日推荐的歌单数据页面")
        this.setState({
            list: res.result.slice(0, 30)
        })
    }


    render() {
        //从父亲find传过来的props中解构赋值出recommendList
        const { list } = this.state
        console.log(list, "@@@@@@@@@@")

        return (
            <div className={style.box}>
                <div onClick={() => this.props.history.push('/recommend')} className={style.content}>
                    每日推荐
                </div>
                <ul>
                    {list.map(sheet => {
                        return <li key={sheet.id}>
                            {/* 路由传递params参数 */}
                            <Link to={`/sheet/${sheet.id}`} className={style.Linkbox}>
                                <img src={sheet.picUrl} alt="" />
                                <div>{sheet.name}</div>
                                <p className={style.playCount}>
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

export default withRouter(Recommend);