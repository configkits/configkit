import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Grid,
  VStack,
  HStack,
  Badge,
  Code,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link as ChakraLink,
  Image,
  Stack,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,

} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CONFIGKITS_LOGO_ICON, DOCS_URL, GITHUB_URL } from '../constants';
//import NavBar from 'src/components/navBar';

const MotionBox = motion(Box);

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgNav = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const codeBg = useColorModeValue('gray.800', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const isMobile = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { icon: '🔧', title: 'Schema Validation', desc: 'Robust validation using Zod schemas ensures your configurations are always correct and type-safe.' },
    { icon: '🧩', title: 'Component Registry', desc: 'Flexible component registration system that allows you to use any React component in your configurations.' },
    { icon: '🚩', title: 'Feature Flags', desc: 'Rollout control, A/B testing, and conditional rendering for dynamic feature management.' },
    { icon: '⚡', title: 'Lifecycle Hooks', desc: 'Extensible lifecycle management that lets you hook into key moments of the configuration lifecycle.' },
    { icon: '📦', title: 'Modular Architecture', desc: 'Independent, composable packages that work together seamlessly or stand alone.' },
    { icon: '🔒', title: 'TypeScript Support', desc: 'Full TypeScript support with type safety throughout the entire framework.' },
  ];

  const packages = [
    { name: '@configkits/core', badge: 'Core', desc: 'Core engine managing schema validation, configuration parsing, and lifecycle control.', features: ['Schema Validation', 'Config Parsing', 'Lifecycle Management'], install: 'npm install @configkits/core' },
    { name: '@configkits/react', badge: 'Renderer', desc: 'React renderer that transforms JSON-based configurations into live UI components.', features: ['React Components', 'Component Registry', 'Event Handling'], install: 'npm install @configkits/react', featured: true },
    { name: '@configkits/flags', badge: 'Features', desc: 'Feature flags, conditional rendering, A/B testing, and permission-based visibility.', features: ['Feature Flags', 'A/B Testing', 'Permissions'], install: 'npm install @configkits/flags' },
  ];

  const MobileMenu = () => (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
      <DrawerOverlay />
      <DrawerContent bg={bgNav}>
        <DrawerCloseButton />
        <DrawerBody pt={8}>
          <VStack spacing={6} align="start">
            <ChakraLink href="#features" onClick={onClose} fontSize="lg" fontWeight="500">
              Features
            </ChakraLink>
            <ChakraLink href="#packages" onClick={onClose} fontSize="lg" fontWeight="500">
              Packages
            </ChakraLink>
            <Button
              as="a"
              href={DOCS_URL}
              target="_blank"
              colorScheme="brand"
              width="full"
              onClick={onClose}
            >
              Documentation
            </Button>
            <Button
              as={Link}
              to="/playground"
              colorScheme="brand"
              width="full"
              onClick={onClose}
            >
              🚀 Try Playground
            </Button>
            <Button
              as="a"
              href={GITHUB_URL}
              variant="outline"
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
    <Box>
      {/* Navigation - Updated for mobile */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg={scrollY > 50 ? bgNav : "rgba(255, 255, 255, 0.95)"}
        backdropFilter="blur(10px)"
        borderBottom="1px solid"
        borderColor={borderColor}
        zIndex={1000}
        py={3}
        transition="all 0.3s"
      >
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <Flex justify="space-between" align="center">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <Image src={CONFIGKITS_LOGO_ICON} w={8} h={8} alt="ConfigKits Logo" />
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
                <ChakraLink href="#features" _hover={{ color: 'brand.500' }}>
                  Features
                </ChakraLink>
                <ChakraLink href="#packages" _hover={{ color: 'brand.500' }}>
                  Packages
                </ChakraLink>
                <Button
                  as="a"
                  href={DOCS_URL}
                  target="_blank"
                  colorScheme="brand"
                  size="sm"
                >
                  Documentation
                </Button>
                <Button
                  as={Link}
                  to="/playground"
                  colorScheme="brand"
                  size="sm"
                  bgGradient="linear(to-r, brand.500, brand.600)"
                >
                  🚀 Playground
                </Button>
              </HStack>
            )}
          </Flex>
        </Container>
      </Box>

      {/* Hero Section - Improved responsive */}
      <Box pt={{ base: 24, md: 32 }} pb={{ base: 12, md: 16 }} bgGradient="linear(to-b, white, gray.50)" mt={16}>
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <Grid 
            templateColumns={{ base: '1fr', lg: '1fr 1fr' }} 
            gap={{ base: 8, lg: 16 }} 
            alignItems="center"
          >
            <VStack align={{ base: 'center', lg: 'start' }} spacing={6} textAlign={{ base: 'center', lg: 'left' }}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                width="full"
              >
                <Stack 
                  direction={{ base: 'column', sm: 'row' }} 
                  spacing={4} 
                  alignItems="center"
                  justify={{ base: 'center', lg: 'flex-start' }}
                >
                  <Image src={CONFIGKITS_LOGO_ICON} w={{ base: 20, sm: 24, md: 28 }} h={{ base: 20, sm: 24, md: 28 }} alt="ConfigKits Logo" />
                  <Heading size={{ base: '2xl', sm: '3xl', md: '4xl' }} color="gray.800">
                    ConfigKits
                  </Heading>
                </Stack>
              </MotionBox>
              
              <Text 
                fontSize={{ base: 'md', sm: 'lg', md: 'xl' }} 
                fontWeight={600} 
                color="gray.800"
              >
                A developer-focused, configuration-driven rendering framework that redefines how modern applications are built, deployed, and personalized.
              </Text>
              <Text 
                fontSize={{ base: 'sm', sm: 'md', md: 'lg' }} 
                color="gray.600"
              >
                Define entire user interfaces, behaviors, and feature states through declarative configuration files—allowing applications to adapt dynamically without code changes or redeployments.
              </Text>
              <HStack 
                spacing={{ base: 2, sm: 4 }} 
                flexWrap="wrap"
                justify={{ base: 'center', lg: 'flex-start' }}
                width="full"
              >
                <Button 
                  as={Link} 
                  to="/playground" 
                  size={{ base: 'sm', sm: 'md', md: 'lg' }} 
                  colorScheme="brand" 
                  leftIcon={<span>🚀</span>}
                >
                  Try Playground
                </Button>
                <Button 
                  as="a" 
                  href="#getting-started" 
                  size={{ base: 'sm', sm: 'md', md: 'lg' }} 
                  variant="outline" 
                  colorScheme="brand"
                >
                  Get Started
                </Button>
                <Button 
                  as="a" 
                  href="#features" 
                  size={{ base: 'sm', sm: 'md', md: 'lg' }} 
                  variant="ghost" 
                  colorScheme="brand"
                  display={{ base: 'none', sm: 'flex' }}
                >
                  Learn More
                </Button>
              </HStack>
              <HStack 
                spacing={{ base: 4, sm: 8 }} 
                pt={8} 
                borderTop="1px solid" 
                borderColor="gray.200"
                width="full"
                justify={{ base: 'center', lg: 'flex-start' }}
                flexWrap="wrap"
              >
                <VStack align="center" spacing={1}>
                  <Text fontSize={{ base: 'xl', sm: '2xl' }} fontWeight={800} color="brand.500">3</Text>
                  <Text fontSize={{ base: 'xs', sm: 'sm' }} color="gray.600">Core Packages</Text>
                </VStack>
                <VStack align="center" spacing={1}>
                  <Text fontSize={{ base: 'xl', sm: '2xl' }} fontWeight={800} color="brand.500">100%</Text>
                  <Text fontSize={{ base: 'xs', sm: 'sm' }} color="gray.600">TypeScript</Text>
                </VStack>
                <VStack align="center" spacing={1}>
                  <Text fontSize={{ base: 'xl', sm: '2xl' }} fontWeight={800} color="brand.500">MIT</Text>
                  <Text fontSize={{ base: 'xs', sm: 'sm' }} color="gray.600">Open Source</Text>
                </VStack>
              </HStack>
            </VStack>
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              display={{ base: 'none', lg: 'block' }}
            >
              <Box bg={codeBg} borderRadius="12px" overflow="hidden" boxShadow="xl">
                <Flex bg="gray.900" p={3} align="center" gap={2}>
                  <Box w={3} h={3} borderRadius="full" bg="red.500" />
                  <Box w={3} h={3} borderRadius="full" bg="yellow.500" />
                  <Box w={3} h={3} borderRadius="full" bg="green.500" />
                  <Text ml="auto" fontSize="xs" color="gray.400" fontFamily="mono">config.json</Text>
                </Flex>
                <Box p={4} fontFamily="mono" fontSize="xs" color="gray.200" overflowX="auto">
                  <pre>{`{
  "version": "1.0.0",
  "components": [
    {
      "id": "header",
      "type": "div",
      "children": [
        {
          "id": "title",
          "type": "h1",
          "props": {
            "children": "Hello!"
          }
        }
      ]
    }
  ]
}`}</pre>
                </Box>
              </Box>
            </MotionBox>
          </Grid>
        </Container>
      </Box>

      {/* Features Section - Improved responsive grid */}
      <Box id="features" py={{ base: 16, md: 24 }} bg="white">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack spacing={{ base: 8, md: 12 }} mb={12} textAlign="center">
            <Heading size={{ base: 'lg', md: 'xl' }}>Key Features</Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">
              Everything you need to build configuration-driven applications
            </Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 6, md: 8 }}>
            {features.map((feature, idx) => (
              <MotionBox
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card 
                  bg={cardBg} 
                  _hover={{ transform: 'translateY(-8px)', boxShadow: 'xl' }} 
                  transition="all 0.3s"
                  h="full"
                >
                  <CardBody>
                    <Box
                      w={16}
                      h={16}
                      bgGradient="linear(to-br, brand.500, brand.600)"
                      borderRadius="12px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="2xl"
                      mb={4}
                      boxShadow="md"
                    >
                      {feature.icon}
                    </Box>
                    <Heading size="md" mb={2} textAlign="left">{feature.title}</Heading>
                    <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }} textAlign="left">{feature.desc}</Text>
                  </CardBody>
                </Card>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Packages Section - Improved responsive */}
      <Box id="packages" py={{ base: 16, md: 24 }} bg="gray.50">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack spacing={{ base: 8, md: 12 }} mb={12} textAlign="center">
            <Heading size={{ base: 'lg', md: 'xl' }}>Packages</Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600">Modular, composable, and powerful</Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 8 }}>
            {packages.map((pkg, idx) => (
              <MotionBox
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                position="relative"
              >
                <Card 
                  bg={cardBg} 
                  border={pkg.featured ? '2px solid' : '2px solid transparent'} 
                  borderColor={pkg.featured ? 'brand.500' : 'transparent'} 
                  _hover={{ borderColor: 'brand.500', transform: 'translateY(-4px)', boxShadow: 'xl' }} 
                  transition="all 0.3s"
                  h="full"
                >
                  <CardHeader>
                    <Flex justify="space-between" align="center" mb={2} flexWrap="wrap" gap={2}>
                      <Heading size={{ base: 'sm', md: 'md' }}>{pkg.name}</Heading>
                      <Badge colorScheme="brand" rounded="md" fontSize="xs">{pkg.badge}</Badge>
                    </Flex>
                  </CardHeader>
                  <CardBody pt={0}>
                    <Text color="gray.600" mb={4} fontSize={{ base: 'sm', md: 'md' }}>{pkg.desc}</Text>
                    <HStack spacing={2} mb={4} flexWrap="wrap">
                      {pkg.features.map((feat, i) => (
                        <Badge key={i} variant="outline" colorScheme="brand" px={2} py={1} fontSize="xs">{feat}</Badge>
                      ))}
                    </HStack>
                    <Divider my={4} />
                    <Code 
                      display="block" 
                      p={3} 
                      bg="gray.800" 
                      color="gray.200" 
                      borderRadius="md" 
                      fontSize="xs" 
                      fontFamily="mono"
                      overflowX="auto"
                    >
                      {pkg.install}
                    </Code>
                  </CardBody>
                </Card>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section - Mobile optimized */}
      <Box py={{ base: 16, md: 24 }} bgGradient="linear(to-r, brand.500, brand.600)" color="white">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack spacing={6} textAlign="center">
            <Heading size={{ base: 'lg', md: 'xl' }} color="white">Ready to get started?</Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} opacity={0.9}>
              Try ConfigKits in your browser with our interactive playground
            </Text>
            <Button 
              as={Link} 
              to="/playground" 
              size={{ base: 'md', md: 'lg' }} 
              colorScheme="brand" 
              bg="white" 
              color="brand.500" 
              _hover={{ bg: 'gray.100', transform: 'translateY(-3px)', boxShadow: 'xl' }} 
              leftIcon={<span>🚀</span>}
              width={{ base: 'full', sm: 'auto' }}
            >
              Launch Playground
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Getting Started Section - Improved responsive */}
      <Box id="getting-started" py={{ base: 16, md: 24 }} bg="gray.800" color="white">
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack spacing={{ base: 8, md: 12 }} mb={12} textAlign="center">
            <Heading size={{ base: 'lg', md: 'xl' }} color="white">Get Started</Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400">Install and start building in minutes</Text>
          </VStack>
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 6, md: 8 }}>
            <Card bg="gray.900" border="1px solid" borderColor="gray.700">
              <CardHeader>
                <Heading size={{ base: 'sm', md: 'md' }} color="white">📦 Installation</Heading>
              </CardHeader>
              <CardBody pt={0}>
                <Box bg="gray.950" borderRadius="md" overflow="hidden" border="1px solid" borderColor="gray.700">
                  <Flex bg="gray.800" p={3} justify="space-between" align="center" borderBottom="1px solid" borderColor="gray.700" flexWrap="wrap" gap={2}>
                    <Text fontSize="xs" color="gray.400" fontWeight={600}>Terminal</Text>
                    <Button
                      size="xs"
                      colorScheme="brand"
                      onClick={() => navigator.clipboard.writeText('npm install @configkits/core @configkits/react @configkits/flags')}
                    >
                      Copy
                    </Button>
                  </Flex>
                  <Box p={4} fontFamily="mono" fontSize="xs" color="gray.200" overflowX="auto">
                    <pre>{`npm install @configkits/core
npm install @configkits/react
npm install @configkits/flags`}</pre>
                  </Box>
                </Box>
              </CardBody>
            </Card>
            <Card bg="gray.900" border="1px solid" borderColor="gray.700">
              <CardHeader>
                <Heading size={{ base: 'sm', md: 'md' }} color="white">⚡ Quick Start</Heading>
              </CardHeader>
              <CardBody pt={0}>
                <Box bg="gray.950" borderRadius="md" overflow="hidden" border="1px solid" borderColor="gray.700">
                  <Flex bg="gray.800" p={3} justify="space-between" align="center" borderBottom="1px solid" borderColor="gray.700" flexWrap="wrap" gap={2}>
                    <Text fontSize="xs" color="gray.400" fontWeight={600}>TypeScript</Text>
                    <Button
                      size="xs"
                      colorScheme="brand"
                      onClick={() => navigator.clipboard.writeText(`import { ConfigRenderer } from '@configkits/react';
import { defaultRegistry } from '@configkits/react';

defaultRegistry.register('button', Button);
<ConfigRenderer config={config.components} />`)}
                    >
                      Copy
                    </Button>
                  </Flex>
                  <Box p={4} fontFamily="mono" fontSize="xs" color="gray.200" overflowX="auto">
                    <pre>{`import { ConfigRenderer } from '@configkits/react';
import { defaultRegistry } from '@configkits/react';

defaultRegistry.register('button', Button);
<ConfigRenderer config={config.components} />`}</pre>
                  </Box>
                </Box>
              </CardBody>
            </Card>
          </Grid>
        </Container>
      </Box>

      {/* Footer - Improved responsive */}
      <Box as="footer" bg="gray.900" color="white" py={{ base: 12, md: 16 }}>
        <Container maxW="1200px" px={{ base: 4, md: 6 }}>
          <VStack spacing={6} textAlign="center">
            <HStack spacing={3} justify="center" flexWrap="wrap">
              <Image src={CONFIGKITS_LOGO_ICON} w={{ base: 12, md: 20 }} h={{ base: 12, md: 20 }} alt="ConfigKits Logo" />
              <Heading size={{ base: 'xl', md: '3xl' }} color="white">ConfigKits</Heading>
            </HStack>
            <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.400">A configuration-driven rendering framework for modern applications.</Text>
            <HStack spacing={{ base: 3, md: 6 }} flexWrap="wrap" justify="center">
              <ChakraLink href={GITHUB_URL} fontSize={{ base: 'sm', md: 'md' }} color="gray.400" _hover={{ color: 'brand.500' }}>GitHub</ChakraLink>
              <Link to="/playground" style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Playground</Link>
              <ChakraLink href={DOCS_URL} target="_blank" fontSize={{ base: 'sm', md: 'md' }} color="gray.400" _hover={{ color: 'brand.500' }}>Documentation</ChakraLink>
              <ChakraLink href="#packages" fontSize={{ base: 'sm', md: 'md' }} color="gray.400" _hover={{ color: 'brand.500' }}>Packages</ChakraLink>
            </HStack>
            <Text fontSize="xs" color="gray.600">MIT License</Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
