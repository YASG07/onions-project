import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../components/Styles/SignUpPage.css';
import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';
import { auth, db } from '../../../../client';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '', email: '', password: ''
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
            // Asegurarse de que todos los campos están definidos
            if (!formData.fullName || !formData.email || !formData.password) {
                throw new Error("Todos los campos son obligatorios");
            }

            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Agregar documento a Firestore
            const usersCollectionRef = collection(db, 'users');
            await addDoc(usersCollectionRef, {
                uid: user.uid,
                name: formData.fullName,
                email: formData.email,
            });

            alert("Usuario registrado con éxito");
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
                <p>¿Ya tienes una cuenta? <Link to="/">Ingresar</Link></p>
            </div>
        </div>
    );
};

export default SignUp;
