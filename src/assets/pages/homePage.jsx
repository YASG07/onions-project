import { Tabs, TabList, TabPanels, Tab, TabPanel, SimpleGrid, Flex, Avatar } from '@chakra-ui/react';
import { ChakraProvider, Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from 'react'
import PlantCard from '../components/PlantCard';

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
                            </TabList>

                        </Tabs>
                        <Avatar name="User Name" src="https://bit.ly/broken-link" />
                    </Flex>
                </GridItem>

                <GridItem area={'main'} p={4}>
                    <Tabs>
                        <TabPanels>
                            {tabIndex === 0 && <TabPanel>
                                <SimpleGrid columns={[1, null, 3]} spacing="20px">
                                    <PlantCard title="Planta 1" image="https://via.placeholder.com/150"/>
                                    <PlantCard title="Planta 2" image="https://via.placeholder.com/150"/>
                                    <PlantCard title="Planta 3" image="https://via.placeholder.com/150"/>
                                </SimpleGrid>
                            </TabPanel>}
                            {tabIndex === 1 && <TabPanel><Box>Aqui va la wea de lens </Box></TabPanel>}
                        </TabPanels>
                    </Tabs>
                </GridItem>

            </Grid>
        </ChakraProvider>
    );
};

export default HomePage;
