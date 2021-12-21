import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Text,
    Stack,
    HStack,
    VStack,
} from '@chakra-ui/react';

import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';


export default function GridListWithHeading() {


    const [tasks, setTasks] = useState([])
    useEffect(() => {
        async function loadTasks() {
            const response = await axios.get('api/tasks/');
            setTasks(response.data)
        }
        loadTasks()
    }, [])

    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Minhas Tarefas</Heading>
                <Text color={'gray.600'} fontSize={'xl'}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                    sed diam voluptua.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
                    {tasks.map((task) => (
                        <HStack key={task.id}
                            align={'top'}
                            border='1px solid #aeaeae'
                            px={3}
                            py={4}
                            boxShadow='lg'
                            borderRadius={8}
                            _hover={{ transform: 'scale(1.1)' }}
                        >
                            <Box color={'green.400'} px={2}>
                                {task.done ? <FaCheck /> : <FaTimes style={{ color: "red" }} />}
                            </Box>
                            <VStack align={'start'}>
                                <Text fontWeight={600}>{task.title}</Text>
                                <Text color={'gray.600'}>{task.description}</Text>
                            </VStack>
                        </HStack>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}