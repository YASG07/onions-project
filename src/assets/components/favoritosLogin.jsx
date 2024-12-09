import { Button, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom'

const FavoritosLogin = () => {
    let navigate = useNavigate()

    function handleLogin() {
        navigate('/login')
    }

    return (
        <>
            <VStack gap="10" margin="100">
                <Text color="white" fontSize="x-large">
                    Debes iniciar sesión para ingresar a esta sección.
                </Text>
                <Button variant="solid" colorScheme='blue' size="lg" onClick={handleLogin}>
                    Iniciar Sesión
                </Button>
            </VStack>
        </>
    )
}

export default FavoritosLogin