import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth/AuthContext'


const Login = () => {
    const context = useContext(AuthContext)
    const { Login } = context
    const [credential, setCredentials] = useState({ email: "", password: "" })
    const handleOnChange = (e) => {
        setCredentials({ ...credential, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        Login(credential.email, credential.password)
    }
    return (
        <div className="container">
            <h1>Login here</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" autoComplete="email" value={credential.email} onChange={handleOnChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" autoComplete="current-password" value={credential.password} onChange={handleOnChange} />
                </div>
                <button disabled={credential.email.length <= 5 || credential.password.length <= 5} type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login