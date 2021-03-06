import React, { Component } from 'react'
//从封装的方法中引入get请求的方法
import { get } from '../../utils/ajax'

//引入自己封装的页面头部部分
import Header from '../../components/find/header'

import Content from './content'

class SheetPage extends Component {
    state = {
        detail: {},//初始化详情列表
        loading: false
    }

    // 组件挂载完毕时执行
    componentDidMount() {
        //将通过params传递过来的数据中的id赋给id
        const id = this.props.match.params.id
        //触发发送请求的方法getDetail
        this.getDetail(id)
    }

    //发送请求
    getDetail = async (id) => {
        this.setState({
            loading: true
        })
        //发送get请求
        const res = await get(`/playlist/detail?id=${id}`)

        this.setState({
            //将返回的结果中的playlist赋给detail
            detail: res.playlist || {},
            loading: false
        })
    }

    render() {
        const { detail, loading } = this.state

        return (
            <div>
                <Header detail={detail}></Header>
                <Content info={detail} loading={loading}></Content>
            </div>
        )
    }
}
export default SheetPage;
