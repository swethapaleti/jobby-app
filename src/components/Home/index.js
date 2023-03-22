import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-bg">
        <Header />
        <div className="home-sub">
          <h1 className="home-head">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and potential
          </p>
          <Link to="/jobs">
            <button className="logout-btn" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
