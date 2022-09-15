import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

class UserProfile extends Component {
  state = {
    userData: {},
    status: '',
  }

  componentDidMount() {
    this.getUserData()
  }

  getUserData = async () => {
    this.setState({status: 'loading'})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch('https://apis.ccbp.in/profile', options)
      const data = await response.json()
      const userData = data.profile_details
      const userProfile = {
        name: userData.name,
        profileImageUrl: userData.profile_image_url,
        shortBio: userData.short_bio,
      }
      if (response.ok === true) {
        this.setState({userData: userProfile, status: 'success'})
      } else {
        this.setState({status: 'failed'})
      }
    } catch (e) {
      this.setState({status: 'failed'})
    }
  }

  userProfileCard = () => {
    const {status} = this.state
    switch (status) {
      case 'success':
        return this.userSuccessCard()
      case 'failed':
        return this.userFailure()
      case 'loading':
        return this.userLoading()
      default:
        return null
    }
  }

  userFailure = () => (
    <div>
      <button onClick={this.getUserData} type="button">
        Retry
      </button>
    </div>
  )

  userLoading = () => (
    <div testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  userSuccessCard = () => {
    const {userData} = this.state
    const {name, profileImageUrl, shortBio} = userData

    return (
      <div>
        <img src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  render() {
    return <div>{this.userProfileCard()}</div>
  }
}

export default UserProfile
