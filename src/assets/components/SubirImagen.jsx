import React, { useState, useRef } from 'react';
import { Box, Text, Button, Input, Image, VStack, HStack } from '@chakra-ui/react';

const SubirImagen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  // Manejar la selección de archivos
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Manejar el drag and drop
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleDeleteImage = () => {
    setSelectedImage(null); // Restablecer el estado de la imagen
  };

  return (
    <VStack spacing={4}>
        <Box
            className={`image-uploader ${dragActive ? "drag-active" : ""}`}
            background={dragActive ? 'blue.50' : 'transparent'}
            border="2px dashed"
            borderRadius="md"
            borderColor={dragActive ? 'blue.300' : 'gray.300'}
            p={10}
            textAlign="center"
            cursor="pointer"
            position='relative'
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            width='75%'
            _hover={{ borderColor: 'blue.300' }}
        >
          <Input
            type="file"
            accept=".jpg"
            onChange={handleFileChange}
            ref={inputRef} // Referencia para activarlo desde el botón
            style={{ display: 'none' }}
          />
          {selectedImage ? (
            <Image src={selectedImage} alt="Preview" maxH="200px" mx="auto" borderRadius="md" />
          ) : (
            <Text color="#d4d4d4">
                Arrastra y suelta una imagen aquí, o haz click en el botón para seleccionar una
            </Text>
          )}
        </Box>
        <HStack spacing={5}>
            <Button onClick={handleButtonClick} colorScheme="blue">
                Seleccionar Imagen
            </Button>
            <Button onClick={handleDeleteImage} colorScheme="red">
                Eliminar Imagen
            </Button>
        </HStack>
    </VStack>
  );
};

export default SubirImagen;

