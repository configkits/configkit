import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import Playground from '../components/Playground';
import { ConfigKitsLogo } from './Home';
import { DOCS_URL, GITHUB_ICON, GITHUB_URL } from '../constants';

function PlaygroundPage() {
  const bgNav = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');


  return (
    <Box minH="100vh" bg="gray.50">
      {/* Navigation */}
      <Box
        as="nav"
        bg={bgNav}
        borderBottom="1px solid"
        borderColor={borderColor}
        py={4}
        position="sticky"
        top={0}
        zIndex={100}
        boxShadow="sm"
      >
        <Container maxW="1400px">
          <Flex justify="space-between" align="center">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <ConfigKitsLogo size={10} />
              <Heading size="lg" color="gray.800">ConfigKits</Heading>
            </Link>
            <HStack spacing={6}>
              <Link to="/" style={{ color: '#2d2d2d', textDecoration: 'none' }}>Home</Link>
              <Button as="a" href={DOCS_URL} target="_blank" rel="noopener noreferrer" colorScheme="brand" size="sm">Documentation</Button>
              <Button as="a" href={GITHUB_URL} colorScheme="brand" size="sm" leftIcon={<Image src={GITHUB_ICON} width={5} height={5} alt="GitHub" />}>GitHub</Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Header */}
      <Box bgGradient="linear(to-r, brand.500, brand.600)" color="white" py={12} textAlign="center">
        <Container maxW="1200px">
          <VStack spacing={4}>
            <Heading size="xl" color="white">ConfigKits Playground </Heading>
            <Text fontSize="lg" opacity={0.95} maxW="800px">
              Edit the configuration JSON on the left to see live changes in the preview. Experiment with different configurations and see how ConfigKits renders them in real-time.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Playground Component */}
      <Box p={8} maxW="1400px" mx="auto">
        <Playground />
      </Box>
    </Box>
  );
}

export default PlaygroundPage;
