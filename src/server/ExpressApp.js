import express from 'express'
import path from 'path'
import serve from './serve'
import api from './api'
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import device from 'express-device'

class ExpressApp {
    constructor(){
        this.app = express()
        this.parserSetup()
        this.routerSetup()
    }

    parserSetup(){
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(cookieParser())
    }

    routerSetup(){
        this.app.use('/api', api)
        this.app.use('/public', express.static(path.join(__dirname, '../../public')))
        this.app.get('*', device.capture(), serve)
    }
}

export default ExpressApp