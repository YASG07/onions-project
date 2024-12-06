import '../../components/Styles/LoginPage.css'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { auth } from '../../../../client';

const Login = () => {

    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '', password: ''
    })
    console.log(formData)
    function handleChange(event) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password,
            )
            const user = userCredential.user;
            console.log('User signed in:', user);
            navigate('/homepage')
        } catch (error) {
            console.error('Error signing in:', error);
            alert(error.message);
        }
    }



    return (
        <div className="login-container">
            <h1>PlantIA</h1>
            <div className="login-content">
                <h2>Inicia sesión</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Ingresar</button>
                </form>
                <p className='register'>¿No tienes cuenta? <Link to="/signup">Regístrate</Link></p>
            </div>
        </div>
    );

}

export default Login;