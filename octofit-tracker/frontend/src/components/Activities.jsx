import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [state, setState] = useState({ items: [], status: 'loading', error: '', apiUrl: '' })

  useEffect(() => {
    let isMounted = true

    fetchCollection('activities')
      .then(({ items, apiUrl, configurationError }) => {
        if (!isMounted) {
          return
        }

        setState({
          items,
          status: configurationError ? 'configured' : 'loaded',
          error: configurationError || '',
          apiUrl: apiUrl || '',
        })
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
        <span className="eyebrow">Activity logging</span>
        <h1>Activities</h1>
        <p>Recent workouts, scoring, calories, duration, and distance from the Octofit API.</p>
      </div>

      <StatusBanner state={state} />

      <div className="data-grid activity-grid">
        {state.items.map((activity) => (
          <article className="data-card" key={activity._id || `${activity.username}-${activity.loggedAt}`}>
            <div className="card-kicker">{activity.type || 'activity'}</div>
            <h2>{activity.username || 'Unknown athlete'}</h2>
            <dl>
              <div>
                <dt>Duration</dt>
                <dd>{formatNumber(activity.durationMinutes)} min</dd>
              </div>
              <div>
                <dt>Distance</dt>
                <dd>{formatNumber(activity.distanceKm)} km</dd>
              </div>
              <div>
                <dt>Calories</dt>
                <dd>{formatNumber(activity.caloriesBurned)}</dd>
              </div>
              <div>
                <dt>Points</dt>
                <dd>{formatNumber(activity.points)}</dd>
              </div>
            </dl>
            <p className="muted">{formatDate(activity.loggedAt)}</p>
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
    return <p className="api-note">Loading activities...</p>
  }

  return <p className="api-warning">{state.error || 'No activities returned by the API.'}</p>
}

function formatDate(value) {
  if (!value) {
    return 'No log date'
  }

  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

function formatNumber(value) {
  return value ?? '0'
}

export default Activities