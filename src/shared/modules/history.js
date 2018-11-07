import { createBrowserHistory, createMemoryHistory } from 'history'
const history = process.env.isBrowser ? createBrowserHistory() : createMemoryHistory()
export default history
