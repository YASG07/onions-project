import { Box, Image, Heading, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure } from '@chakra-ui/react';
import React from 'react';

const PlantCard = ({ title, image, description }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box maxW="300px" maxH="360px" borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={onOpen} cursor="pointer">
                <Image src={image} alt={title} boxSize="300px" objectFit="cover" />
                <Box p="6">
                    <Heading size="md" mb="2">{title}</Heading>
                </Box>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image src={image} alt={title} />
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
