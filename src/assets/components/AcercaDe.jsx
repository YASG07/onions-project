import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import React from 'react';

const AcercaDe = () => {
    return (
        <Box p={8} maxW="900px" mx="auto">
            <Heading as="h1" size="xl" mb={6}>
                Acerca del Proyecto
            </Heading>

            <Stack spacing={6}>
                <Text fontSize="lg">
                    Este proyecto busca facilitar el cuidado de las plantas mediante una plataforma web que utiliza algoritmos de inteligencia artificial (IA) para reconocer especies de plantas y proporcionar recomendaciones personalizadas de cuidado. Con el auge del cuidado de plantas en entornos urbanos y rurales, esta solución apunta a mejorar la experiencia de los usuarios y promover la conservación de la flora.
                </Text>


                <Text fontSize="lg">
                    <strong>Objetivo General:</strong> Desarrollar una plataforma que identifique plantas mediante algoritmos de IA y ofrezca recomendaciones específicas sobre su cuidado, contribuyendo al conocimiento y conservación de la biodiversidad vegetal.
                </Text>


                <Text fontSize="lg">
                    <strong>Impacto:</strong> Este proyecto tiene un impacto positivo en el ámbito educativo y medioambiental. Al promover el cuidado adecuado de las plantas, fomenta la conservación de especies y la responsabilidad ecológica, contribuyendo al desarrollo de una cultura de respeto por el medio ambiente.
                </Text>
            </Stack>
        </Box>
    );
};

export default AcercaDe;
