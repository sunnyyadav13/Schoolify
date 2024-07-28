import React, { useEffect, useState } from 'react'
import profileImage from '../../images/studentlogo.png'
import { useNavigate } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})    //We need to initialize userData here as an empty object ({})
    //Otherwise the error => userData undefined will be shown later

    const callAboutPageFromBackend = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"  //This allows us to include all details like cookies etc with the GET request
            })
            const data = await res.json()
            setUserData(data)

            if (res.status !== 200) {
                const error = new Error(res.error)
                throw error
            }
        } catch (err) {
            console.log(err)
            navigate('/login')
        }
    }

    useEffect(() => {
        const loggedIn = JSON.parse(localStorage.getItem('userVerified'))
        if (loggedIn === true) {
            callAboutPageFromBackend()
        } else
            navigate('/login')
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div style={{ backgroundColor: '#EED6C4' }} className="container emp-profile border g-0 rounded shadow-sm mt-3">
                <form method="GET">
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <img width='200' height='200' src={profileImage} alt="profile img" />
                        </div>

                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p className="profile-rating mt-3 mb-5">
                                    RANKINGS: <span> 1/10 </span>
                                </p>

                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-bs-toggle="tab" href="#home" role="tab">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-bs-toggle="tab" href="#profile" role="tab">Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>


                    </div>

                    <div className="row">
                        {/* left side url */}
                        <div className="col-md-4">

                        </div>

                        {/* right side data toggle */}
                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">
                                {/* About */}
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>USER ID</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData._id}</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>NAME</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>EMAIL</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>PHONE</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>EXPREIENCE</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Expert</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>TOTAL PROJECTS</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>20</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>ROLE</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Full Stack Developer</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default About
