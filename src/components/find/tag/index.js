import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// import image0 from './img/fm.png'
import image1 from './img/hot.png'
import image2 from './img/podcast.png'
import image3 from './img/self.png'
import image4 from './img/singer.png'

import './tag.css'

class Tags extends Component {
    render() {
        const menu = [
            {
                text: '每日推荐',
                icon: image1,
                url: '/recommend'
            },
            // {
            //     text: '私人FM',
            //     icon: image0,
            //     url: '/private'
            // },
            {
                text: '歌单',
                icon: image3,
                url: '/songList'
            },
            {
                text: '排行榜',
                icon: image2,
                url: '/rankingList'
            },
            {
                text: '热门歌手',
                icon: image4,
                url: '/singers'
            }
        ]

        console.log(menu, "1111111111")
        return (
            <div className='tagsList'>
                {
                    menu.map((item, index) => {
                        return <Link to={item.url} key={index} >
                            <div className='tagsItem'>
                                <img src={item.icon} alt="" />
                                <div>{item.text}</div>
                            </div>
                        </Link>
                    })
                }
            </div>
        )
    }
}

export default Tags;