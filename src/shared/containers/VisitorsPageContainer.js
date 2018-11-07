import React from 'react'
import { connect } from 'react-redux'
//redux
import * as visitorCardsActionCreators from '~redux/visitorCards/actionCreators'
//components
import VisitorsPage from '~components/pages/VisitorsPage/VisitorsPage'
//modules
const callApi = process.env.isBrowser && require('~shared/modules/callApi').default

const mapStateToProps = (state) => ({
    visitorCards : state.visitorCards.items,
    userState : state.user,
})

const mapDispatchToProps = (dispatch) => ({
    visitorCardsActions : {
        receivedVisitorCards : (payload) => { dispatch(visitorCardsActionCreators.receivedVisitorCards(payload)) },
        receivedNewVisitorCard : (payload) => { dispatch(visitorCardsActionCreators.receivedNewVisitorCard(payload)) },
    }
})

class VisitorsPageContainer extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            isFetching : false,
        }
    }

    _getVisitorCards = () => {
        return callApi('/api/visitorcards', {
            method : "GET"
        }, 'visitorCards 요청')
    }

    _setIsFetching = (isFetching) => { this.setState(() => ({ isFetching }))}

    _fetchVisitorCard = (comment) => {
        return callApi('/api/visitorcards', {
            method : "POST",
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({
                nick : comment.nick,
                description : comment.description,
            }),
        }, 'visitorCard 작성(비회원)')
    }

    _fetchVisitorCardForMember = (comment) => {
        const { userState } = this.props
        return callApi('/api/visitorCards?isAsMember=true', {
            method : "POST",
            headers : {
                'content-type' : 'application/json',
                'Authorization': 'Bearer ' + userState.token
            },
            body : JSON.stringify({ description : comment.description })
        }, 'visitorCard 작성(회원)')
    }

    handleNewVisitorCard = async (comment) => {
        this._setIsFetching(true)

        const { isLoggedIn } = this.props.userState
        const response = isLoggedIn ? await this._fetchVisitorCardForMember(comment) : await this._fetchVisitorCard(comment)
        if(!response){ return }
        const { visitorCardsActions } = this.props
        visitorCardsActions.receivedNewVisitorCard({ visitorCard : response.visitorCard })
        
        this._setIsFetching(false)
    }

    deleteVisitorCard = async (_id) => {
        const { userState } = this.props
        const confirmed = confirm(`visitorCard(${_id}) 를 정말 삭제하시겠습니까?`)
        if(!confirmed){ return }
        const response = await callApi(`/api/admin/visitorCards/${_id}`, {
            method : "DELETE",
            headers : {
                Authorization : `Bearer ${userState.token}`
            },
        }, `visitorCard(${_id}) 삭제`)
        if(!response){ return }
        if(response.isSuccess){
            alert('삭제완료')
        }
    }

    async componentDidMount(){
        const { visitorCards } = this.state
        if(!visitorCards) {
            const response = await this._getVisitorCards()
            if(!response){ return }
            const { visitorCardsActions } = this.props
            visitorCardsActions.receivedVisitorCards({ visitorCards : response.visitorCards })
        }
    }

    render () {
        const { 
            isFetching,
        } = this.state

        const {
            userState,
            visitorCards
        } = this.props

        const {
            handleNewVisitorCard,
            deleteVisitorCard,
        } = this

        return (
            <VisitorsPage
            visitorCards={visitorCards}
            userState={userState}
            isFetching={isFetching}
            handleNewVisitorCard={handleNewVisitorCard}
            deleteVisitorCard={deleteVisitorCard}
            />            
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisitorsPageContainer)