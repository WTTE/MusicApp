import React, { useEffect, useState } from 'react'

//从封装的方法中引入get请求的方法
import { get } from '../../utils/ajax'

import List2 from '../../components/playList/List'

import { withRouter } from 'react-router-dom'

const PlayList = (props) => {

    //歌单数据
    let [songsList, setsongsList] = useState([])
    //页数
    let [limitIndex, setlimitIndex] = useState(1)

    //每当limitIndex页数发生改变的时候会触发getPlayList方法的执行
    useEffect(() => {
        getPlayList();

        return () => {
            setsongsList = () => { }
            setlimitIndex = () => { }
        }
    }, [limitIndex])

    const getPlayList = async () => {
        //将url后面携带的参数截取赋给Url(以"/"作为分隔)
        const Url = props.location.pathname.split("/")[2];
        //发送请求
        const res = await get(`/top/playlist?cat=${Url}&offset=${limitIndex}&limit=6`)
        console.log(res, "ressssssssssssss")
        setsongsList([...songsList, ...res.playlists])
    }

    //增加页码的函数
    const changeIndex = () => {
        console.log("加载下一面的方法被触发")
        setlimitIndex(++limitIndex)
    }

    
    const title = props.location.pathname.split("/")[2];
    console.log(title, "hhhh")

    return <List2 title={title} songsList={songsList} changeIndex={changeIndex}></List2>

}


export default withRouter(PlayList);