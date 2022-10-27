// styles

import { useState } from "react"
import { useLogin} from "../../hooks/useLogin"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  


  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
   
    login(email, password)

  


  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>
        <span>Email:</span>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      
      {!isPending && (
        <button className="btn" type="submit">
          Sign in
        </button>
      )}
      {isPending && (
        <button  disabled className="btn" type="submit">
          Signning in..
        </button>
      )}
      {error && <div>{error}</div>}

    </form>
  )
}
