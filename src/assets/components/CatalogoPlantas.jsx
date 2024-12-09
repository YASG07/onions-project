import { Tabs, TabPanels, TabPanel, SimpleGrid, Button, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import PlantCard from '../components/PlantCard';
import '../components/Styles/homePage.css';

const CatalogoPlantas = () => {
    const [plants, setPlants] = useState([]);
    const [page, setPage] = useState(1); // Estado para la página actual
    const PLANTAS_API = import.meta.env.VITE_PLANTAS_API_KEY;

    // Actualizar la vista del catalogo
    useEffect(() => { handlePlantList(); }, [page]);

    const handlePlantList = async () => {
        try {
            const res = await fetch(`https://perenual.com/api/species-list?key=${PLANTAS_API}&page=${page}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

            const plantList = await res.json();
            setPlants(plantList.data || []); // Ajusta según la estructura de datos de la API
        } catch (error) {
            alert(`Error fetching plants: ${error.message}`);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage((prevPage) => prevPage - 1); // Evita páginas menores a 1
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

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
                        <Button onClick={handleNextPage}>
                            Siguiente
                        </Button>
                    </Flex>
                    <SimpleGrid minChildWidth="300px" spacing="20px" width="100%">
                        {plants.length > 0 ? (
                            plants.map((plant) => (
                                <PlantCard
                                        key={plant.id}
                                        title={plant.common_name || 'Nombre Desconocido'}
                                        image={plant.default_image?.medium_url || 'https://png.pngtree.com/png-clipart/20230916/original/pngtree-sticker-with-a-cute-little-yellow-plant-in-a-pot-vector-png-image_12228899.png'}
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
