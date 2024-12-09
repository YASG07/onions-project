import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import '../../components/Styles/SignUpPage.css';
import { createUserWithEmailAndPassword, updateProfile} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js';
import { auth } from '../../../../client';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";


const SignUp = () => {
    let navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: '', email: '', password: '',
        description: '', ubication: ''
    });

    function handleChange(event) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            //! Asegurarse de que todos los campos están definidos
            if (!formData.fullName || !formData.email || !formData.password) {
                throw new Error("Todos los campos son obligatorios");
            }

            //! Crear el usuario en Firebase Authentication 
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            //! Actualizar el perfil del usuario con el nombre completo 
            await updateProfile(user, { displayName: formData.fullName });

            //! Agregar documento a Database
            const db = getDatabase();
            const newUserRef = ref(db, 'users/' + user.uid);
            await set(newUserRef, {
                uid: user.uid,
                displayName: formData.fullName,
                email: formData.email,
                description: formData.description,
                ubication: formData.ubication
            });

            alert("Usuario registrado con éxito");
            console.log(db);

            //! Iniciar sesion despues de crear el usuario
            try {
                const { data, error } = await signInWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password,
                )
                if (error) throw error
                console.log(data)
                navigate('/')
            } catch (error) {
                alert(error)
            }

            
        } catch (error) {
            console.error("Error al registrar usuario: ", error);
            alert(error.message);
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-content">
                <h2>Regístrate</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre completo"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
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
                    <button type="submit">Enviar</button>
                </form>
                <p>¿Ya tienes una cuenta? <Link to="/login">Ingresar</Link></p>
            </div>
        </div>
    );
};

export default SignUp;
