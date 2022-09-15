const SimilarJobs = props => {
  const {item} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = item
  return (
    <li>
      <div>
        <img src={companyLogoUrl} alt="similar job company logo" />
        <h1>{title}</h1>
        <p>{rating}</p>
        <p>{employmentType}</p>
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <p>{location}</p>
      </div>
    </li>
  )
}

export default SimilarJobs
