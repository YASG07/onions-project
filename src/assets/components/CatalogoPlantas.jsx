import { Tabs, TabPanels, TabPanel, SimpleGrid, Button, Flex } from '@chakra-ui/react';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js';
import { auth } from '../../../client';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { useState, useEffect } from 'react';
import PlantCard from '../components/PlantCard';
import '../components/Styles/homePage.css';

const CatalogoPlantas = ({ buked, favorite }) => {
    const [plants, setPlants] = useState([]);
    const [page, setPage] = useState(1); // Estado para la página actual
    const PLANTS_PER_PAGE = 15; // Número de elementos por página

    useEffect(() => {
        const db = getDatabase();

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const plantasRef = ref(db, buked);
                await onValue(plantasRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const plantArray = Object.entries(data).map(([id, plant]) => ({
                            id,
                            ...plant
                        }));
                        console.log(plantArray)
                        setPlants(plantArray);
                    } else {
                        setPlants([]);
                    }
                });
            } else {
                console.error('No user is authenticated');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handlePreviousPage = () => {
        if (page > 1) setPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    // Calcular el rango de elementos para la página actual
    const startIndex = (page - 1) * PLANTS_PER_PAGE;
    const endIndex = startIndex + PLANTS_PER_PAGE;
    const plantsToShow = plants.slice(startIndex, endIndex);

    return (
        <Tabs>
            <TabPanels>
                <TabPanel>
                    <Flex justifyContent="space-between" mt={1} padding="20px">
                        <Button
                            onClick={handlePreviousPage}
                            isDisabled={page === 1} // Desactiva el botón si es la primera página
                        >
                            Anterior
                        </Button>
                        <Button
                            onClick={handleNextPage}
                            isDisabled={endIndex >= plants.length} // Desactiva si no hay más plantas
                        >
                            Siguiente
                        </Button>
                    </Flex>
                    <SimpleGrid minChildWidth="300px" spacing="20px" width="100%">
                        {plantsToShow.length > 0 ? (
                            plantsToShow.map((plant) => (
                                <PlantCard
                                    key={plant.id}
                                    common_name={plant.common_name || 'Nombre Desconocido'}
                                    default_image={plant.default_image?.medium_url || plant.default_image?.original_url || plant.default_image ||'https://png.pngtree.com/png-clipart/20230916/original/pngtree-sticker-with-a-cute-little-yellow-plant-in-a-pot-vector-png-image_12228899.png'}
                                    scientific_name={plant.scientific_name}
                                    other_name={plant.other_name}
                                    cycle={plant.cycle}
                                    watering={plant.watering}
                                    sunlight={plant.sunlight}
                                    favorite={favorite}
                                />
                            ))
                        ) : (
                            <p>Cargando...</p>
                        )}
                    </SimpleGrid>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default CatalogoPlantas;
