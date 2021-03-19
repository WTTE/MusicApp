import React, { Component } from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile';

import SingersList from '../../components/singers/singersList'

import './singers.scss'
class Singers extends Component {
    renderContent = tab =>
    (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  backgroundColor: '#fff' }}>
        <SingersList type={tab.type} area={tab.area}></SingersList>
    </div>);

    render() {
        const tabs = [
            { title: '华语男歌手', type: 1, area: 7 },
            { title: '华语女歌手', type: 2, area: 7 },
            { title: '华语乐队', type: 3, area: 7 },
            { title: '欧美男歌手', type: 1, area: 96 },
            { title: '欧美女歌手', type: 2, area: 96 },
            { title: '欧美乐队', type: 3, area: 96 },
            { title: '日本男歌手', type: 1, area: 8 },
            { title: '日本女歌手', type: 2, area: 8 },
            { title: '日本乐队', type: 3, area: 8 },
            { title: '韩国男歌手', type: 1, area: 16 },
            { title: '韩国女歌手', type: 2, area: 16 },
            { title: '韩国乐队', type: 3, area: 16 }
        ];

        return (
            <div>
                <div>
                    <WhiteSpace />
                    <Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />} tabBarActiveTextColor='red' >
                        {this.renderContent}
                    </Tabs>
                    <WhiteSpace />
                </div>
            </div>
        )
    }
}

export default Singers;