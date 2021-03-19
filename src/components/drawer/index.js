import React, { Component } from 'react'

import { Icon, List, Badge, Button, Switch } from 'antd-mobile';
import user from './user.png'

import style from './drawer.module.scss'

const Item = List.Item;
// const Brief = Item.Brief;

class DrawerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            checked1: true,
        };
    }

    render() {
        return (
            <div className={style.DrawerList}>
                {/* 头像昵称部分 */}
                <div className={style.user}>
                    <img src={user} alt="" />
                    <span>Sonder.</span>
                    <Icon type="right" size="xs" className="recommend-icon" />
                    <i key="1" className="iconfont666">&#xe829;</i>
                </div>
                {/* 中间选项栏部分 */}
                <div className={style.content}>
                    <List className={style.Listcontent}>
                        <Item arrow="horizontal" onClick={() => { }} extra={<Badge text={'99+'} />}>
                            <i key="1" className="iconfont666">&#xe890;</i>
                            <span className={style.words}>消息中心</span>
                        </Item>
                        <Item arrow="horizontal" onClick={() => { }} extra={<Badge text={'签到'} hot />}>
                            <i key="1" className="iconfont666">&#xe8b1;</i>
                            <span className={style.words}>云扇中心</span>
                        </Item>
                        <Item arrow="horizontal" onClick={() => { }}>
                            <i key="1" className="iconfont666">&#xe7fc;</i>
                            <span className={style.words}>创作者中心</span>
                        </Item>
                    </List>
                </div>

                {/* 中下部分 */}
                <div className={style.content}>
                    <List className={style.Listcontent}>
                        <Item arrow="horizontal" onClick={() => { }}>
                            <i key="1" className="iconfont666">&#xe8ae;</i>
                            <span className={style.words}>演出</span>
                        </Item>
                        <Item arrow="horizontal" onClick={() => { }} extra={<Badge text={'HOT'} hot />}>
                            <i key="1" className="iconfont666">&#xe88e;</i>
                            <span className={style.words}>商城</span>
                        </Item>
                        <Item arrow="horizontal" onClick={() => { }}>
                            <i key="1" className="iconfont666">&#xe80c;</i>
                            <span className={style.words}>口袋彩铃</span>
                        </Item>
                        <Item arrow="horizontal" onClick={() => { }}>
                            <i key="1" className="iconfont666">&#xe824;</i>
                            <span className={style.words}>游戏专区</span>
                            <span className={style.adv}>猫鼠联动赢现金</span>
                        </Item>
                    </List>
                </div>

                {/* 下部分 */}
                <div className={style.content}>
                    <List className={style.Listcontent}>
                        <Item arrow="horizontal" onClick={() => { }}>
                            <i key="1" className="iconfont666">&#xe803;</i>
                            <span className={style.words}>设置</span>
                        </Item>
                        <Item arrow="horizontal" onClick={() => { }}
                            extra={
                                <Switch
                                    checked={this.state.checked}
                                    onChange={() => {
                                        this.setState({
                                            checked: !this.state.checked,
                                        });
                                    }}
                                    platform="android"
                                    color="rgb(203, 63, 46)"
                                />
                            }>
                            <i key="1" className="iconfont666">&#xe86c;</i>
                            <span className={style.words}>夜间模式</span>
                        </Item>
                        <Item arrow="horizontal" onClick={() => { }}>
                            <i key="1" className="iconfont666">&#xe884;</i>
                            <span className={style.words}>帮助与反馈</span>
                        </Item>
                        <Item arrow="horizontal" onClick={() => { }}>
                            <i key="1" className="iconfont666">&#xe81d;</i>
                            <span className={style.words}>关于</span>
                        </Item>
                    </List>
                </div>
                <Button type="warning" style={{ backgroundColor: "rgb(203, 63, 46)" }}>退出登录</Button>
            </div>
        )
    }
}

export default DrawerList;