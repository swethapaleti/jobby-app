import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

const JobCard = props => {
  const {details} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    title,
    rating,
  } = details

  return (
    <Link to={`/jobs/${id}`} className="job-item-link">
      <li className="job-item">
        <div className="company-brand">
          <img className="company-logo" src={companyLogoUrl} alt={id} />
          <div>
            <h1 className="company-title">{title}</h1>
            <div className="rating-sec">
              <BsFillStarFill className="star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="section-2">
          <div className="section-3">
            <div className="section-21">
              <GoLocation />
              <p className="icon-label">{location}</p>
            </div>
            <div className="section-21">
              <FaSuitcase />
              <p className="icon-label">{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="hr" />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
