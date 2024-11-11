import { ChakraProvider, Box, Heading, Avatar, Text, Stack, Button, HStack, VStack, Divider, useRadio } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js';
import { auth } from '../../../../client';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";


const Profile = ({ user }) => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    //faltan por hacer
    const [bio, setBio] = useState('');
    const [countPlants, setCount] = useState('');
    const [member, setMember] = useState('');
    const [ubicacion, setUbi] = useState('');

    function handleLogout() {
        navigate('/')
    }

    function handleBack() {
        navigate('/homepage')
    }

    useEffect(() => {
        const db = getDatabase();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const userId = currentUser.uid;
                const userRef = ref(db, 'users/' + userId);
                onValue(userRef, (snapshot) => {
                    try {
                        const username = (snapshot.val() && snapshot.val().displayName) || 'Anonymous';
                        setUsername(username);
                        const email = (snapshot.val() && snapshot.val().email) || 'No email';
                        setEmail(email);
                    } catch (error) {
                        console.error("Error al obtener los datos:", error);
                    }
                },
                    {
                        onlyOnce: true
                    });
            } else {
                console.error('No user is authenticated');
            }
        });
        // Cleanup subscription on unmount 
        return () => unsubscribe();
    }, []);

    return (
        <ChakraProvider>
            <Box maxW="800px" mx="auto" p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
                {/* Información del Usuario */}
                <VStack spacing={6}>
                    {/* Avatar y Nombre */}
                    <Avatar size="2xl" name={username} src={user.avatarUrl} />
                    <Heading as="h2" size="lg">{username}</Heading>

                    {/* Información Básica */}
                    <Text fontSize="lg" color="gray.600">{email}</Text>
                    <Text fontSize="md" textAlign="center">{bio}</Text>
                </VStack>

                <Divider my={6} />

                {/* Detalles Adicionales */}
                <Stack direction={{ base: 'column', md: 'row' }} spacing={8} alignItems="center">
                    <Box textAlign="center">
                        <Text fontWeight="bold">Número de Plantas</Text>
                        <Text fontSize="lg" color="gray.600">{countPlants}</Text>
                    </Box>

                    <Box textAlign="center">
                        <Text fontWeight="bold">Miembro Desde</Text>
                        <Text fontSize="lg" color="gray.600">{member}</Text>
                    </Box>

                    <Box textAlign="center">
                        <Text fontWeight="bold">Ubicación</Text>
                        <Text fontSize="lg" color="gray.600">{ubicacion}</Text>
                    </Box>
                </Stack>

                <Divider my={6} />

                {/* Botones de Acción */}
                <HStack justifyContent="center" spacing={6}>
                    <Button colorScheme="blue">Editar Perfil</Button>
                    <Button colorScheme="red" onClick={handleLogout}>Cerrar Sesión</Button>
                    <Button colorScheme='green' onClick={handleBack}>Volver</Button>
                </HStack>
            </Box>
        </ChakraProvider>
    );
};

export default Profile;

