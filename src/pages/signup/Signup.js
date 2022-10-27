// styles
import "./Signup.css"
import { useState } from "react"
import { useSignup } from "../../hooks/useSignup"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [thumbNail, setThumbNail] = useState(null)
  const [thumbNailError, setThumbNailError] = useState(null)

  const { signup, error, isPending } = useSignup()

  const handleFileChange = (e) => {
    setThumbNail(null)
    let selected = e.target.files[0]
   

    if (!selected) {
      setThumbNailError("please select an image file")
      return
    }
    if (!selected.type.includes("image")) {
      setThumbNailError("file need to be an image file")
      return
    }
    if (selected.size > 100000) {
      setThumbNailError("fiel size must be less than 100kb")
      return
    }
    setThumbNail(selected)
    setThumbNailError(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbNail)
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
      <label>
        <span>Display Name:</span>
        <input
          required
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile Thumbnail</span>
        <input required type="file" onChange={handleFileChange} />
        {thumbNailError && <div className="error">{thumbNailError}</div>}
      </label>
      {!isPending && (
        <button className="btn" type="submit">
          Sign up
        </button>
      )}
      {isPending && (
        <button  disable className="btn" type="submit">
          loading
        </button>
      )}
      {error && <div>{error}</div>}

    </form>
  )
}
