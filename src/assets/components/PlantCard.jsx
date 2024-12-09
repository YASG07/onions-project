import { Box, Image, Heading, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import '../components/Styles/homePage.css'

const PlantCard = ({ title, image, description }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box className="plant-card" onClick={onOpen} >
                <Image className="plant-card"  src={image} alt={title} />
                <Box className="plant-info">
                    <Heading size="md" mb="2">{title}</Heading>
                </Box>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image src={image} alt={title}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PlantCard;
