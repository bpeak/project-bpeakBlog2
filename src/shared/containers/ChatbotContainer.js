import * as React from 'react'
import Chatbot from '~components/molecules/Chatbot/Chatbot'
const callApi = process.env.isBrowser ? require('~shared/modules/callApi').default : () => {}
import robotImg from '~assets/robot.png'

class ChatbotContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            isJarvisOpend : true
        }
    }

    openJarvis = () => {
        this.setState({
            ...this.state,
            isJarvisOpend : true
        })
    }

    closeJarvis = () => {
        this.setState({
            ...this.state,
            isJarvisOpend : false
        })
    }

    sendMsg = async(msg, uniqueId) => {
        console.log(uniqueId)
        return callApi('/api/chatbot', {
            method : "POST",
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({ msg, sid : uniqueId })
        })
    }

    render(){
        return this.state.isJarvisOpend 
            ? <Chatbot sendMsg={this.sendMsg} closeJarvis={this.closeJarvis}/>
            : <img src={robotImg} style={
                { 
                    float : 'right', 
                    width : '3em', 
                    height : '3em',
                    cursor : 'pointer'
                }
            } onClick={this.openJarvis}/>
    }
}

export default ChatbotContainer