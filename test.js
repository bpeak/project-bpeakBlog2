const requestMsg = "hmm"
const topLevelContext = 'local'

const topLevelContextTypes = {
    LOCAL : 'local',
    DIALOGFLOW : 'dialogflow'
}

const callDialogFlow = (msg) => {
    return {
        msg : "dialog msg"
    }
}

const post = (req) => {
    const requestMsg = req.body.msg
    const topLevelContext = req.body.topLevelContext
    const context = req.body.context
    if(topLevelContext === topLevelContextTypes.LOCAL){
        
    }
    if(topLevelContext === topLevelContextTypes.DIALOGFLOW){

    }
}

post({
    body : {
        msg : "hmm",
        topLevelContext : 'local',
        context : null
    }
})
