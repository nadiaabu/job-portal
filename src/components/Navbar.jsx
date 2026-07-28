import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <h2>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Job Portal: Hired
        </Link>
      </h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/">All Jobs</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar