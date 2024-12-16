import { Avatar, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalCloseButton, Button, useDisclosure, GenericAvatarIcon, Flex } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom'
import { signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { auth } from '../../../client';

const InfoAvatar = ({ name, src }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    let navigate = useNavigate()

    function handleProfile() {
        if(auth.currentUser){
            navigate('/profile') 
        }
        else {
            alert("Inicia sesión para consultar este apartado.")
        }
    }

    async function handleLogout(){
        await signOut(auth)
        navigate('/login')
    }
    return (
        <>
            <Avatar name={name} src={src} onClick={onOpen} cursor='pointer'/>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{name}</ModalHeader>
                    <Flex justifyContent="center" mt={4}>
                        <GenericAvatarIcon color="black" boxSize={100} />
                    </Flex>
                    <Button mr={4} onClick={handleProfile}>Mi perfil</Button>
                    <Button onClick={handleLogout}>Cerrar Sesión</Button>

                    <ModalCloseButton />

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default InfoAvatar;
