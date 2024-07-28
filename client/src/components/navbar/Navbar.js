//Using bootstrap 5 => add js file link in index.html
//When using bootstrap components, remember that in jsx, every tag should have closing 
//(in html, some tags dont have closing like <input> or <hr>)
import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'
import logo from '../../images/logo.png'
import { UserContext } from '../../App'

const Navbar = () => {

    const { state, dispatch } = useContext(UserContext)


    const [userName, setUserName] = useState('')

    const getCurrentUserDetails = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            setUserName(data.name)
            localStorage.setItem('userName', data.name)
            localStorage.setItem('quizAttempted', data.quizAttempted)
            if (data.quizAttempted)
                localStorage.setItem('lastQuizMarks', data.lastQuizMarks)
            localStorage.setItem('email', data.email)
        } catch (err) {
            console.log(err)
        }
    }

    const resetClasses = async () => {
        try {
            await fetch('/resetClasses', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            alert('Fresh booking started for classes')
        } catch (error) {
            console.log(error)
        }
    }

    const getDetailsForClassReset = async () => {
        try {
            const res = await fetch('/getDetailsForClassReset', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            const lastDate = data.date
            const today = new Date()
            const todaysDate = today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear()
            if (lastDate !== todaysDate)
                resetClasses()
        } catch (error) {
            console.log(error)
        }
    }

    const getUserLoginDetails = () => {
        let userLogin = localStorage.getItem('userVerified')
        let boolUserLogin = false
        if (userLogin && userLogin !== 'undefined') {
            boolUserLogin = JSON.parse(userLogin)
        } else {
            localStorage.setItem('userVerified', 'false')
            setUserName('')
        }
        dispatch({ type: "USER", payload: boolUserLogin })
    }

    useEffect(() => {
        getUserLoginDetails()
        getDetailsForClassReset()
        // eslint-disable-next-line
    }, [])

    const LoginLogoutNavs = () => {
        if (state) {
            getCurrentUserDetails()
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/signup">Registration</NavLink>
                    </li>
                </>
            )
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#D8E9A8' }}>
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#"><img src={logo} width="50" height="50" alt="logo" /></NavLink>
                    {userName}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">    
                            <LoginLogoutNavs />
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
