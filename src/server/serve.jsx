import React from 'react'
import App from '../shared/App'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from "react-router";
import fs from 'fs'
import path from 'path'
import { Provider } from 'react-redux'
import getPreLoadedState from './getPreLoadedState'
import serialize from 'serialize-javascript'
import url from 'url'
import { Helmet } from 'react-helmet'

const serve = async (req, res) => {
    const deviceType = req.device && req.device.type && req.device.type.toUpperCase() || "DESKTOP"
    const requestUrl = req.url
    // const parsedUrl = url.parse(requestUrl)
    // console.log(parsedUrl.pathname)
    const store = await getPreLoadedState(requestUrl)
    const appRenderingResult = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={requestUrl} context={{}}>
                <App/>
            </StaticRouter>
        </Provider>
    )
    const helmet = Helmet.renderStatic()

    const indexFile = fs.readFileSync(path.join(__dirname, '../../public/index.html'), { encoding : 'utf-8' })
    const rendered = indexFile.replace(
        '<meta helmet>',
        `${helmet.title.toString()}${helmet.meta.toString()}`
    ).replace(
        '<div id="app-root"></div>', 
        `<div id="app-root">${appRenderingResult}</div><script>window.__PRELOADED_STATE__ = ${serialize(store.getState())}</script>`
    )
    res.send(rendered)
}

export default serve