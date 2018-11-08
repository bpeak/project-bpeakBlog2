import path from 'path'
global.__rootDir = path.resolve(__dirname)

import dbLauncher from '~db/dbLauncher'
import ExpressApp from './ExpressApp'
import { httpsConfig } from '~configs/secret/secret.config.js'

dbLauncher()
const app = new ExpressApp().app

if(process.env.NODE_ENV === 'development'){
    const PORT = 80
    app.listen(PORT, () => {
        console.log(`DEVSERVER : PORT ${PORT} CONNECTED SUCCESS`)
    })
} else {
    const lex = require('greenlock-express').create({
        configDir: httpsConfig.configDir,
        version : httpsConfig.version,
        server : httpsConfig.server,
        approveDomains: (opts, certs, cb) => {
            if (certs) {
                opts.domains = ['www.bpeakblog.com', 'bpeakblog.com']
            } else {
                opts.email = httpsConfig.email
                opts.agreeTos = true
            }
            cb(null, { options: opts, certs })
        },
        renewWithin: 81 * 24 * 60 * 60 * 1000,
        renewBy: 80 * 24 * 60 * 60 * 1000,
    })

    // handles acme-challenge and redirects to https
    const PORT_HTTP = 80
    const PORT_HTTPS = 443
    require('http').createServer(lex.middleware(require('redirect-https')())).listen(PORT_HTTP, () => {
        console.log(`PORT ${PORT_HTTP} CONNECTED SUCCESS`)
    })
    
    // handles your app
    require('https').createServer(lex.httpsOptions, lex.middleware(app)).listen(PORT_HTTPS, () => {
        console.log(`PORT ${PORT_HTTPS} CONNECTED SUCCESS`)
    })
}


