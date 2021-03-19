import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'
import { get } from '../../utils/ajax'
import Content from './content'

import style from './singersDetail.module.scss'

class SingersDetail extends Component {
    state = {
        info: {}
    }

    componentDidMount () {
        //从Url拿到id
        const Url = this.props.match.params.id
        this.getInfo(Url)
    }

    getInfo = async (Url) => {
        const res = await get(`/artists?id=${Url}`)
        this.setState({
            info: res.artist || {}
        })
    }

    render() {
        const {info} = this.state
        const Url = this.props.match.params.id

        return (
            <div className={style.container}>
                <div className={style.singerimg} style={{ backgroundImage: `url(${info.img1v1Url})` }} >
                    <div className={style.singerName}>
                        <p>{info.name}</p>
                    </div>
                </div>

                <div className={style.content}>
                    <Content id={Url}></Content>
                </div>
            </div>

        )
    }
}

export default withRouter(SingersDetail);