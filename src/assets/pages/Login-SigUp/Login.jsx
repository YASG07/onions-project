import '../../components/Styles/LoginPage.css'
import {Link, useNavigate} from 'react-router-dom'
import React, { useState } from 'react'

const Login =  () => {
    let navigate = useNavigate()
    async function handleSubmit(event){
        event.preventDefault()
        
        try {
            navigate('/homepage')
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h2>Inicia sesión</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email"
                        placeholder="Correo electrónico"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                    />
                    <button type="submit">Ingresar</button>
                </form>
                <p>¿No tienes cuenta? <Link to="/signup">Regístrate</Link></p>
            </div>
        </div>
    );

}

export default Login;