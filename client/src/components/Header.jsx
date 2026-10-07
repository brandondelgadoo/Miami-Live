import { Link, NavLink } from 'react-router-dom'

const Header = () => (
  <header className="site-header">
    <div className="container header-inner">
      <Link to="/" className="brand">
        <img src="/favicon.svg" alt="" width="32" height="32" />
        <span>
          Miami <strong>Live</strong>
        </span>
      </Link>
      <nav className="nav">
        <NavLink to="/" end>
          Venues
        </NavLink>
        <NavLink to="/events">All Events</NavLink>
      </nav>
    </div>
  </header>
)

export default Header
