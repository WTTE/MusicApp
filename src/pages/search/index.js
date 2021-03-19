import React from 'react'
import { get } from '../../utils/ajax'
import { SearchBar } from 'antd-mobile'
import style from './style/index.module.scss'
import ResultTabs from './ResultTabs'
import Loading from '../../components/Loading/index'

class Search extends React.Component {
    state = {
        hotlist: [],   //热门搜索列表
        isFocus: false, //输入框是否聚焦
        keywords: '', //搜索关键词
        suggestList: [],  //搜索建议列表
        searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || [],  //搜索历史
        isSearch: false, //是否搜索
    }

    componentDidMount() {
        this.getHotlist()
    }

    componentWillUnmount() {
        this.setState = () => {
            return;
        };
    }

    //获取热门搜索关键词
    getHotlist = async () => {
        const res = await get('/search/hot')
        this.setState({
            //将返回的热门搜索关键词储存在hotlist中
            hotlist: res.result ? res.result.hots : []
        })
    }

    //实时获取用户输入得到搜索建议
    getSuggestList = async (keywords) => {
        if (!keywords) {
            this.setState({
                suggestList: []
            })
            return
        }
        const res = await get(`/search/suggest`, {
            keywords,
            type: 'mobile'
        })
        this.setState({
            suggestList: res.result ? res.result.allMatch : []
        })
    }

    handleChange = async (keywords) => {
        this.getSuggestList(keywords)
        this.setState({
            keywords,
            isSearch: false
        })
    }

    search = async (keywords) => {
        this.setState({
            keywords,
            isSearch: true,
        })
        //添加到搜索历史
        this.addHistory(keywords)
    }

    //添加到搜索历史
    addHistory = (keywords) => {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
        const index = searchHistory.findIndex(item => item === keywords)
        if (index !== -1) {
            searchHistory.splice(index, 1)
        }
        searchHistory.unshift(keywords)

        localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
        this.setState({
            searchHistory
        })
    }

    //清除搜索历史
    removeHistory = (index) => {
        let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
        searchHistory.splice(index, 1)
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
        this.setState({
            searchHistory
        })
    }

    render() {
        const { hotlist, isFocus, keywords, suggestList, searchHistory, isSearch } = this.state

        //当获取焦点时展示FocusBox
        const FocusBox = () =>
            <div>
                {
                    //isSearch是true时展示搜索结果组件ResultTabs，反之跟随输入展示建议列表
                    isSearch ?
                        <div>
                            <ResultTabs keywords={keywords} />
                        </div> :
                        <div>
                            <ul className={style['suggest-box']}>
                                {suggestList && suggestList.map(item => <li key={item.keyword} onClick={() => this.search(item.keyword)}>
                                    <div className={'iconfont icon-sousuo1'} />
                                    <div>{item.keyword}</div>
                                </li>)}
                            </ul>
                        </div>
                }
            </div>

        //当未获取焦点时展示BlurBox
        const BlurBox = () =>
            <div>
                <div className={style['hot-list-box']}>
                    {/* 搜索建议部分 */}
                    {/* 当hotlist.length存在时才显示该div */}
                    <div style={{ display: hotlist.length ? '' : 'none' }}>热门搜索</div>
                    <ul>
                        {/* 遍历hotlist中的每个元素，将hot.first显示到页面，绑定事件点击直接进行搜索 */}
                        {hotlist && hotlist.map(hot =>
                            <li key={hot.first} onClick={() => this.search(hot.first)}>
                                {hot.first}
                            </li>)}
                    </ul>


                    {/* 搜索历史列表部分 */}
                    {/* 当hotlist.length存在时才显示该div */}
                    <ol style={{ display: hotlist.length ? '' : 'none' }}>
                        {/* 遍历searchHistory中的每个元素并显示到页面 */}
                        {searchHistory && searchHistory.map((item, index) =>
                            <li key={item}>
                                <div className={'iconfont icon-lishibisai'} />
                                <div onClick={() => this.search(item)}>{item}</div>
                                <div className={'iconfont icon-lvzhou_shanchu_lajitong'} onClick={() => this.removeHistory(index)} />
                            </li>)}
                    </ol>
                    <Loading loading={!hotlist.length} />
                </div>
            </div>

        return (
            <div className={style.container}>
                <div className={style.search}>
                    <SearchBar
                        value={keywords}
                        onSubmit={this.search}
                        onChange={this.handleChange}
                        placeholder={'搜索歌手、歌曲、专辑'}
                        onBlur={() => this.setState({ isFocus: false })}
                        onFocus={() => this.setState({ isFocus: true })} />
                </div>

                {/* 当已经获取搜索焦点，展示FocusBox部分，反之展示BlurBox部分 */}
                <div>
                    {(keywords || isFocus) ? <FocusBox /> : <BlurBox />}
                </div>
            </div>
        )
    }
}

export default Search;