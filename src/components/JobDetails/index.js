import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

class JobDetails extends Component {
  state = {
    dataItem: {},
    phase: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({
      phase: 'loading',
    })
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
      const data = await response.json()
      const jobDetails = data.job_details
      const similarJobs = data.similar_jobs
      const formattedData = {
        title: jobDetails.title,
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        similarJobs: similarJobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        })),
      }
      if (response.ok === true) {
        this.setState({
          phase: 'success',
          dataItem: formattedData,
        })
      } else {
        this.setState({
          phase: 'failure',
        })
      }
    } catch (e) {
      console.log(e)
      this.setState({phase: 'failure'})
    }
  }

  renderJobItem = () => {
    const {phase} = this.state
    switch (phase) {
      case 'success':
        return this.renderItemSuccess()
      case 'failure':
        return this.renderItemFailure()
      case 'loading':
        return this.renderItemLoading()
      default:
        return null
    }
  }

  renderItemFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.getJobDetails} type="button">
        Retry
      </button>
    </div>
  )

  renderItemLoading = () => (
    <div>
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderItemSuccess = () => {
    const {dataItem} = this.state
    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      similarJobs,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = dataItem
    const {description, imageUrl} = lifeAtCompany
    return (
      <div>
        <div>
          <img alt="job details company logo" src={companyLogoUrl} />
          <h1>{title}</h1>
          <p>{rating}</p>
          <p>{location}</p>
          <p>{employmentType}</p>
          <p>{packagePerAnnum}</p>
          <h1>Description</h1>
          <p>{jobDescription}</p>
          <a href={companyWebsiteUrl}>Visit</a>
          <h1>Skills</h1>
          <ul>
            {skills.map(each => (
              <div key={each.name}>
                <img alt={each.name} src={each.image_url} />
              </div>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div>
            <p>{description}</p>
            <img src={imageUrl} alt="life at company" />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul>
          {similarJobs.map(each => (
            <SimilarJobs item={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Header />
        <div>
          <div>{this.renderJobItem()}</div>
        </div>
      </div>
    )
  }
}

export default JobDetails
