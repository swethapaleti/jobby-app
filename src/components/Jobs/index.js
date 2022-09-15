import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobItem from '../JobItem'
import UserProfile from '../UserProfile'

import './index.css'
import FilterGroup from '../FilterGroup'

class Jobs extends Component {
  state = {
    searchInput: '',
    dataList: [],
    phase: '',
    salaryRange: '',
    employmentTypes: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({phase: 'loading'})
    const {salaryRange, employmentTypes, searchInput} = this.state
    const joinedEmployementTypes = employmentTypes.join(',')
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    try {
      const response = await fetch(
        `https://apis.ccbp.in/jobs?&minimum_package=${salaryRange}&employment_type=${joinedEmployementTypes}&search=${searchInput}`,
        options,
      )
      const data = await response.json()
      const {jobs} = data
      const formattedData = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      if (response.ok === true) {
        this.setState({phase: 'success', dataList: formattedData})
      } else {
        this.setState({phase: 'failure'})
      }
    } catch (e) {
      this.setState({phase: 'failure'})
    }
  }

  changeInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onSearchInput = event => {
    if (event.key === 'Enter') {
      this.getData()
    }
  }

  renderJobs = () => {
    const {phase} = this.state
    switch (phase) {
      case 'success':
        return this.renderSuccess()
      case 'failure':
        return this.renderFailure()
      case 'loading':
        return this.renderLoading()
      default:
        return null
    }
  }

  renderSuccess = () => {
    const {dataList} = this.state
    return (
      <div>
        {dataList.length === 0 && (
          <div>
            <img
              alt="no jobs"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
          </div>
        )}
        {dataList.length !== 0 && (
          <ul>
            {dataList.map(each => (
              <JobItem item={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={this.getData} type="button">
        Retry
      </button>
    </div>
  )

  renderLoading = () => (
    <div>
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onEmploymentType = (newType, checked) => {
    const {employmentTypes} = this.state
    if (checked) {
      this.setState(
        {
          employmentTypes: [...employmentTypes, newType],
        },
        this.getData,
      )
    } else {
      const newValue = employmentTypes.filter(each => each !== newType)
      this.setState({employmentTypes: newValue})
    }
  }

  onSalaryRange = salaryRange => {
    console.log(`Salary range changed`)
    this.setState({salaryRange}, this.getData)
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="bg">
        <Header />
        <UserProfile />
        <FilterGroup
          onEmploymentType={this.onEmploymentType}
          onSalaryRange={this.onSalaryRange}
        />
        <div>
          <input
            type="search"
            onChange={this.changeInput}
            value={searchInput}
            onKeyDown={this.onSearchInput}
          />
          <button onClick={this.getData} type="button">
            <BsSearch />
          </button>
          {this.renderJobs()}
        </div>
      </div>
    )
  }
}

export default Jobs
