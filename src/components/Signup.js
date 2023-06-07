import React, { useContext, useState } from 'react'
import AuthContext from '../context/auth/AuthContext'
import AlertContext from '../context/alert/AlertContext'

const Signup = () => {
    const context = useContext(AuthContext)
    const alertContext = useContext(AlertContext)
    const { Signup } = context
    const { showAlert } = alertContext
    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" })

    const handleOnChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (credential.password === credential.cpassword) {
            Signup(credential.name, credential.email, credential.password)
        }
        else {
            showAlert("Password not matching", "danger")
        }

    }
    return (
        <div className="container">
            <h1>SignUp here</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input type="name" className="form-control" id="name" name="name" value={credential.name} autoComplete="name" onChange={handleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={credential.email} autoComplete="email" onChange={handleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credential.password} autoComplete="current-password" onChange={handleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" autoComplete="current-password" name="cpassword" value={credential.cpassword} onChange={handleOnChange} />
                </div>
                <button disabled={credential.email.length <= 5 || credential.password.length <= 5} type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup