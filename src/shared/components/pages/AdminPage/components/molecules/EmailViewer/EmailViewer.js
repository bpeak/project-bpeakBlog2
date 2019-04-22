import * as React from 'react'

class EmailViewer extends React.Component {
    constructor(){
        super()
        this.state = {
            isLoaded : false,
            emails : null,
        }
    }
    
    async componentDidMount(){
        const response = await this.props.getEmails()
        if(response){
            this.setState({
                isLoaded : true,
                emails : response.emails
            })
        }
    }

    render(){
        return(
            <div>
                {this.state.isLoaded === true 
                ? <div>
                    {this.state.emails.map((email) => {
                        return (
                            <div>
                                <div>이메일 : {email.email}</div>
                                <div>이름 : {email.name}</div>
                                <div>메시지 : {email.msg}</div>
                                <div>날짜 : {email.createdDate}</div>
                                <div>ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</div> 
                            </div>
                        )
                    })}
                </div> 
                : <div>...</div>}
            </div>
        )
    }
}

export default EmailViewer