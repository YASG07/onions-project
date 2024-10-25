import React, { useState } from 'react';
import { Box, Text, Icon } from '@chakra-ui/react';
// import { FiUploadCloud } from 'react-icons/fi';

const SubirImagen = ({ onFileDrop }) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (onFileDrop && files.length) {
            onFileDrop(files);
        }
    };

    return (
        <Box
            border="2px dashed"
            borderColor={isDragOver ? 'blue.300' : 'gray.300'}
            borderRadius="md"
            p={10}
            textAlign="center"
            cursor="pointer"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            background={isDragOver ? 'blue.50' : 'transparent'}
        >
            <Icon boxSize={12} color={isDragOver ? 'blue.400' : 'gray.400'} />
            <Text mt={4} fontSize="lg" color={isDragOver ? 'blue.400' : 'gray.500'}>
                Arrastra y suelta archivos aquí, o haz clic para seleccionar
            </Text>
        </Box>
    );
};

export default SubirImagen;
