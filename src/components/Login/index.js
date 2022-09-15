import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onPassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  loginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }
    try {
      const response = await fetch('https://apis.ccbp.in/login', options)
      const data = await response.json()
      if (response.ok === true) {
        const jwtToken = data.jwt_token
        Cookies.set('jwt_token', jwtToken, {expires: 30})
        const {history} = this.props
        history.replace('/')
      } else {
        this.setState({
          errorMsg: data.error_msg,
        })
      }
    } catch (e) {
      this.setState({
        errorMsg: e.message,
      })
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <form onSubmit={this.loginForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div>
            <label htmlFor="username">USERNAME</label>
            <input
              placeholder="Username"
              onChange={this.onUsername}
              id="username"
              value={username}
            />
          </div>
          <div>
            <label htmlFor="password">PASSWORD</label>
            <input
              onChange={this.onPassword}
              type="password"
              id="password"
              value={password}
            />
          </div>
          <button type="submit">Login</button>
          {errorMsg !== '' && <p>{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
