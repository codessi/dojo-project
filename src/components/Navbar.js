import { Link } from "react-router-dom"

// styles & images
import "./Navbar.css"
import Temple from "../assets/temple.svg"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

export default function Navbar() {
  const { logout, isPending, error } = useLogout()
  const { user } = useAuthContext()

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>The Dojo</span>
        </li>

        {!user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}

    { user &&    <li>
          {!isPending && (
            <button onClick={logout} className="btn">
              Logout
            </button>
          )}
          {isPending && (
            <button disable className="btn">
              Logging out...
            </button>
          )}
        </li>}
      </ul>
    </nav>
  )
}
