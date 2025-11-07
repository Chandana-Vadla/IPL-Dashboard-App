import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'

class TeamMatches extends Component {
  state = {
    teamMatchesData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const jsonResponse = await response.json()
    console.log(`jsonResponse== ${jsonResponse}`)

    const data = {
      teamBannerUrl: jsonResponse.team_banner_url,
      latestMatchDetails: {
        umpires: jsonResponse.latest_match_details.umpires,
        result: jsonResponse.latest_match_details.result,
        manOfTheMatch: jsonResponse.latest_match_details.man_of_the_match,
        id: jsonResponse.latest_match_details.id,
        date: jsonResponse.latest_match_details.date,
        venue: jsonResponse.latest_match_details.venue,
        competingTeam: jsonResponse.latest_match_details.competing_team,
        competingTeamLogo:
          jsonResponse.latest_match_details.competing_team_logo,
        firstInnings: jsonResponse.latest_match_details.first_innings,
        secondInnings: jsonResponse.latest_match_details.second_innings,
        matchStatus: jsonResponse.latest_match_details.match_status,
      },
      recentMatches: jsonResponse.recent_matches.map(eachRecentMatch => ({
        umpires: eachRecentMatch.umpires,
        result: eachRecentMatch.result,
        manOfTheMatch: eachRecentMatch.man_of_the_match,
        id: eachRecentMatch.id,
        date: eachRecentMatch.date,
        venue: eachRecentMatch.venue,
        competingTeam: eachRecentMatch.competing_team,
        competingTeamLogo: eachRecentMatch.competing_team_logo,
        firstInnings: eachRecentMatch.first_innings,
        secondInnings: eachRecentMatch.second_innings,
        matchStatus: eachRecentMatch.match_status,
      })),
    }

    this.setState({
      teamMatchesData: data,
      isLoading: false,
    })
  }

  render() {
    const {teamMatchesData, isLoading} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchesData
    // const {
    //   umpires,
    //   result,
    //   manOfTheMatch,
    //   id,
    //   date,
    //   venue,
    //   competingTeam,
    //   competingTeamLogo,
    //   firstInnings,
    //   secondInnings,
    //   matchStatus,
    // } = latestMatchDetails

    return (
      <div className="team-matches-container">
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div>
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            {latestMatchDetails && (
              <LatestMatch latestMatchDetails={latestMatchDetails} />
            )}
            <ul className="recent-matches-container">
              {recentMatches &&
                recentMatches.map(eachRecentMatch => (
                  <MatchCard
                    key={eachRecentMatch.id}
                    recentMatchDetails={eachRecentMatch}
                  />
                ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
