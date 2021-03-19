//引入antd-mobile
import { NavBar, SearchBar, Drawer, Popover, Icon } from 'antd-mobile';
import './nav.scss'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import DrawerList from '../../components/drawer'

const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

//创建顶部导航栏类组件
class Nav extends Component {
    state = {
        open: false,//左侧抽屉
        visible: false,//右侧弹出框
        selected: '',
    }

    //抽屉
    onOpenChange = (...args) => {
        console.log(args);
        this.setState({ open: !this.state.open });
    }

    //弹出框
    onSelect = (opt) => {
        // console.log(opt.props.value);
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };

    //对抽屉弹窗进行判断
    drawOpen = () => {
        const sidebar = (<DrawerList></DrawerList>);
        if (this.state.open) {
            return <Drawer
                className="my-drawer"
                style={{ minHeight: document.documentElement.clientHeight }}
                enableDragHandle
                sidebar={sidebar}
                open={this.state.open}
                onOpenChange={this.onOpenChange}
            >
            </Drawer>
        }
        else {
            return null;
        }
    }

    //编程式路由导航
    goTo = () => {
        this.props.history.push("/search")
    }

    render() {
        // const sidebar = (<DrawerList></DrawerList>);

        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent={
                        <i key="1" className="iconfont666">&#xe815;</i>
                    }
                    onLeftClick={this.onOpenChange}
                    rightContent={
                        <Popover mask
                            overlayClassName="fortest"
                            overlayStyle={{ color: 'currentColor' }}
                            visible={this.state.visible}
                            overlay={[
                                (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">扫一扫</Item>),
                                (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>我的二维码</Item>),
                                (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                                    <span style={{ marginRight: 5 }}>帮助</span>
                                </Item>),
                            ]}
                            align={{
                                overflow: { adjustY: 0, adjustX: 0 },
                                offset: [-10, 0],
                            }}
                            onVisibleChange={this.handleVisibleChange}
                            onSelect={this.onSelect}
                        >
                            <div style={{
                                height: '100%',
                                padding: '0 15px',
                                marginRight: '-15px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                                <Icon type="ellipsis" />
                            </div>
                        </Popover>
                    }
                > <div onClick={this.goTo}>
                        <SearchBar placeholder="搜索歌手、歌曲、专辑" maxLength={15} disabled />
                    </div>
                </NavBar>

                {/* 抽屉判断 */}
                {this.drawOpen()}
            </div>

        )
    }
}

export default withRouter(Nav);