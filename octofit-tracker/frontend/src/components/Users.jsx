import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [state, setState] = useState({ items: [], status: 'loading', error: '', apiUrl: '' })

  useEffect(() => {
    let isMounted = true

    fetchCollection('users')
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
        <span className="eyebrow">Profiles</span>
        <h1>Users</h1>
        <p>Athlete profiles with goals, fitness levels, and preferred training styles.</p>
      </div>

      <StatusBanner state={state} />

      <div className="data-grid">
        {state.items.map((user) => (
          <article className="data-card" key={user._id || user.username}>
            <div className="card-kicker">{user.profile?.fitnessLevel || 'member'}</div>
            <h2>{user.displayName || user.username || 'Unknown user'}</h2>
            <p>{user.email || 'No email provided'}</p>
            <dl>
              <div>
                <dt>Username</dt>
                <dd>{user.username || '-'}</dd>
              </div>
              <div>
                <dt>Weekly goal</dt>
                <dd>{user.profile?.weeklyGoalMinutes ?? 0} min</dd>
              </div>
            </dl>
            <p className="muted">{formatList(user.profile?.preferredActivities)}</p>
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
    return <p className="api-note">Loading users...</p>
  }

  return <p className="api-warning">{state.error || 'No users returned by the API.'}</p>
}

function formatList(values) {
  return Array.isArray(values) && values.length > 0 ? values.join(', ') : 'No preferences listed'
}

export default Users