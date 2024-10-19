import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import '../../components/Styles/SignUpPage.css'

const SignUp = () => {
    return (
        <div className="signup-container">
            <div className="signup-content">
                <h2>Regístrate</h2>
                <form>
                    <input
                        type="text"
                        placeholder="Nombre completo"
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                    />
                    <button type="submit">Enviar</button>
                </form>
                <p>¿Ya tienes una cuenta? <Link to="/">Ingresar</Link></p>
            </div>
        </div>
    );
}

export default SignUp