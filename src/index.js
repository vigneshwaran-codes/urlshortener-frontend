import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Redirect from './components/Redirect'
import Login from './forms/Login'
import Register from './forms/Register'
import ResetPassword from './forms/ResetPass'
import ForgotPassword from './components/ForgotPass'
import { ContextProvider } from './contexts/Context'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <Switch>
          <Route exact path='/'><Login /></Route>
          <Route exact path='/register'><Register /></Route>
          <Route exact path='/forgot-password'><ForgotPassword /></Route>
          <Route exact path='/reset-password/:id'><ResetPassword /></Route>
          <Route exact path='/redirect/:id'><Redirect /></Route>
        </Switch>
      </Router>
    </ContextProvider>
  </React.StrictMode>
)
