// Write your code here
// Write your code here
import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {teamCardDetails} = props
  const {teamImageUrl, name, id} = teamCardDetails

  return (
    <Link
      to={`/team-matches/${id}`}
      className="team-card-container"
      type="button"
    >
      <li>
        <img src={teamImageUrl} alt={name} className="team-image" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
