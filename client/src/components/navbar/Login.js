import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from "../../App"
import './login.css'

const Login = () => {

  // let {state, dispatch} = useContext(UserContext)
  const dispatch = useContext(UserContext).dispatch

  const navigate = useNavigate()
  const [email, setEmail] = useState('')      //If we dont put '' inside brackets, then the browser will throw an error stating that the value of undefined has been changed to defined or something like that
  const [password, setPassword] = useState('')

  const loginUser = async (e) => {

    e.preventDefault()

    if (email === "" || password === "") {
      window.alert(" Please Enter Details")
      return;
    }
    try {
      const res = await fetch('/signin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,              //email:email
          password            //password: password
        })
      })
      const data = await res.json()
      if (!data || res.status !== 201) {
        window.alert("Invalid Credentials")
        console.log("Invalid Credentials")
      } else {
       
        dispatch({ type: "USER", payload: true })    //type => type of action
        
        localStorage.setItem('userVerified', JSON.stringify(true))
        window.alert("Login Successful")
        navigate("/")
      }
    } catch {
      window.alert("Invalid Credentials")
      console.log("Invalid Credentials")
    }
  }

  return (
    <>
      <section className="vh-10 gradient-custom">
        <div className="container py-3 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                <div className="card-body p-5 text-center">

                  <div className="mb-md-5 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                    <div className="form-outline form-white mb-4">
                      <input type="email" id="typeEmailX" className="form-control form-control-lg" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                      <label className="form-label" htmlFor="typeEmailX">Email</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input type="password" id="typePasswordX" className="form-control form-control-lg" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                      <label className="form-label" htmlFor="typePasswordX">Password</label>
                    </div>

                    <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={loginUser}>Login</button>
                    <div>
                      <br />
                      New User ? <br />

                      <NavLink to="/signup" className="signup-image-link">Create an Account</NavLink>
                    </div>




                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
