import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import { Helmet } from 'react-helmet'
//styles
import styles from './style.scss'
const cx = classNames.bind(styles)
//components
import TopHeader from '~components/molecules/TopHeader/TopHeader'
import Footer from '~components/molecules/Footer/Footer'
import MainHeaderContainer from '~containers/MainHeaderContainer'
//modules
import history from '~shared/modules/history'
//local modules
import * as deviceTypes from './deviceTypes'
import getDeviceType from './getDeviceType'
import getHeaderHeight from './getHeaderHeight'
import mainTemplateStyleMaker from './mainTemplateStyleMaker'

class MainTemplate extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = { // default
            isTopHeaderVisible : true,
            deviceType : deviceTypes.PC,
        }
    }

    _setDeviceType = (deviceType) => { this.setState(() =>  ({ deviceType }))}
    _setIsTopHeaderVisible = (isTopHeaderVisible) => { this.setState(() => ({ isTopHeaderVisible }))}

    _handleOnScroll = () => {
        const { deviceType } = this.state
        const topHeaderHeight = getHeaderHeight(deviceType) / 2
        const prevIsTopHeaderVisible = this.state.isTopHeaderVisible
        const nextIsTopHeaderVisible = (topHeaderHeight >= window.scrollY)

        if(prevIsTopHeaderVisible !== nextIsTopHeaderVisible){
            this._setIsTopHeaderVisible(nextIsTopHeaderVisible)
        }
    }

    _handleOnResize = () => {
        const innerWidth = window.innerWidth
        const prevDeviceType = this.state.deviceType
        const nextDeviceType = getDeviceType(innerWidth)
        if(prevDeviceType !== nextDeviceType){
            this._setDeviceType(nextDeviceType)
        }
    }

    componentDidMount(){
        const innerWidth = window.innerWidth
        const deviceType = getDeviceType(innerWidth)
        const topHeaderHeight = getHeaderHeight(deviceType) / 2
        const scrollY = window.scrollY
        const isTopHeaderVisible = ( topHeaderHeight >= scrollY )         
        this._setDeviceType(deviceType)
        this._setIsTopHeaderVisible(isTopHeaderVisible)
        const { _handleOnScroll, _handleOnResize } = this

        window.addEventListener('scroll', _handleOnScroll)
        window.addEventListener('resize', _handleOnResize)
    }

    componentWillUnmount(){
        const { _handleOnScroll, _handleOnResize } = this
        window.removeEventListener('scroll', _handleOnScroll)
        window.removeEventListener('resize', _handleOnResize)
    }
    
    render(){
        const { children, title } = this.props
        const { isTopHeaderVisible, deviceType } = this.state
        const style = mainTemplateStyleMaker(deviceType, isTopHeaderVisible)

        return(
            <React.Fragment>
                <Helmet>
                    <title>{title ? `${title} - Bpeak Blog` : 'BPEAK BLOG'}</title>
                </Helmet>
                <div className={cx('MainTemplate')}>
                    <header className={cx('header')}>
                        <div style={style["TopHeader-container"]} className={cx('TopHeader-container')}><TopHeader/></div>
                        <div style={style["MainHeader-container"]} className={cx('MainHeader-container')}><MainHeaderContainer deviceType={deviceType}/></div>
                    </header>
                    <div style={style['contents']}>
                        {children}
                    </div>
                    <footer style={style['footer']} className={cx('footer')}>
                        <Footer/>
                    </footer>
                </div>
            </React.Fragment>          
        )
    }
}

MainTemplate.propTypes = {
    title : PropTypes.string,
    children : PropTypes.element.isRequired
}

export default MainTemplate