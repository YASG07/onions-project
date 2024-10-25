import { Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Flex } from '@chakra-ui/react';
import { ChakraProvider, Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from 'react'
import PlantCard from '../components/PlantCard';
import SubirImagen from '../components/SubirImagen';
import InfoAvatar from '../components/InfoAvatar';
import AcercaDe from '../components/AcercaDe';

const HomePage = () => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <ChakraProvider>
            <Grid
                templateAreas={`"header header" "nav main" "nav footer"`}
                gridTemplateRows={'50px 36.5em 30px'}
                gridTemplateColumns={'1px'}
                h='200px'
                gap='1'
                color='blackAlpha.700'
                fontWeight='bold'
            >
                <GridItem pl='2' bg='orange.300' area={'header'}>
                    <Flex justify="space-between" align="center" px={4} height="100%">
                        <Tabs onChange={(index) => setTabIndex(index)} variant="enclosed" >
                            <TabList>
                                <Tab>Mis Plantas</Tab>
                                <Tab>PlantIA</Tab>
                                <Tab>Acerca de</Tab>
                            </TabList>
                        </Tabs>
                        <InfoAvatar name="Planta" src="https://bit.ly/broken-link"/>
                    </Flex>
                </GridItem>

                <GridItem area={'main'} p={4}>
                    <Tabs>
                        <TabPanels>
                            {tabIndex === 0 && <TabPanel>
                                <SimpleGrid minChildWidth="300px" spacing="20px" width="100%">
                                    <PlantCard title="Planta 1" image="https://via.placeholder.com/150"/>
                                    <PlantCard title="Planta 2" image="https://via.placeholder.com/150"/>
                                    <PlantCard title="Planta 3" image="https://via.placeholder.com/150"/>   
                                </SimpleGrid>
                            </TabPanel>}
                            {tabIndex === 1 && <TabPanel>
                                <SubirImagen/>
                            </TabPanel>}
                            {tabIndex === 2 && <TabPanel>
                                <AcercaDe/> 
                            </TabPanel>}
                        </TabPanels>
                    </Tabs>
                </GridItem>
            </Grid>
        </ChakraProvider>
    );
};

export default HomePage;
