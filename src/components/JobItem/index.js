import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {FaSuitcase} from 'react-icons/fa'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItem extends Component {
  state = {
    jobDetailsList: [],
    similarJobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItem()
  }

  onRetryJobDetailsAgain = () => {
    this.getJobItem()
  }

  getJobItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const optionsJobData = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const responseJobData = await fetch(jobDetailsApiUrl, optionsJobData)
    if (responseJobData.ok === true) {
      const fetchedJobData = await responseJobData.json()
      const updatedJobDetailsData = [fetchedJobData.job_details].map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          companyWebsiteUrl: eachItem.company_website_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          lifeAtCompany: {
            description: eachItem.life_at_company.description,
            imageUrl: eachItem.life_at_company.image_url,
          },
          location: eachItem.location,
          packagePerAnnum: eachItem.package_per_annum,
          rating: eachItem.rating,
          skills: eachItem.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
          title: eachItem.title,
        }),
      )

      const updatedSimilarJobDetails = fetchedJobData.similar_jobs.map(
        eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
          employmentType: eachItem.employment_type,
        }),
      )
      this.setState({
        jobDetailsList: updatedJobDetailsData,
        similarJobsList: updatedSimilarJobDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobFailureView = () => (
    <div className="job-details-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <div className="btn-container-failure">
        <button
          className="logout-btn"
          type="button"
          onClick={this.onRetryJobDetailsAgain}
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderJobLoadingView = () => (
    <div className="job-details-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobDetailsSuccessView = () => {
    const {jobDetailsList} = this.state
    return (
      <div className="ul-job-item">
        {jobDetailsList.map(each => (
          <div key={each.id} className="job-item">
            <div className="company-brand">
              <img
                src={each.companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div>
                <h1 className="company-title">{each.title}</h1>
                <div className="rating-sec">
                  <BsFillStarFill className="star" />
                  <p>{each.rating}</p>
                </div>
              </div>
            </div>
            <div className="section-2">
              <div className="section-3">
                <div className="section-21">
                  <GoLocation />
                  <p className="icon-label">{each.location}</p>
                </div>
                <div className="section-21">
                  <FaSuitcase />
                  <p className="icon-label">{each.employmentType}</p>
                </div>
              </div>
              <p>{each.packagePerAnnum}</p>
            </div>
            <hr className="hr" />
            <div className="visit-sec">
              <h3>Description</h3>
              <div className="visit-sec1">
                <a href={each.companyWebsiteUrl} className="visit">
                  Visit
                </a>
                <BiLinkExternal className="visit-icon" />
              </div>
            </div>
            <p>{each.jobDescription}</p>
            <h3>Skills</h3>
            <div className="skills-cont">
              {each.skills.map(eachSkill => (
                <li key={eachSkill.name} className="each-skill">
                  <img
                    src={eachSkill.imageUrl}
                    alt={eachSkill.name}
                    className="each-skill-image"
                  />
                  <p>{eachSkill.name}</p>
                </li>
              ))}
            </div>
            <h3>Life At Company</h3>
            <div className="life-at-company">
              <p className="life-at-company-title">
                {each.lifeAtCompany.description}
              </p>
              <img
                className="life-at-company-img"
                src={each.lifeAtCompany.imageUrl}
                alt="life at company"
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  renderSimilarJobsList = () => {
    const {similarJobsList} = this.state
    return (
      <ul className="ul-job-item1">
        {similarJobsList.map(each => (
          <li className="job-item2">
            <div className="company-brand">
              <img
                className="company-logo"
                src={each.companyLogoUrl}
                alt="similar job company logo"
              />
              <div>
                <h1 className="company-title">{each.title}</h1>
                <div className="rating-sec">
                  <BsFillStarFill className="star" />
                  <p>{each.rating}</p>
                </div>
              </div>
            </div>
            <div className="section-2">
              <div className="section-3">
                <div className="section-21">
                  <GoLocation />
                  <p className="icon-label">{each.location}</p>
                </div>
                <div className="section-21">
                  <FaSuitcase />
                  <p className="icon-label">{each.employmentType}</p>
                </div>
              </div>
            </div>
            <h3>Description</h3>
            <p>{each.jobDescription}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-bg">
        <Header />
        {this.renderJobDetails()}

        <h2 className="similar-jobs-head">Similar Jobs</h2>
        {this.renderSimilarJobsList()}
      </div>
    )
  }
}

export default JobItem
