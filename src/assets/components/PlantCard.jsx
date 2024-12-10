import {
    Box, Image, Heading, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, VStack, List, ListItem, Badge
} from '@chakra-ui/react';
import { FaSun, FaCloudSun, FaCloud, FaHeart, FaRegHeart } from "react-icons/fa";
import { FaSunPlantWilt } from "react-icons/fa6";
import React, { useState } from 'react';
import '../components/Styles/homePage.css';

const sunlightIcons = {
    "full sun": <FaSun color="yellow" />,
    "Full sun": <FaSun color="yellow" />,
    "Part shade": <FaCloudSun color="orange" />,
    "part shade": <FaCloudSun color="orange" />,
    "filtered shade": <FaCloud color='blue' />,
    "part sun\/part shade": (
        <Box display="flex" alignItems="center" gap="5px">
            <FaSun color="yellow" />
            <FaCloudSun color="orange" />
        </Box>
    ),
    "full sun only if soil kept moist": <FaSunPlantWilt color='purple' />
};

const PlantCard = ({
    title,
    image,
    scientific_name = [],
    other_name = [],
    cycle = "Desconocido",
    watering = "Desconocido",
    sunlight = []
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteClick = (plantFav) => {
        
        setIsFavorite((prev) => !prev); // Cambia el estado de favorito
    };

    return (
        <>
            <Box className="plant-card" onClick={onOpen}>
                <Image className="plant-card" src={image} alt={title} />
                <Box
                    position="absolute"
                    top="10px"
                    right="10px"
                    cursor="pointer"
                    zIndex="1"
                >
                    {isFavorite ? (
                        <FaHeart color='red' size='30px'/>
                    ) : (
                        <FaRegHeart></FaRegHeart>
                    )}
                </Box>
                <Box className="plant-info">
                    <Heading size="md" mb="2">{title}</Heading>
                </Box>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4} align="start">
                            <Image src={image} alt={title} borderRadius="md" />

                            <Box>
                                <Text fontWeight="bold">Nombre científico:</Text>
                                {scientific_name.length > 0 ? (
                                    <List spacing={1}>
                                        {scientific_name.map((name, index) => (
                                            <ListItem key={index}>
                                                <Text as="i">{name}</Text>
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Text>No hay nombre científico disponible.</Text>
                                )}
                            </Box>

                            {/* Other Names */}
                            <Box>
                                <Text fontWeight="bold">Otros nombres:</Text>
                                {other_name.length > 0 ? (
                                    <List spacing={1}>
                                        {other_name.map((name, index) => (
                                            <ListItem key={index}>
                                                <Badge colorScheme="green">{name}</Badge>
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Text>No hay otros nombres disponibles.</Text>
                                )}
                            </Box>

                            <Box>
                                <Text fontWeight="bold">Ciclo de vida:</Text>
                                <Text>{cycle}</Text>
                            </Box>

                            <Box>
                                <Text fontWeight="bold">Riego:</Text>
                                <Text>{watering}</Text>
                            </Box>

                            {/* Sunlight */}
                            <Box>
                                <Text fontWeight="bold">Requerimientos de luz:</Text>
                                {sunlight.length > 0 ? (
                                    <List spacing={1}>
                                        {sunlight.map((condition, index) => (
                                            <ListItem key={index} display="flex" alignItems="center">
                                                {sunlightIcons[condition]}
                                                <Badge ml={2}>{condition}</Badge>
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                    <Text>No hay infomación sobre los requerimientos de luz.</Text>
                                )}
                            </Box>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme={isFavorite ? 'red' : 'green'}
                            leftIcon={isFavorite ? <FaHeart /> : <FaRegHeart />}
                            onClick={handleFavoriteClick}
                        >
                            {isFavorite ? 'Favorito' : 'Agregar a favoritos'}
                        </Button>
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
