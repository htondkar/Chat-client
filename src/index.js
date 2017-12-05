import { render } from 'inferno'
import { Router, Route, IndexRoute } from 'inferno-router'
import { createBrowserHistory } from 'history'

import App from './App'
import LoginPage from './Components/Authentication/LoginPage'
import SingUpPage from './Components/Authentication/SingUpPage'
import ChatContainer from './Components/Chat/ChatContainer'
import authStore from './stores/authStore'
import './webSocket'

import './styles/base.css'

authStore.checkPrevAuth()

export const browserHistory = createBrowserHistory()

const routes = (
  <Router history={browserHistory}>
    <Route component={App}>
      <IndexRoute component={LoginPage} />
      <Route path="sign-up" component={SingUpPage} />
      <Route path="chat" component={ChatContainer} />
    </Route>
  </Router>
)

render(routes, document.getElementById('app'))
