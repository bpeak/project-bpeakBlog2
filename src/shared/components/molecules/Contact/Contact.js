import * as React from 'react'
import * as emailConfig from '~shared/configs/email.config.json'
//styles
import styles from './Contact.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

class Contact extends React.Component{
    constructor(){
        super()
        this.state = {
            email : "",
            name : "",
            msg : "",
        }
    }

    _handleOnEmailChange = (e) => {
        this.setState({
            ...this.state,
            email : e.currentTarget.value
        })
    }

    _handleOnNameChange = (e) => {
        this.setState({
            ...this.state,
            name : e.currentTarget.value
        })
    }

    _handleOnMsgChange = (e) => {
        this.setState({
            ...this.state,
            msg : e.currentTarget.value,
        })
    }

    _handleOnSubmitClick = async (e) => {
        e.preventDefault()
        const { msg, email, name } = this.state
        const isSuccess = await this.props.sendEmail({
            msg, email, name,
        })
        if(isSuccess === true){
            this.setState({
                msg : "",
                email : "",
                name : "",
            })
        }
    }

    render(){
        const { 
            _handleOnEmailChange,
            _handleOnMsgChange,
            _handleOnNameChange,
            _handleOnSubmitClick,
        } = this
        const {
            email,
            name,
            msg,
        } = this.state
        return (
            <div className={cx("Contact")}>
                <div className={cx('title')}>Contact Me</div>
                <form className={cx('ContactForm')} autoComplete="off">
                    <div className={cx('bundle')}>
                        <input minLength={emailConfig.NAME_CHAR_MIN} maxLength={emailConfig.NAME_CHAR_MAX} value={name} onChange={_handleOnNameChange} id="name" required/>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className={cx('bundle')}>
                        <input maxLength={emailConfig.EMAIL_CHAR_MAX} value={email} onChange={_handleOnEmailChange} id="email" required/>
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className={cx('bundle')}>
                        <input maxLength={emailConfig.MSG_CHAR_MAX} value={msg} onChange={_handleOnMsgChange} id="msg" required/>
                        <label htmlFor="msg">Message</label>
                    </div>
                    <button disabled={
                        (msg === "" ||
                        email === "" ||
                        name === ""
                        )
                    } onClick={_handleOnSubmitClick} className={cx('btnSubmit')}>Submit</button>                    
                </form>
            </div>
        )
    }
}

export default Contact