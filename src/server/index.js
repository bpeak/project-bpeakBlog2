import path from 'path'
global.__rootDir = path.resolve(__dirname)

import dbLauncher from '~db/dbLauncher'
import ExpressApp from './ExpressApp'

dbLauncher()
const app = new ExpressApp().app

const PORT = 80
app.listen(PORT, () => {
    console.log(`PORT ${PORT} CONNECTED SUCCESS`)
})