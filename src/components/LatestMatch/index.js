// Write your code here
// Write your code here
// Write your code here
// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props

  return (
    <div>
      <h1 className="latest-matches-heading">Latest Matches</h1>
      <div className="latest-match-container">
        <div>
          <div>
            <p>{latestMatchDetails.competingTeam}</p>

            <p>{latestMatchDetails.date}</p>
            <p>{latestMatchDetails.venue}</p>
            <p>{latestMatchDetails.result}</p>
          </div>
          <img
            src={latestMatchDetails.competingTeamLogo}
            alt={`latest match ${latestMatchDetails.competingTeam}`}
            className="competingTeamLogo"
          />
        </div>

        <hr />
        <p>First Innings</p>
        <p>{latestMatchDetails.firstInnings}</p>
        <p>Second Innings</p>
        <p>{latestMatchDetails.secondInnings}</p>
        <p>Man Of The Match</p>
        <p>{latestMatchDetails.manOfTheMatch}</p>
        <p>Umpires</p>
        <p>{latestMatchDetails.umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
