import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';

//引入withRouter对一般组件进行包裹，可以在一般组件中使用路由
import { withRouter } from "react-router-dom";

import './tabs.scss'

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'find',
            hidden: false,
            fullScreen: false,
        };
    }

    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#CB3F2E"
                barTintColor="white"
                hidden={this.state.hidden}
            >
                <TabBar.Item
                    title="发现"
                    key="find"
                    icon={<i key="1" className="iconfont666">&#xe632;</i>
                    }
                    selectedIcon={<i key="1" className="iconfont666">&#xe633;</i>
                    }
                    selected={this.state.selectedTab === 'find'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'find',
                        });
                        this.props.history.push("/find")
                    }}
                >
                </TabBar.Item>
                <TabBar.Item
                    title="排行榜"
                    key="rankingList"
                    icon={<i key="1" className="iconfont666">&#xe614;</i>
                    }
                    selectedIcon={<i key="1" className="iconfont666">&#xe615;</i>
                    }
                    selected={this.state.selectedTab === 'rankingList'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'rankingList',
                        });
                        this.props.history.push("/rankingList")
                    }}
                >
                </TabBar.Item>
                <TabBar.Item
                    title="歌单"
                    key="podcast"
                    icon={<i key="1" className="iconfont666">&#xe643;</i>
                    }
                    selectedIcon={<i key="1" className="iconfont666">&#xe644;</i>
                    }
                    selected={this.state.selectedTab === 'podcast'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'podcast',
                        });
                        this.props.history.push("/podcast")
                    }}
                >
                </TabBar.Item>
                <TabBar.Item
                    title="我的"
                    key="mine"
                    icon={<i key="1" className="iconfont666">&#xe609;</i>
                    }
                    selectedIcon={<i key="1" className="iconfont666">&#xe60a;</i>
                    }
                    selected={this.state.selectedTab === 'mine'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'mine',
                        });
                        this.props.history.push("/mine")
                    }}
                >
                </TabBar.Item>
            </TabBar>
        )
    }
}

export default withRouter(Tabs);