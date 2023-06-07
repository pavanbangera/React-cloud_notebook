import React, { useContext } from 'react'
import AlertContext from '../context/alert/AlertContext';

export default function Alert () {
    const context = useContext(AlertContext)
    const { alert } = context
    const capitalise = (word) => {
        if (word === "danger") {
            word = "error"
        }
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.substr(1)
    }
    return (
        <div style={{ height: "50px" }}>
            {alert && <div className={`alert alert-${alert.type}`} role="alert">
                <strong>{capitalise(alert.type)}</strong> {alert.msg}.
            </div>}</div>
    )
}
