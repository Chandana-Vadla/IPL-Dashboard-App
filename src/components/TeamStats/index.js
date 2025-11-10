import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import './index.css'

const TeamStats = props => {
  const {won, lost, drawn, colors} = props

  const COLORS = colors || ['#00C49F', '#FF4444', '#FFBB28']

  const data = [
    {name: 'Won', value: won},
    {name: 'Lost', value: lost},
    {name: 'Drawn', value: drawn},
  ]

  return (
    <div className="team-stats-container">
      <h1 className="team-stats-heading">Team Match Statistics</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({name, value}) => `${name}: ${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TeamStats
