import React, { Component } from 'react'
import Scroll from '../../../components/scroll'
import PropTypes from 'prop-types'
import style from './songs.module.scss'

class Songs extends Component {
    static propTypes = {
        list: PropTypes.array,
        bottomLoadingText: PropTypes.string,
        loading: PropTypes.bool,
        loadingMore: PropTypes.func,
        onSelectSong: PropTypes.func,
        currentSong: PropTypes.object,
    }
    static defaultProps = {
        list: [],
        bottomLoadingText: '加载中...',   //底部loading文字
        loading: false,    //是否正在加载
        loadingMore: () => { },
        onSelectSong: () => { },
        currentSong: {},
    }

    state = {
        list: []//初始化歌曲列表list
    }

    componentDidMount() {
        this.setState({
            list: this.props.list.slice()
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.list !== prevProps.list) {
            this.setState({
                list: this.props.list
            })
        }
    }
    loadingMore = async () => {
        await this.props.loadingMore()
        this.scroll && this.scroll.finishPullUp()
    }

    //一般公共组件不要编写业务逻辑，虽然点击事件都是一样的，但还要从外面传进来,实际上我们可以再用一个容器组件来包裹，在容器组件中接收store
    onSelect = (item, index) => {
        this.props.onSelectSong({
            songlist: this.state.list,
            song: item,
            index
        })
    }


    render() {
        //从state中取出歌曲数组list
        const { list } = this.state
        console.log(list,"这是Songs组件接收到的list")
        const { bottomLoadingText, loading, currentSong } = this.props

        return (
            <div className={style.songsbox}>
                <Scroll ref={el => this.scroll = el} onPullingUp={this.loadingMore}>
                    <div>
                        <ul>
                            {
                                list.map((item, index) => <li key={item.id} onClick={() => this.onSelect(item, index)} className={currentSong.id===item.id ? style.active : ''}>
                                    <div className={`${style.num} ${index < 3 ? style.red : ''}`}>{index + 1}</div>

                                    <div className={style.text}>
                                        <h3>{item.name}</h3>
                                        <div>
                                            {item.ar &&item.ar.reduce((init, current, index) => {
                                                if (index < item.ar.length - 1) {
                                                    init += current.name + ' / '
                                                } else {
                                                    init += current.name + ' - '
                                                }
                                                return init
                                            }, '')}
                                            {item.al && item.al.name}
                                        </div>
                                    </div>
                                    <i key="2" className="iconfont666" style={{ fontSize: "18px", color: "rgb(203, 63, 46)" }}>&#xe60c;</i>
                                </li>)
                            }
                        </ul>
                        {
                           loading && list.length ? <div className={style.loading}>{bottomLoadingText}</div> : null
                       }
                    </div>
                </Scroll>
            </div>
        )
    }
}

export default Songs;