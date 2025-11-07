// Write your code here
// Write your code here
// Write your code here
import './index.css'

const MatchCard = props => {
  const {recentMatchDetails} = props

  return (
    <li className="recent-match-item">
      <img
        src={recentMatchDetails.competingTeamLogo}
        alt={`competing team ${recentMatchDetails.competingTeam}`}
        className="competing-team-logo"
      />
      <p>{recentMatchDetails.competingTeam}</p>
      <p>{recentMatchDetails.result}</p>
      <p>{recentMatchDetails.matchStatus}</p>
    </li>
  )
}

export default MatchCard
