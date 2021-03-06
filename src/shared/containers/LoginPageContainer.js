import React, { Component } from 'react'
import { connect } from 'react-redux'
//actions
import * as userActionCreators from '~redux/user/actionCreators'
import * as popupsActionCreators from '~redux/popups/actionCreators'
//modules
import uniqueStringMaker from '~shared/modules/uniqueStringMaker'
import history from '~shared/modules/history'
//components
import LoginPage from '~components/pages/LoginPage/LoginPage'

const callApi = process.env.isBrowser && require('~shared/modules/callApi').default

class LoginPageContainer extends Component {
    constructor(){
        super()
        this.state = {
            inputVal : {
                email : '',
                password : ''
            },
            errMsg : null
        }
    }

    _setInputVal = (inputName, val) => {
        this.setState((state) => ({
            inputVal : {
                ...state.inputVal,
                [inputName] : val
            }
        }))
    }

    _setErrMsg = (errMsg) => { this.setState(() => ({ errMsg })) }

    handleOnEmailChange = (email) => {
        this._setErrMsg(null)
        this._setInputVal('email', email)
    }
    handleOnPasswordChange = (password) => {
        this._setErrMsg(null)
        this._setInputVal('password', password)
    }

    sendLoginForm = async () => {
        try{
            const { email, password } = this.state.inputVal
            const body = { email, password }
            const response = await callApi('/api/auth/local/login', {
                method : "POST",
                headers : {
                    'content-type' : 'application/json'
                },
                body : JSON.stringify(body)
            })
            if(!response) { return }
            if(!response.isSuccess){ return this._setErrMsg(response.errMsg) }
            const { user } = response
            const { 
                storeState,
                userActions, popupsActions 
            } = this.props
            userActions.loginSuccess({
                token : user.token,
                isAdmin : user.isAdmin,
                unique_id : user.unique_id,
                nick : user.nick,
                profileImgSrc : user.profileImgSrc
            })
            popupsActions.openPopup({
                unique_id : uniqueStringMaker(),
                popupType : "AUTO",
                icon : 'clap',
                title : 'LOGIN SUCCESS',
                description : `${user.nick}님 환영합니다.`,
            })                
            const redirectUrl = storeState.urlHistory.toAuthPageFrom || '/'
            history.push(redirectUrl)
        }
        catch(err){
            console.log(err)
        }
    }

    render() {
        return (
            <LoginPage
            inputVal={this.state.inputVal}
            errMsg={this.state.errMsg}
            handleOnEmailChange={this.handleOnEmailChange}
            handleOnPasswordChange={this.handleOnPasswordChange}
            sendLoginForm={this.sendLoginForm}
            />
        )
    }
}

const mapStateToProps = (storeState) => ({
    storeState : { urlHistory : { toAuthPageFrom : storeState.urlHistory.toAuthPageFrom } }
})
const mapDispatchToProps = (dispatch) => ({
    userActions : { loginSuccess : (payload) => dispatch(userActionCreators.loginSuccess(payload)) },
    popupsActions : { openPopup : (payload) => dispatch(popupsActionCreators.openPopup(payload)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer)