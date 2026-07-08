import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Workouts() {
  const [state, setState] = useState({ items: [], status: 'loading', error: '', apiUrl: '' })

  useEffect(() => {
    let isMounted = true

    fetchCollection('workouts')
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
        <span className="eyebrow">Suggestions</span>
        <h1>Workouts</h1>
        <p>Personalized sessions matched to activity type, level, duration, and target athletes.</p>
      </div>

      <StatusBanner state={state} />

      <div className="data-grid">
        {state.items.map((workout) => (
          <article className="data-card" key={workout._id || workout.title}>
            <div className="card-kicker">{workout.activityType || 'training'}</div>
            <h2>{workout.title || 'Untitled workout'}</h2>
            <dl>
              <div>
                <dt>Difficulty</dt>
                <dd>{workout.difficulty || '-'}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes ?? 0} min</dd>
              </div>
            </dl>
            <p className="muted">For {formatList(workout.targetUsers)}</p>
            <ul className="exercise-list">
              {formatExercises(workout.exercises).map((exercise) => (
                <li key={exercise}>{exercise}</li>
              ))}
            </ul>
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
    return <p className="api-note">Loading workouts...</p>
  }

  return <p className="api-warning">{state.error || 'No workouts returned by the API.'}</p>
}

function formatList(values) {
  return Array.isArray(values) && values.length > 0 ? values.join(', ') : 'all users'
}

function formatExercises(values) {
  return Array.isArray(values) && values.length > 0 ? values : ['No exercises listed']
}

export default Workouts