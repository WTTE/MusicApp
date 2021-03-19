// 当页面内容的高度超过视口高度的时候，会出现纵向滚动条；
// 当页面内容的宽度超过视口宽度的时候，会出现横向滚动条。
// 也就是当我们的视口展示不下内容的时候，会通过滚动条的方式让用户滚动屏幕看到剩余的内容。
// npm install better-scroll --save

import React, { Component } from 'react'
import BScroll from 'better-scroll'
import PropTypes from 'prop-types'

class Scroll extends Component {
    static propTypes = {
        onPullingUp: PropTypes.func,
    }
    static defaultProps = {
        onPullingUp: () => {}
    }

    componentDidMount () {
        this.initScroll()
    }

    componentDidUpdate () {
        this.refresh()
    }

    componentWillUnmount () {
        this.destroy()
    }

    initScroll = () => {
        this.scroll = new BScroll(this.wrapper, {
            click: true,
            mouseWheel: true,
            pullUpLoad: true
        })
        this.scroll.on('pullingUp', this.props.onPullingUp)
    }
    refresh = () => {
        this.scroll && this.scroll.refresh()
    }
    finishPullUp = () => {
        this.scroll && this.scroll.finishPullUp()
    }
    scrollToElement = (el, time, offsetX, offsetY, easing) => {
        this.scroll && this.scroll.scrollToElement(el, time, offsetX, offsetY, easing)
    }
    scrollTo = (x, y, time, easing) => {
        this.scroll && this.scroll.scrollTo(x, y, time, easing)
    }
    destroy = () => {
        this.scroll.destroy()
        this.scroll = null
    }

    render () {
        return (
            <div style={{height: '100%', width: '100%', overflow: 'hidden'}} ref={wrapper => this.wrapper = wrapper}>
                {this.props.children}
            </div>
        )
    }
}

export default Scroll;