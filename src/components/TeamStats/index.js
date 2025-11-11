// src/components/TeamStats/index.js
import {PieChart, Pie, Cell, Legend, Tooltip} from 'recharts'
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
    <div
      className="team-stats-container"
      style={{
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        backgroundColor: '#0f172a',
        padding: '16px',
        borderRadius: '12px',
      }}
    >
      <h2 className="team-stats-heading">Team Match Statistics</h2>

      {/* The key fix: give explicit width/height and center the chart */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PieChart width={350} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map(entry => (
              <Cell
                key={entry.name}
                name={entry.name}
                fill={COLORS[data.indexOf(entry) % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  )
}

export default TeamStats
