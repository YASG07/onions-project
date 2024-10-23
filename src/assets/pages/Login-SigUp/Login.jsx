import '../../components/Styles/LoginPage.css'
import {Link, useNavigate} from 'react-router-dom'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { auth  } from '../../../../client';


const Login = () =>{
    
    let navigate = useNavigate()
    const [formData,setFormData] = useState ({
        email:'', password:''
    })
    console.log(formData)
    function handleChange(event){
        setFormData((prevFormData)=>{
            return{
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    }
    
    async function handleSubmit(event){
        event.preventDefault()
        
        try {
            const { data, error} = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password,
            )
            if (error) throw error
            console.log(data)
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
                <p>¿No tienes cuenta? <Link to="/signup">Regístrate</Link></p>
            </div>
        </div>
    );

}

export default Login;