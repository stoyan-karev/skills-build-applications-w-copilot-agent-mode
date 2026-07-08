import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [state, setState] = useState({ items: [], status: 'loading', error: '', apiUrl: '' })

  useEffect(() => {
    let isMounted = true

    fetchCollection('leaderboard')
      .then(({ items, apiUrl, configurationError }) => {
        if (isMounted) {
          setState({
            items,
            status: configurationError ? 'configured' : 'loaded',
            error: configurationError || '',
            apiUrl: apiUrl || '',
          })
        }
      })
      .catch((error) => {
        if (isMounted) {
          setState({ items: [], status: 'error', error: error.message, apiUrl: '' })
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="resource-view">
      <div className="resource-heading">
        <span className="eyebrow">Competitive standings</span>
        <h1>Leaderboard</h1>
        <p>Ranked athletes and team momentum from the leaderboard endpoint.</p>
      </div>

      <StatusBanner state={state} />

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Athlete</th>
              <th>Team</th>
              <th>Points</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {state.items.map((entry) => (
              <tr key={entry._id || entry.username || entry.rank}>
                <td>#{entry.rank ?? '-'}</td>
                <td>
                  <strong>{entry.displayName || entry.username || 'Unknown athlete'}</strong>
                  <span>{entry.username}</span>
                </td>
                <td>{entry.team || 'Independent'}</td>
                <td>{entry.points ?? 0}</td>
                <td>{entry.trend || 'steady'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function StatusBanner({ state }) {
  if (state.status === 'loaded' && state.items.length > 0) {
    return <p className="api-note">Loaded from {state.apiUrl}</p>
  }

  if (state.status === 'loading') {
    return <p className="api-note">Loading leaderboard...</p>
  }

  return <p className="api-warning">{state.error || 'No leaderboard entries returned by the API.'}</p>
}

export default Leaderboard