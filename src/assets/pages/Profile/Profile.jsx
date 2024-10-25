import { ChakraProvider, Box, Heading, Avatar, Text, Stack, Button, HStack, VStack, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Profile = ({ user }) => {
    let navigate = useNavigate();

    function handleLogout(){
        navigate('/')
    }

    function handleBack(){
        navigate('/homepage')
    }

    return (
        <ChakraProvider>
            <Box maxW="800px" mx="auto" p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
                {/* Información del Usuario */}
                <VStack spacing={6}>
                    {/* Avatar y Nombre */}
                    <Avatar size="2xl" name={user.name} src={user.avatarUrl} />
                    <Heading as="h2" size="lg">{user.name}</Heading>

                    {/* Información Básica */}
                    <Text fontSize="lg" color="gray.600">{user.email}</Text>
                    <Text fontSize="md" textAlign="center">{user.bio}</Text>
                </VStack>

                <Divider my={6} />

                {/* Detalles Adicionales */}
                <Stack direction={{ base: 'column', md: 'row' }} spacing={8} alignItems="center">
                    <Box textAlign="center">
                        <Text fontWeight="bold">Número de Plantas</Text>
                        <Text fontSize="lg" color="gray.600">{user.plantCount}</Text>
                    </Box>

                    <Box textAlign="center">
                        <Text fontWeight="bold">Miembro Desde</Text>
                        <Text fontSize="lg" color="gray.600">{user.joinDate}</Text>
                    </Box>

                    <Box textAlign="center">
                        <Text fontWeight="bold">Ubicación</Text>
                        <Text fontSize="lg" color="gray.600">{user.location}</Text>
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

