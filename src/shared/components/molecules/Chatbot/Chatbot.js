import * as React from 'react'
import classNames from 'classnames/bind'
import uniqueStringMaker from '~shared/modules/uniqueStringMaker'
//imgs
import userImg from '~assets/person.jpg'
import robotImg from '~assets/robot.png'
//styles
import styles from './Chatbot.scss'
const cx = classNames.bind(styles)
const ENTER_KEYCODE = 13

const Chat = ({ chat }) => {
    let className = cx(chat.type)
    let imgSrc
    if(chat.type === 'bot'){
        imgSrc = robotImg
    } else {
        imgSrc = userImg
    }
    return (
        <li className={className}>
            <div className={cx('avatar')}><img src={imgSrc} draggable="false"/></div>
            <div className={cx('msg')}>
                <div className={cx('msg-text')}>
                    {chat.msg}
                </div>
                <time>{chat.time}</time>
            </div>
        </li>              
    )    
}

class Chatbot extends React.Component{
    constructor(){
        super()

        if(process.env.isBrowser){
            this.uniqueId = String(Number(new Date())) + uniqueStringMaker()
        }

        const currentDate = new Date()
        let hours = String(currentDate.getHours())
        hours = hours.length === 1 ? '0' + hours : hours
        let minutes = String(currentDate.getMinutes())
        minutes = minutes.length === 1 ? '0' + minutes : minutes
        this.hours = hours
        this.minutes = minutes
        this.currentDate = currentDate
        this.state = {
            chats : [
                {
                    type : 'bot',
                    time : currentDate.toLocaleTimeString(),
                    msg : "안녕하세요."
                },
            ]
        }
    }

    pushChat = ({
        type, msg, time
    }, cb) => {
        this.setState({
            ...this.state,
            chats : [...this.state.chats, { type, msg, time }]
        }, () => {
            const divChat = this.refs.divChat
            divChat.scrollTop = divChat.scrollHeight;
        })
    }

    componentDidMount(){
        window.addEventListener('keypress', (e) => {
            if(e.keyCode === ENTER_KEYCODE){
                this.onSubmitClickHandler()
            }
        })
    }

    onBtnExitJarvisClick = () => {

    }

    onSubmitClickHandler = async () => {
        const msg = this.refs.msg.value
        this.refs.msg.value = ""
        this.pushChat({
            msg,
            type : 'user',
            time : new Date().toLocaleTimeString()
        })
        
        let response
        try{ response = await this.props.sendMsg(msg, this.uniqueId) }
        catch (err) { console.log(err) }
        
        this.pushChat({
            msg : response.msg,
            type : 'bot',
            time : new Date().toLocaleTimeString()
        })
    }

    render(){
        return (
            <div className={cx('Chatbot')}>
                <div className={cx('menu')}>
                    <img src={robotImg}/>
                    <div className={cx('profile')}>
                        <div className={cx('name')}>BPEAK'S JARVIS</div>
                        <span className={cx('time')}>{`${this.hours} : ${this.minutes}`}</span>
                    </div>
                    <button onClick={this.props.closeJarvis}>자비스종료</button>
                </div>
                <ol ref="divChat" className={cx('chat')}>
                    {this.state.chats.map((chat, index) => {
                        return <Chat key={index} chat={chat}/>
                    })}              
                </ol>
                <input ref='msg' className={cx('textarea')} type="text" placeholder="Type here!"/>
            </div>            
        )
    }
}

export default Chatbot