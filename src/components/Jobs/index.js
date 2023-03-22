import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    activeEmployeType: [],
    salaryRange: '',
    searchInputValue: '',
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    profileData: [],
    apiProfileStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsList()
    this.onGetProfileDetails()
  }

  onGetProfileDetails = async () => {
    this.setState({apiProfileStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const optionsProfile = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseProfile = await fetch(profileApiUrl, optionsProfile)

    if (responseProfile.ok === true) {
      const fetchedDataProfile = [await responseProfile.json()]
      const updatedDataProfile = fetchedDataProfile.map(eachItem => ({
        name: eachItem.profile_details.name,
        profileImageUrl: eachItem.profile_details.profile_image_url,
        shortBio: eachItem.profile_details.short_bio,
      }))
      this.setState({
        profileData: updatedDataProfile,
        apiProfileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiProfileStatus: apiStatusConstants.failure})
    }
  }

  getJobsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeEmployeType, salaryRange, searchInputValue} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmployeType}&minimum_package=${salaryRange}&search=${searchInputValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(product => ({
        companyLogoUrl: product.company_logo_url,
        employmentType: product.employment_type,
        jobDescription: product.job_description,
        id: product.id,
        location: product.location,
        rating: product.rating,
        packagePerAnnum: product.package_per_annum,
        title: product.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSalaryRange = e => {
    this.setState({salaryRange: e.target.id}, this.getJobsList)
  }

  changeActiveEmployeType = e => {
    const {activeEmployeType} = this.state
    const inputNotInList = activeEmployeType.filter(
      each => each === e.target.id,
    )
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          activeEmployeType: [...prevState.activeEmployeType, e.target.id],
        }),
        this.getJobsList,
      )
    } else {
      const filteredData = activeEmployeType.filter(
        each => each !== e.target.id,
      )
      this.setState({activeEmployeType: filteredData}, this.getJobsList)
    }
  }

  renderCheckBoxes = () => (
    <ul className="ul">
      {employmentTypesList.map(each => (
        <li key={each.employmentTypeId} className="li-item">
          <input
            type="checkbox"
            id={each.employmentTypeId}
            onChange={this.changeActiveEmployeType}
          />
          <label htmlFor={each.employmentTypeId}>{each.label}</label>
        </li>
      ))}
    </ul>
  )

  renderSalaryRanges = () => (
    <ul className="ul">
      {salaryRangesList.map(each => (
        <li key={each.salaryRangeId} className="li-item1">
          <input
            type="radio"
            id={each.salaryRangeId}
            name="option"
            onChange={this.changeSalaryRange}
          />
          <label htmlFor={each.salaryRangeId}>{each.label}</label>
        </li>
      ))}
    </ul>
  )

  renderJobsListView = () => {
    const {jobsList} = this.state
    const len = jobsList.length > 0
    return len ? (
      <ul className="ul">
        {jobsList.map(each => (
          <JobCard key={each.id} details={each} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          className="no-jobs-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No jobs found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#ffff" height="50" width="50" />
    </div>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  onEnterSearchInput = () => {
    this.getJobsList()
  }

  onChangeSearchInput = e => {
    this.setState({searchInputValue: e.target.value})
  }

  onGetProfileView = () => {
    const {profileData} = this.state
    return (
      <>
        {profileData.map(each => (
          <div className="profile-bg">
            <img
              src={each.profileImageUrl}
              className="profile-icon"
              alt="profile"
            />
            <h1 className="profile-name">{each.name}</h1>
            <p className="profile-description">{each.shortBio}</p>
          </div>
        ))}
      </>
    )
  }

  render() {
    return (
      <div>
        <Header />
        <div className="jobs-bg">
          <div className="left-section">
            <div className="search-input-container1">
              <input
                type="search"
                className="mobile-search"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                className="search-btn"
                type="button"
                onKeyDown={this.onEnterSearchInput1}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.onGetProfileView()}
            <hr className="hr" />
            <h1 className="filters-head">Type of Employment</h1>
            {this.renderCheckBoxes()}
            <hr className="hr" />
            <h1 className="filters-head1">Salary Range</h1>
            {this.renderSalaryRanges()}
            <hr className="hr" />
          </div>
          <div className="right-section">
            <div className="search-input-container">
              <input
                type="search"
                className="desktop-search"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                className="search-btn"
                type="button"
                onClick={this.onEnterSearchInput1}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderAllProducts()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
