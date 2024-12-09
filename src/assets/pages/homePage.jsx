import { Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Flex, Button, Text, VStack } from '@chakra-ui/react';
import { ChakraProvider, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from 'react'
import PlantCard from '../components/PlantCard';
import InfoAvatar from '../components/InfoAvatar';
import AcercaDe from '../components/AcercaDe';
import FavoritosLogin from '../components/favoritosLogin';
import '../components/Styles/homePage.css'

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
                fontWeight='bold'
            >
                <GridItem className="header" bg="#1a1a1a" color="#d4d4d4" area={'header'}>
                    <Flex justify="space-between" align="center" px={4} height="100%">
                        <Tabs onChange={(index) => setTabIndex(index)} variant="enclosed" >
                            <TabList>
                                <Tab className="tab tab-active" fontSize={18}>Mis Plantas</Tab>
                                <Tab className="tab" fontSize={18}>PlantIA</Tab>
                                <Tab className="tab" fontSize={18}>Acerca de</Tab>
                            </TabList>
                        </Tabs>
                        <InfoAvatar name="Planta" src="https://bit.ly/broken-link"/>
                    </Flex>
                </GridItem>

                <GridItem className='fondo' area={'main'} p={4}>
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
                                <FavoritosLogin/>
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
