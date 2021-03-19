import React, { Component } from 'react'

//从封装的方法中引入get请求的方法
import { get } from '../../utils/ajax'

import dayjs from 'dayjs'

import  { formatNumber } from '../../utils/util'

import style from './comment.module.scss'

class Comment extends Component {
    state = {
        hotcommentList: [],//初始化热门评论列表
        commentList: []//初始化评论列表
    }

    componentDidMount() {
        this.getComment()
    }

    getComment = async () => {
        const id = this.props.match.params.id
        const res = await get(`/comment/playlist?id=${id}`)
        console.log(res, "这是请求返回的评论列表数据")
        this.setState({
            hotcommentList: res.hotComments,
            commentList: res.comments
        })
    }
    render() {
        const { hotcommentList, commentList } = this.state //从state中取出hotcommentList, commentList
        console.log(hotcommentList)
        console.log(commentList)

        return (
            <div className={style.comment}>
                <div className={style.hotcommentList}>精彩评论</div>
                <ul className={style.commentItem}>
                    {
                        hotcommentList.map(item =>
                            <li key={item.commentId}>
                                {/* 评论左侧图片部分 */}
                                <div className={style.left}>
                                    <img src={item.user.avatarUrl} alt="" />
                                </div>
                                {/* 评论右侧信息部分 */}
                                <div className={style.right}>
                                    <div className={style.title}>{item.user.nickname}</div>
                                    <div className={style.date}>{dayjs(item.time).format('YYYY-MM-DD')}</div>
                                    <div className={style.iconfont}><i key="1" className="iconfont666">&#xe7fe;</i>{formatNumber(item.likedCount)}</div>
                                    <div className={style.content}>{item.content}</div>
                                </div>
                            </li>)
                    }
                </ul>
                <div className={style.commentList}>热门评论</div>
                <ul className={style.commentItem}>
                    {
                        commentList.map(item =>
                            <li key={item.commentId}>
                                {/* 评论左侧图片部分 */}
                                <div className={style.left}>
                                    <img src={item.user.avatarUrl} alt="" />
                                </div>
                                {/* 评论右侧信息部分 */}
                                <div className={style.right}>
                                    <div className={style.title}>{item.user.nickname}</div>
                                    <div className={style.date}>{dayjs(item.time).format('YYYY-MM-DD')}</div>
                                    <div className={style.iconfont}><i key="1" className="iconfont666">&#xe7fe;</i>{item.likedCount}</div>
                                    <p className={style.content}>{item.content}</p>
                                </div>
                            </li>)
                    }
                </ul>
            </div>
        )
    }
}

export default Comment;
