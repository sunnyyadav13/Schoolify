import React, { useState } from 'react'
import './adminValidate.css'
import Admin from './Admin'

const AdminValidate = () => {
    const [verifiedAdmin, setVerifiedAdmin] = useState(false)

    const CheckAdmin = () => {
        const [password, setPassword] = useState('')
        const checkPassword = (e) => {
            e.preventDefault()
            if (password === 'admin')
                setVerifiedAdmin(true)
            else
                alert('Wrong password')
        }
        return (
            <div>
                <section className="vh-100 gradient-custom">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }} >
                                    <div className="card-body p-5 text-center">

                                        <div className="mb-md-5 mt-md-4 pb-5">

                                            <h2 className="fw-bold mb-2 text-uppercase">Admin Login</h2>
                                            <p className="text-white-50 mb-5">Please enter your password!</p>

                                            <div className="form-outline form-white mb-4">
                                                <input type="password" id="typePasswordX" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                                                <label className="form-label" htmlFor="typePasswordX">Password</label>
                                            </div>

                                            <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={checkPassword}>Login</button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    return (
        <>
            {!verifiedAdmin ? <CheckAdmin /> : <Admin />}
        </>
    )
}

export default AdminValidate
