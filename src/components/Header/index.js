import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {FaSuitcase} from 'react-icons/fa'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <div className="mobile-view">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <div className="icons">
          <Link to="/">
            <AiFillHome className="home-icon" />
          </Link>
          <Link to="/jobs">
            <FaSuitcase className="home-icon" />
          </Link>
          <FiLogOut className="home-icon" onClick={onClickLogout} />
        </div>
      </div>

      <div className="desktop-view">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <ul className="icons-2">
          <Link to="/" className="link-item">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="link-item">
            <li>Jobs</li>
          </Link>
          <li>
            <button
              className="logout-btn"
              type="button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
