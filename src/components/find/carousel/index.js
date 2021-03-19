//封装轮播图组件
import React, { Component } from 'react'

//引入轮播图组件
import { Carousel, WingBlank } from 'antd-mobile';

import './carousel.scss'

export default class MyCarousel extends Component {
    render() {
        //从父亲find传过来的props中解构赋值出banners
        const { banners } = this.props
        console.log(banners, "这是MyCarousel组件接收到的banners数组")

        return (
            <div className="banners">
                <WingBlank>
                    <Carousel infinite autoplay>
                        {/* 遍历banners里的item,轮播图的路径为item的imageUrl */}
                        {
                            banners.map(item => {
                                return <img key={item.imageUrl || item.pic} src={item.imageUrl || item.pic} alt="轮播图" />
                            })
                        }
                    </Carousel>
                </WingBlank>
            </div >

        )
    }
}
