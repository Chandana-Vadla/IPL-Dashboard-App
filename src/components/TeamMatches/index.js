import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {withRouter} from 'react-router-dom'
import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'
import TeamStats from '../TeamStats'

const TEAM_THEMES = {
  RCB: {bgColor: '#da237b', chartColors: ['#ffb3c1', '#f72585', '#7209b7']},
  KKR: {bgColor: '#3b0a45', chartColors: ['#a663cc', '#4a148c', '#c77dff']},
  KXP: {bgColor: '#a81c1c', chartColors: ['#ff6b6b', '#d00000', '#faa307']},
  CSK: {bgColor: '#f9d71c', chartColors: ['#f6aa1c', '#ffb703', '#fb8500']},
  RR: {bgColor: '#ec4899', chartColors: ['#ff80ab', '#f472b6', '#db2777']},
  MI: {bgColor: '#0f52ba', chartColors: ['#1e40af', '#60a5fa', '#3b82f6']},
  SH: {bgColor: '#ff4500', chartColors: ['#ff8c00', '#ffae42', '#fca311']},
  DC: {bgColor: '#0b5ed7', chartColors: ['#2196f3', '#1976d2', '#90caf9']},
}

class TeamMatches extends Component {
  state = {
    teamMatchesData: {},
    isLoading: true,
    teamId: '',
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
      teamId: id,
    })
  }

  handleBack = () => {
    const {history} = this.props
    history.push('/')
  }

  calculateStats = () => {
    const {teamMatchesData} = this.state
    const {recentMatches = []} = teamMatchesData

    let won = 0
    let lost = 0
    let drawn = 0

    recentMatches.forEach(match => {
      if (match.matchStatus === 'Won') {
        won += 1
      } else if (match.matchStatus === 'Lost') {
        lost += 1
      } else {
        drawn += 1
      }
    })

    return {won, lost, drawn}
  }

  render() {
    const {teamMatchesData, isLoading, teamId} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamMatchesData

    const stats = this.calculateStats()
    const theme = TEAM_THEMES[teamId] || {
      bgColor: '#0f172a',
      chartColors: ['#00C49F', '#FF4444', '#FFBB28'],
    }

    return (
      <div
        className="team-matches-container"
        style={{backgroundColor: theme.bgColor, minHeight: '100vh'}}
      >
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <button
              type="button"
              className="back-button"
              onClick={this.handleBack}
            >
              ← Back
            </button>
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
            <TeamStats
              won={stats.won}
              lost={stats.lost}
              drawn={stats.drawn}
              colors={theme.chartColors}
            />
          </>
        )}
      </div>
    )
  }
}

export default withRouter(TeamMatches)
