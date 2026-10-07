import { Link } from 'react-router-dom'

export const Loading = ({ label = 'Loading…' }) => (
  <div className="status" role="status">
    <span className="spinner" aria-hidden="true" />
    {label}
  </div>
)

export const ErrorMessage = ({ title = 'Something went wrong', message, showHomeLink = false }) => (
  <div className="status status-error" role="alert">
    <h2>{title}</h2>
    {message && <p>{message}</p>}
    {showHomeLink && (
      <Link to="/" className="button">
        Back to the map
      </Link>
    )}
  </div>
)
