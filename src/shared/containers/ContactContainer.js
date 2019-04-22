import * as React from 'react'
import { connect } from 'react-redux'
import Contact from '~components/molecules/Contact/Contact'
import * as popupActionCreators from '~redux/popups/actionCreators'
import uniqueStringMaker from '~shared/modules/uniqueStringMaker'
const callApi = process.env.isBrowser && require('~shared/modules/callApi').default

class ContactContainer extends React.Component{

    sendEmail = async ({
        name, msg, email
    }) => {
        const response = await callApi('/api/emails', {
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({
                name,
                msg,
                email
            })
        })
        if(response && response.isSuccess){
            this.props.popupsActions.openPopup({
                unique_id : uniqueStringMaker(),
                popupType : "AUTO",
                icon : 'clap',
                title : 'SEND EMAIL SUCCESS!',
                description : `연락드리겠습니다. :)`,
            })            
            return true
        }
    }

    render(){
        return (
            <Contact sendEmail={this.sendEmail}/>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    popupsActions : { openPopup : (payload) => dispatch(popupActionCreators.openPopup(payload)) }
})


export default connect(null, mapDispatchToProps)(ContactContainer)