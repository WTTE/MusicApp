//封装轮播图组件
import React, { Component } from 'react'

import { withRouter } from 'react-router-dom'

//引入轮播图组件
import { Carousel, WingBlank } from 'antd-mobile';

import style from './carousel2.module.scss'

class MyCarousel extends Component {

    //定义跳转详情页面的方法，利用编程式路由导航进行跳转
    goSheet = (id) => {
        const { history } = this.props
        //编程式路由导航
        history.push(`/sheet/${id}?isTop=1`)
    }

    render() {
        //从父亲find传过来的props中解构赋值出banners
        const { banners } = this.props

        return (
            <div className={style.banners2}>
                <WingBlank>
                    <Carousel
                        className={style.carousel}
                        frameOverflow="visible"
                        cellSpacing={15}
                        slideWidth={0.5}
                        autoplay
                        infinite
                        afterChange={index => this.setState({ slideIndex: index })}>
                        {/* 遍历banners里的item,轮播图的路径为item的coverImgUrl */}
                        {
                            banners.map(item => {
                                return <img key={item.id} src={item.coverImgUrl} alt="轮播图" onClick={() => this.goSheet(item.id)} />
                            })
                        }
                    </Carousel>
                </WingBlank>
            </div >

        )
    }
}

export default withRouter(MyCarousel);