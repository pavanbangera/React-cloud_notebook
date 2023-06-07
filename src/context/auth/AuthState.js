import React, { useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from 'react-router-dom';
import AlertContext from "../alert/AlertContext";

const AuthState = (props) => {
    const navigate = useNavigate();
    const alertContext = useContext(AlertContext)
    const { showAlert } = alertContext;

    const Login = async (email, password) => {
        const response = await fetch(`${process.env.REACT_APP_PORT}/api/auth/loginUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const json = await response.json()
        if (json.success) {
            localStorage.setItem('auth-token', json.authToken)
            localStorage.setItem('userInfo', email)
            navigate('/');
            // console.log(localStorage.getItem('auth-token'))
            showAlert("Logged in Successfuly", "success")
        }
        else {
            showAlert(json.error, "danger")
        }
    }
    const Signup = async (name, email, password) => {
        const response = await fetch(`${process.env.REACT_APP_PORT}/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('auth-token', json.authToken)
            localStorage.setItem('userInfo', email)
            navigate('/');
            showAlert("SignUp Successfuly", "success")
        }
        else {
            showAlert(json.error, "danger")
        }
    }
    return (
        <AuthContext.Provider value={{ Login, Signup }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState