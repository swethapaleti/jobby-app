import {Link} from 'react-router-dom'

const JobItem = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = item
  return (
    <Link to={`/jobs/${id}`}>
      <li>
        <div>
          <div>
            <img alt="company logo" src={companyLogoUrl} />
            <h1>{title}</h1>
            <p>{rating}</p>
          </div>
          <p>{location}</p>
          <p>{employmentType}</p>
          <p>{packagePerAnnum}</p>
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
