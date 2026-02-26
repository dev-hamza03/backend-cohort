import "../styles/form.scss"
import { Link } from "react-router"
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";


const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    handleLogin(username, password)
      .then((res) => {
        console.log(res);
      })




  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} >
          <input
            onInput={(e) => {
              setUsername(e.target.value)
            }}
            type="text"
            name='username'
            placeholder='Ebter username'
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value)
            }}
            type="password"
            name='password'
            placeholder='Enter password'
          />
          <button
            type='submit'
          >
            Submit
          </button>
        </form>

        <p>
          Already have an account? <Link className="toggle-auth-form" to={'/Register'}>Register</Link>
        </p>
      </div>
    </main>
  )
}

export default Login
