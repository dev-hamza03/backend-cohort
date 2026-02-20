import "../styles/form.scss"
import { Link } from "react-router"


const Login = () => {
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form>
          <input type="text" name='username' placeholder='Ebter username' />
          <input type="password" name='password' placeholder='Enter password' />
          <button type='submit' >Submit</button>
        </form>

         <p>
          Already have an account? <Link className="toggle-auth-form" to={'/Register '}>Register</Link>
        </p>
      </div>
    </main>
  )
}

export default Login
