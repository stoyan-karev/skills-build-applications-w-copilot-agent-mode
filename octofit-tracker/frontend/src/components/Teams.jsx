import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [state, setState] = useState({ items: [], status: 'loading', error: '', apiUrl: '' })

  useEffect(() => {
    let isMounted = true

    fetchCollection('teams')
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
        <span className="eyebrow">Team management</span>
        <h1>Teams</h1>
        <p>Training groups, captains, members, and weekly point targets.</p>
      </div>

      <StatusBanner state={state} />

      <div className="data-grid">
        {state.items.map((team) => (
          <article className="data-card" key={team._id || team.name}>
            <div className="card-kicker">Captain: {team.captain || 'Unassigned'}</div>
            <h2>{team.name || 'Unnamed team'}</h2>
            <p>{team.description || 'No team description provided.'}</p>
            <dl>
              <div>
                <dt>Members</dt>
                <dd>{team.members?.length ?? 0}</dd>
              </div>
              <div>
                <dt>Weekly goal</dt>
                <dd>{team.weeklyGoalPoints ?? 0} pts</dd>
              </div>
            </dl>
            <p className="muted">{formatList(team.members)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function StatusBanner({ state }) {
  if (state.status === 'loaded' && state.items.length > 0) {
    return <p className="api-note">Loaded from {state.apiUrl}</p>
  }

  if (state.status === 'loading') {
    return <p className="api-note">Loading teams...</p>
  }

  return <p className="api-warning">{state.error || 'No teams returned by the API.'}</p>
}

function formatList(values) {
  return Array.isArray(values) && values.length > 0 ? values.join(', ') : 'No members listed'
}

export default Teams