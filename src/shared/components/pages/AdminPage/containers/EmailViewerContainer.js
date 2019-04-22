import * as React from 'react'
import { connect } from 'react-redux'
import EmailViewer from '../components/molecules/EmailViewer/EmailViewer'
const callApi = process.env.isBrowser ? require('~shared/modules/callApi').default : () => {}

const mapStateToProps = (state) => ({
    userState : state.user
})

class EmailViewerContainer extends React.Component{

    getEmails = () => {
        const { userState } = this.props
        return callApi('/api/admin/emails', {
            method : "GET",
            headers : {
                Authorization : `Bearer ${userState.token}`,
            }
        })
    }

    render(){
        return <EmailViewer getEmails={this.getEmails}/>
    }
}

export default connect(mapStateToProps, null)(EmailViewerContainer)