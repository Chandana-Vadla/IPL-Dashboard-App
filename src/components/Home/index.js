// Write your code here
import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {
    iplTeamsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getIplTeamsList()
  }

  getIplTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const jsonResponse = await response.json()
    const result = jsonResponse.teams
    // console.log(res)
    const data = result.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      teamImageUrl: eachItem.team_image_url,
    }))

    this.setState({
      iplTeamsList: data,
      isLoading: false,
    })
  }

  render() {
    const {iplTeamsList, isLoading} = this.state
    return (
      <div className="home-container">
        <div className="title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="ipl-dashboard-heading">IPL Dashboard</h1>
        </div>
        <ul className="team-cards-container">
          {isLoading ? (
            <div testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            iplTeamsList.map(eachItem => (
              <TeamCard key={eachItem.id} teamCardDetails={eachItem} />
            ))
          )}
        </ul>
      </div>
    )
  }
}

export default Home
