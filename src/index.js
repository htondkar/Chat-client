import { render } from 'inferno'
import App from './App'
import LoginPage from './LoginPage'
import SingUpPage from './SingUpPage'
import { Router, Route, IndexRoute } from 'inferno-router'
import { createBrowserHistory } from 'history'

import './styles/base.css'

export const browserHistory = createBrowserHistory()

const routes = (
  <Router history={browserHistory}>
    <Route component={App}>
      <IndexRoute component={LoginPage} />
      <Route path="sign-up" component={SingUpPage} />
    </Route>
  </Router>
)

render(routes, document.getElementById('app'))
