import React, { Component } from 'react'

//从封装的方法中引入get请求的方法
import { get } from '../../../utils/ajax'

import { Link, withRouter } from 'react-router-dom'

import style from './singersList.module.scss'

class SingersList extends Component {
    state = {
        singersList: []
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        const { type, area } = this.props
        const res = await get(`/artist/list?type=${type}&area=${area}&limit=40`)
        console.log(res, "this is data")
        this.setState({
            singersList: res.artists
        })
    }

    render() {
        const { singersList } = this.state
        return (
            <div className={style['singerbox']}>
                <ul>
                    {singersList.map(singer => <li key={singer.id}>
                        {/* Link跳转singersDetail页面，并将歌手的id传递过去 */}
                        <Link to={`/singersDetail/${singer.id}`} className={style['singer-box']}>
                            <img src={singer.img1v1Url} alt="" />
                            <div>{singer.name}</div>
                        </Link>
                    </li>)}
                </ul>
            </div>
        )
    }
}

export default withRouter(SingersList);