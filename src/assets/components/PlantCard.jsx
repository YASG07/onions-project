import {
    Box, Image, Heading, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, VStack, List, ListItem, Badge
} from '@chakra-ui/react';
import { FaSun, FaCloudSun, FaCloud, FaHeart, FaRegHeart } from "react-icons/fa";
import { FaSunPlantWilt } from "react-icons/fa6";
import React, { useState } from 'react';
import { getDatabase, ref, onValue, set } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { auth } from '../../../client';
import '../components/Styles/homePage.css';

const PlantCard = ({
    common_name,
    default_image,
    scientific_name = [],
    other_name = [],
    cycle = "Desconocido",
    watering = "Desconocido",
    sunlight = [],
    favorite = false
}) => {
    const sunlightIcons = {
        "full sun": <FaSun color="yellow" />,
        "Full sun": <FaSun color="yellow" />,
        "Part shade": <FaCloudSun color="orange" />,
        "part shade": <FaCloudSun color="orange" />,
        "filtered shade": <FaCloud color='blue' />,
        "part sun/part shade": (
            <Box display="flex" alignItems="center" gap="5px">
                <FaSun color="yellow" />
                <FaCloudSun color="orange" />
            </Box>
        ),
        "full sun only if soil kept moist": <FaSunPlantWilt color='purple' />
    };

    const sunlightTranslated = {
       "full sun": "Pleno sol",
        "Full sun": "Pleno sol",
        "Part shade": "Sombra parcial",
        "part shade": "Sombra parcial",
        "filtered shade": "Sombra filtrada",
        "part sun/part shade": "Sol parcial/Sombra parcial",
        "full sun only if soil kept moist": "A pleno sol sólo si el suelo se mantiene húmedo." 
    }

    const wateringTranslated = {
        "Average": "Promedio",
        "Frequent": "Frecuentemente",
        "Minimum": "Mínimo"
    }

    const favoritePlant = {
        common_name,
        default_image,
        scientific_name,
        other_name,
        cycle,
        watering,
        sunlight
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isFavorite, setIsFavorite] = useState(favorite);

    const handleFavoriteClick = () => {
        const db = getDatabase();
        onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                alert('Debes iniciar sesión para agregar una planta a tus favoritos.');
                return;
            }
    
            const userId = currentUser.uid;
            const userFavoritesRef = ref(db, `users/${userId}/favorites`);
    
            if (isFavorite) {
                // Eliminar planta de favoritos
                onValue(userFavoritesRef, (snapshot) => {
                    const favorites = snapshot.val() || [];
                    const updatedFavorites = favorites.filter(
                        (plant) => plant.common_name !== favoritePlant.common_name
                    );
                    set(userFavoritesRef, updatedFavorites);
                });
            } else {
                // Agregar planta a favoritos
                onValue(userFavoritesRef, (snapshot) => {
                    const favorites = snapshot.val() || [];
                    const isPlantInFavorites = favorites.some(
                        (plant) => plant.common_name === favoritePlant.common_name
                    );
    
                    if (!isPlantInFavorites) {
                        set(userFavoritesRef, [...favorites, favoritePlant]); 
                    } else {
                        alert('Esta planta ya está en tus favoritos.');
                    }
                });
            }
    
            setIsFavorite((prev) => !prev);
        });
    };
    
    return (
        <>
            <Box className="plant-card" onClick={onOpen}>
                <Image className="plant-card" src={default_image} alt={common_name} />
                <Box
                    position="absolute"
                    top="10px"
                    right="10px"
                    cursor="pointer"
                    zIndex="1"
                >
                    {isFavorite ? (
                        <FaHeart color='red' size='30px' />
                    ) : (
                        <FaRegHeart></FaRegHeart>
                    )}
                </Box>
                <Box className="plant-info">
                    <Heading size="md" mb="2">{common_name}</Heading>
                </Box>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{common_name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4} align="start">
                            <Image src={default_image} alt={common_name} borderRadius="md" />

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
                                <Text>{cycle == 'Perennial' ? 'Más de 10 años' : 'AAAA'}</Text>
                            </Box>

                            <Box>
                                <Text fontWeight="bold">Riego:</Text>
                                <Text>{wateringTranslated[watering] || watering}</Text>
                            </Box>

                            <Box>
                                <Text fontWeight="bold">Requerimientos de luz:</Text>
                                {sunlight.length > 0 ? (
                                    <List spacing={1}>
                                        {sunlight.map((condition, index) => (
                                            <ListItem key={index} display="flex" alignItems="center">
                                                {sunlightIcons[condition]}
                                                <Badge ml={2}>{sunlightTranslated[condition]}</Badge>
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
                            left="10px"
                            right="100px"
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
