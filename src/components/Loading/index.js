import React from 'react'
import PropTypes from 'prop-types'
import style from './style/index.module.scss'
import { withRouter } from 'react-router-dom'

class Loading extends React.Component {
    static propTypes = {
        type: PropTypes.string,
        loading: PropTypes.bool,
        style: PropTypes.object
    }
    static defaultProps = {
        style: {}
    }
    matchingType = (type) => {
        switch (type) {
            case 'line-scale': {
                return (
                    <div className={style['line-scale']}>
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                    </div>
                )
            }
            case 'ball-clip-rotate-multiple': {
                return (
                    <div className={style['ball-clip-rotate-multiple']}>
                        <div />
                        <div />
                    </div>
                )
            }
            case 'ball-clip-rotate-pulse': {
                return (
                    <div className={style['ball-clip-rotate-pulse']}>
                        <div />
                        <div />
                    </div>
                )
            }
            case 'square-spin': {
                return (
                    <div className={style['square-spin']}>
                        <div />
                    </div>
                )
            }
            case 'ball-scale': {
                return (
                    <div className={style['ball-scale']}>
                        <div />
                    </div>
                )
            }
            case 'ball-scale-multiple': {
                return (
                    <div className={style['ball-scale-multiple']}>
                        <div />
                        <div />
                        <div />
                    </div>
                )
            }
            default:
                return (
                    <div className={style['line-scale']}>
                        <div />
                        <div />
                        <div />
                        <div />
                        <div />
                    </div>
                )
        }
    }

    render() {
        const { type, loading } = this.props//从props中获取所需的loading类型和loading的进行状态

        return loading ? (
            //三元表达式对于歌手详情页面的loading位置进行调整
            <div className={style['loading-box']} style={{ marginTop: this.props.location.pathname.split("/")[1] === "singersDetail" ? ' -300px' : "" }} >
                {this.matchingType(type)}
            </div>
        ) : null
    }
}

export default withRouter(Loading);