import { Router } from 'express'
import axios from 'axios'
const chatbot = Router()

const callDialogApi = (msg, sid) => {
    return axios({
        method: 'post',
        headers : {
            'Content-type' : "application/json;charset=UTF-8",
            'Authorization' : 'Bearer d8f155e9893e4f719f93755f6526be69'
        },
        url: 'https://api.dialogflow.com/v1/query?v=20150910',
        data: JSON.stringify({
            "lang" : "ko",
            "query": msg,
            "sessionId": sid,
            "timezone": "Asia/Tokyo"
        })
    })
    .then(r => r.data)    
}

const infoItemCommonText = `\n더 궁금하신게 있으시면 말해주세요~`
const infoItemMatchTexts = {
    '기술스택' : "기술스택은 이렇고 저렇고",
    '관심기술' : "관심기술은`~~~~~~",
    '김기현' : "김기현은 ~~~"
}

chatbot.post('/', async(req, res) => {
    const requestMsg = req.body.msg
    const sid = req.body.sid
    let dialogResponse
    try{
        dialogResponse = await callDialogApi(requestMsg, sid)        
    } catch (err){
        console.log(err)
        return res.status(500).json(JSON.stringify({}))
    }
    let responseMsg = dialogResponse.result.fulfillment.speech
    responseMsg = responseMsg.replace(/\\n/gi,"\n")
    const dialogContext = dialogResponse.result.metadata.intentName
    if(dialogContext === 'yes2'){
        const infoSubject = dialogResponse.result.contexts[0].parameters.InfoSubject
        console.log(infoSubject)
        responseMsg += infoItemMatchTexts[infoSubject] + infoItemCommonText
    }
    res.status(200).json(JSON.stringify({
        msg : responseMsg
    }))
})

export default chatbot