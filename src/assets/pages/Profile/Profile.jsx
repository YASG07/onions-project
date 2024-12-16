import {
    ChakraProvider, Box, Heading, Avatar,
    Text, Stack, Button, HStack, VStack, Divider,
    Modal, useDisclosure, ModalOverlay,
    ModalContent, ModalCloseButton
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js';
import { auth } from '../../../../client';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import FormularioActualizarDatosUsuario from '../../components/FormularioActualizarDatosUsuario';
import '../../components/Styles/Profile.css'


const Profile = ({ user }) => {
    let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    //faltan por hacer
    const [bio, setBio] = useState('');
    const [countPlants, setCount] = useState('');
    const [member, setMember] = useState('');
    const [ubicacion, setUbi] = useState('');

    async function handleLogout() {
        await signOut(auth)
        navigate('/login')
    }

    function handleBack() {
        navigate('/')
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
                        const bio = (snapshot.val() && snapshot.val().description) || 'No hay una descripcion';
                        setBio(bio);
                        const ubicacion = (snapshot.val() && snapshot.val().ubication)
                            || 'No hay una ubicación';
                        setUbi(ubicacion);
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
            <Box className='perfil'>
                {/* Información del Usuario */}
                <VStack>
                    {/* Avatar y Nombre */}
                    <Avatar size="2xl" name={username} src={user.avatarUrl} />
                    <Heading className='Nombre'>{username}</Heading>

                    {/* Información Básica */}
                    <Text className='correo'>{email}</Text>
                    <Text className='descripcion'>{bio}</Text>
                </VStack>
                <Divider my={6} />
                {/* Detalles Adicionales */}
                <Stack direction={{ base: 'column', md: 'row' }} spacing={8} alignItems="center">
                    <Box textAlign="center">
                        <Text className='til'>Número de Plantas</Text>
                        <Text className='nose'>{countPlants}</Text>
                    </Box>

                    <Box textAlign="center">
                        <Text className='til'>Miembro Desde</Text>
                        <Text className='nose'>{member}</Text>
                    </Box>
                    <Box textAlign="center">
                        <Text className='til'>Ubicación</Text>
                        <Text className='nose'>{ubicacion}</Text>
                    </Box>
                </Stack>

                <Divider my={6} />

                {/* Botones de Acción */}
                <HStack justifyContent="center" spacing={6}>
                    <Button colorScheme="blue" onClick={onOpen}>Editar Perfil</Button>
                    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <FormularioActualizarDatosUsuario />
                            <ModalCloseButton />
                        </ModalContent>
                    </Modal>
                    <Button colorScheme="red" onClick={handleLogout}>Cerrar Sesión</Button>
                    <Button colorScheme='green' onClick={handleBack}>Volver</Button>
                </HStack>
            </Box>
        </ChakraProvider>
    );
};

export default Profile;

