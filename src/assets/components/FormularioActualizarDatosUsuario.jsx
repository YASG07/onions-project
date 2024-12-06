import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Textarea,
    Avatar,
    Text,
    Grid, GridItem
} from '@chakra-ui/react';

import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js';
// import { auth } from '../../../../client';
// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";


function updateData(uid,username,picture,description,ubication){
    const db = getDatabase();

    const data = {
        displayName: username,
        uid: uid,
        photoURL: picture,
        description: description,
        ubication: ubication
    }

}

const FormularioActualizarDatosUsuario = ({ user }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    //faltan por recuperar
    const [ubicacion, setUbi] = useState('');

    return (
        <Flex width="full" align="center" justifyContent="center">
            <Box p={2}>
                <Box textAlign="center">
                    <Heading>Actualizar Datos</Heading>
                </Box>
                <Box my={4} textAlign="left">
                    <form>
                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input type='text' />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Descripción</FormLabel>
                            <Textarea type="Text" placeholder="Añade una descripción" />
                        </FormControl>
                        <FormControl mt={6}>
                            <FormLabel>Ubicación</FormLabel>
                            <Input type="Text" placeholder="Añade tu ubicación" />
                        </FormControl>
                        <FormControl mt={6}>
                            <Grid templateColumns="repeat(2,0.50fr)">
                                <GridItem colSpan>
                                    <Text>Cambiar foto de perfil</Text>
                                </GridItem>
                                <GridItem colSpan={1}>
                                    <Avatar
                                        src="https://bit.ly/dan-abramov"
                                        shape="square"
                                        size="xl"
                                    />
                                </GridItem>

                            </Grid>
                        </FormControl>
                        <Button width="full" mt={4} type="submit">
                            Actualizar
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
}

export default FormularioActualizarDatosUsuario;  // Exportamos el componente