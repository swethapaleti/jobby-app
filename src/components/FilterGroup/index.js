import './index.css'

// These are the lists used in the application. You can move them to any component needed.
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

const FilterGroup = props => {
  const {onEmploymentType, onSalaryRange} = props

  const renderCheckbox = item => {
    const {label, employmentTypeId} = item
    const changeCheckBox = event => {
      onEmploymentType(employmentTypeId, event.target.checked)
    }
    return (
      <li key={employmentTypeId} className="list-style">
        <input
          type="checkbox"
          id={employmentTypeId}
          onChange={changeCheckBox}
        />
        <label htmlFor={employmentTypeId}>{label}</label>
      </li>
    )
  }

  const renderRadioButton = item => {
    const {label, salaryRangeId} = item
    const changeRadioButton = () => {
      onSalaryRange(salaryRangeId)
    }
    return (
      <li key={salaryRangeId} className="list-style">
        <input
          type="radio"
          id={salaryRangeId}
          onChange={changeRadioButton}
          name="salary-range"
        />
        <label htmlFor={salaryRangeId}>{label}</label>
      </li>
    )
  }

  return (
    <div>
      <hr />
      <h1>Type of employment</h1>
      <ul>{employmentTypesList.map(renderCheckbox)}</ul>
      <hr />
      <h1>Salary Range</h1>
      <ul>{salaryRangesList.map(renderRadioButton)}</ul>
    </div>
  )
}

export default FilterGroup
