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
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import Playground from '../components/Playground';
import { DOCS_URL, GITHUB_ICON, GITHUB_URL } from '../constants';
import { CONFIGKITS_LOGO_ICON } from '../assets';

function PlaygroundPage() {
  const bgNav = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const MobileMenu = () => (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent bg={bgNav}>
        <DrawerCloseButton />
        <DrawerBody pt={8}>
          <VStack spacing={6} align="start" width="full">
            <Link to="/" style={{ width: '100%', textDecoration: 'none' }}>
              <Button width="full" colorScheme="brand" variant="outline">
                Home
              </Button>
            </Link>
            <Button
              as="a"
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="brand"
              width="full"
              onClick={onClose}
            >
              Documentation
            </Button>
            <Button
              as="a"
              href={GITHUB_URL}
              leftIcon={<Image src={GITHUB_ICON} w={5} h={5} alt="GitHub" />}
              colorScheme="brand"
              width="full"
              onClick={onClose}
            >
              GitHub
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Navigation */}
      <Box
        as="nav"
        bg={bgNav}
        borderBottom="1px solid"
        borderColor={borderColor}
        py={{ base: 3, md: 4 }}
        position="sticky"
        top={0}
        zIndex={100}
        boxShadow="sm"
      >
        <Container maxW="1400px" px={{ base: 4, md: 6 }}>
          <Flex justify="space-between" align="center">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <Image src={CONFIGKITS_LOGO_ICON} w={{ base: 8, md: 10 }} h={{ base: 8, md: 10 }} alt="ConfigKits Logo" />
              <Heading size={{ base: 'md', md: 'lg' }} color="gray.800">
                ConfigKits
              </Heading>
            </Link>

            {isMobile ? (
             <>
                <Button
                  onClick={onOpen}
                  variant="ghost"
                  fontSize="1.5rem"
                >
                  ☰
                </Button>
                <MobileMenu />
              </>
            ) : (
              <HStack spacing={6}>
                <Link to="/" style={{ textDecoration: 'none', color: '#2d2d2d' }}>
                  Home
                </Link>
                <Button
                  as="a"
                  href={DOCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  colorScheme="brand"
                  size="sm"
                >
                  Documentation
                </Button>
                <Button
                  as="a"
                  href={GITHUB_URL}
                  colorScheme="brand"
                  size="sm"
                  leftIcon={<Image src={GITHUB_ICON} w={5} h={5} alt="GitHub" />}
                >
                  GitHub
                </Button>
              </HStack>
            )}
          </Flex>
        </Container>
      </Box>

      {/* Header */}
      <Box
        bgGradient="linear(to-r, brand.500, brand.600)"
        color="white"
        py={{ base: 8, sm: 12, md: 16 }}
        textAlign="center"
        px={{ base: 4, md: 6 }}
      >
        <Container maxW="1200px">
          <VStack spacing={{ base: 3, md: 4 }}>
            <Heading size={{ base: 'lg', sm: 'xl', md: '2xl' }} color="white">
              ConfigKits Playground
            </Heading>
            <Text
              fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
              opacity={0.95}
              maxW="800px"
            >
              Edit the configuration JSON on the left to see live changes in the
              preview. Experiment with different configurations and see how
              ConfigKits renders them in real-time.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Playground Component - Responsive Container */}
      <Box
        px={{ base: 4, sm: 6, md: 8 }}
        py={{ base: 6, md: 8 }}
        maxW="1400px"
        mx="auto"
        width="100%"
      >
        <Box
          bg={bgNav}
          borderRadius={{ base: 'md', md: 'lg' }}
          boxShadow="sm"
          overflow="hidden"
          minH="calc(100vh - 300px)"
        >
          <Playground />
        </Box>
      </Box>

      {/* Footer */}
      <Box
        as="footer"
        bg={useColorModeValue('gray.100', 'gray.800')}
        color={useColorModeValue('gray.800', 'white')}
        py={{ base: 8, md: 10 }}
        px={{ base: 4, md: 6 }}
        mt={{ base: 8, md: 12 }}
      >
        <Container maxW="1200px">
          <VStack spacing={{ base: 4, md: 6 }} textAlign="center">
            <Text fontSize={{ base: 'xs', sm: 'sm' }} opacity={0.7}>
              © 2025 ConfigKits. Build dynamic UIs with configuration.
            </Text>
            <HStack spacing={{ base: 3, md: 6 }} justify="center" flexWrap="wrap">
              <Button
                as="a"
                href={GITHUB_URL}
                variant="ghost"
                size="sm"
              >
                GitHub
              </Button>
              <Button as={Link} to="/" variant="ghost" size="sm">
                Home
              </Button>
              <Button
                as="a"
                href={DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="sm"
              >
                Docs
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}

export default PlaygroundPage;
