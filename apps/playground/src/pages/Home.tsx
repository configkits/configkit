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
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { CONFIGKITS_LOGO_ICON, DOCS_URL, GITHUB_URL } from '../constants';
import NavBar from '../components/navBar';

// Logo Component based on the ConfigKits logo
export const ConfigKitsLogo = ({ size = 20 }: { size?: number }) => {
  return (
    <Image src={CONFIGKITS_LOGO_ICON} w={size} h={size} alt="ConfigKits Logo" />
  );
};

const MotionBox = motion(Box);

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const bgNav = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const codeBg = useColorModeValue('gray.800', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');

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

  return (
    <Box>
      {/* Navigation */}
      <NavBar 
        scrollY={scrollY}
        bgNav={bgNav}
        borderColor={borderColor}

       />

      {/* Hero Section */}
      <Box pt={32} pb={16} bgGradient="linear(to-b, white, gray.50)">
        <Container maxW="1200px">
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={16} alignItems="center">
            <VStack align="start" spacing={6}>
              <Stack direction="row" spacing={4} alignItems="center">
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <ConfigKitsLogo size={120} />
              </MotionBox>
              <Heading size="4xl" color="gray.800">
                ConfigKits
              </Heading>

              </Stack>
              
              <Text fontSize="xl" fontWeight={600} color="gray.800">
                A developer-focused, configuration-driven rendering framework that redefines how modern applications are built, deployed, and personalized.
              </Text>
              <Text fontSize="lg" color="gray.600">
                Define entire user interfaces, behaviors, and feature states through declarative configuration files—allowing applications to adapt dynamically without code changes or redeployments.
              </Text>
              <HStack spacing={4} flexWrap="wrap">
                <Button as={Link} to="/playground" size="lg" colorScheme="brand" leftIcon={<span>🚀</span>}>
                  Try Playground
                </Button>
                <Button as="a" href="#getting-started" size="lg" variant="outline" colorScheme="brand">Get Started</Button>
                <Button as="a" href="#features" size="lg" variant="ghost" colorScheme="brand">Learn More</Button>
              </HStack>
              <HStack spacing={8} pt={8} borderTop="1px solid" borderColor="gray.200">
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight={800} color="brand.500">3</Text>
                  <Text fontSize="sm" color="gray.600">Core Packages</Text>
                </VStack>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight={800} color="brand.500">100%</Text>
                  <Text fontSize="sm" color="gray.600">TypeScript</Text>
                </VStack>
                <VStack align="start" spacing={1}>
                  <Text fontSize="2xl" fontWeight={800} color="brand.500">MIT</Text>
                  <Text fontSize="sm" color="gray.600">Open Source</Text>
                </VStack>
              </HStack>
            </VStack>
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Box bg={codeBg} borderRadius="12px" overflow="hidden" boxShadow="xl">
                <Flex bg="gray.900" p={3} align="center" gap={2}>
                  <Box w={3} h={3} borderRadius="full" bg="red.500" />
                  <Box w={3} h={3} borderRadius="full" bg="yellow.500" />
                  <Box w={3} h={3} borderRadius="full" bg="green.500" />
                  <Text ml="auto" fontSize="sm" color="gray.400" fontFamily="mono">config.json</Text>
                </Flex>
                <Box p={6} fontFamily="mono" fontSize="sm" color="gray.200">
                  <pre>{`{
  "version": "1.0.0",
  "components": [
    {
      "id": "header",
      "type": "div",
      "styles": {
        "padding": "20px",
        "backgroundColor": "#007bff"
      },
      "children": [
        {
          "id": "title",
          "type": "h1",
          "props": {
            "children": "Hello ConfigKits!"
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

      {/* Features Section */}
      <Box id="features" py={24} bg="white">
        <Container maxW="1200px">
          <VStack spacing={4} mb={12} textAlign="center">
            <Heading size="xl">Key Features</Heading>
            <Text fontSize="lg" color="gray.600">Everything you need to build configuration-driven applications</Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {features.map((feature, idx) => (
              <MotionBox
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card bg={cardBg} _hover={{ transform: 'translateY(-8px)', boxShadow: 'xl' }} transition="all 0.3s">
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
                    <Heading size="md" mb={2}>{feature.title}</Heading>
                    <Text color="gray.600">{feature.desc}</Text>
                  </CardBody>
                </Card>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Packages Section */}
      <Box id="packages" py={24} bg="gray.50">
        <Container maxW="1200px">
          <VStack spacing={4} mb={12} textAlign="center">
            <Heading size="xl">Packages</Heading>
            <Text fontSize="lg" color="gray.600">Modular, composable, and powerful</Text>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {packages.map((pkg, idx) => (
              <MotionBox
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                position="relative"
              >
                {/* {pkg.featured && (
                  <Badge position="absolute" zIndex={'banner'} top={-3} right={5} bgGradient="linear(to-r, brand.500, brand.600)" color="white" px={3} py={1} borderRadius="full" fontSize="xs" fontWeight={700}>
                    Popular
                  </Badge>
                )} */}
                <Card bg={cardBg} border={pkg.featured ? '2px solid' : '2px solid transparent'} borderColor={pkg.featured ? 'brand.500' : 'transparent'} _hover={{ borderColor: 'brand.500', transform: 'translateY(-4px)', boxShadow: 'xl' }} transition="all 0.3s">
                  <CardHeader>
                    <Flex justify="space-between" align="center" mb={2}>
                      <Heading size="md">{pkg.name}</Heading>
                      <Badge colorScheme="brand" rounded={'md'}>{pkg.badge}</Badge>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Text color="gray.600" mb={4}>{pkg.desc}</Text>
                    <HStack spacing={2} mb={4} flexWrap="wrap">
                      {pkg.features.map((feat, i) => (
                        <Badge key={i} variant="outline" colorScheme="brand" px={2} py={1}>{feat}</Badge>
                      ))}
                    </HStack>
                    <Divider my={4} />
                    <Code display="block" p={3} bg="gray.800" color="gray.200" borderRadius="md" fontSize="sm" fontFamily="mono">
                      {pkg.install}
                    </Code>
                  </CardBody>
                </Card>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={24} bgGradient="linear(to-r, brand.500, brand.600)" color="white">
        <Container maxW="1200px" textAlign="center">
          <VStack spacing={6}>
            <Heading size="xl" color="white">Ready to get started?</Heading>
            <Text fontSize="xl" opacity={0.9}>Try ConfigKits in your browser with our interactive playground</Text>
            <Button as={Link} to="/playground" size="lg" colorScheme="brand" bg="white" color="brand.500" _hover={{ bg: 'gray.100', transform: 'translateY(-3px)', boxShadow: 'xl' }} leftIcon={<span>🚀</span>}>
              Launch Playground
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Getting Started Section */}
      <Box id="getting-started" py={24} bg="gray.800" color="white">
        <Container maxW="1200px">
          <VStack spacing={4} mb={12} textAlign="center">
            <Heading size="xl" color="white">Get Started</Heading>
            <Text fontSize="lg" color="gray.400">Install and start building in minutes</Text>
          </VStack>
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
            <Card bg="gray.900" border="1px solid" borderColor="gray.700">
              <CardHeader>
                <Heading size="md" color="white">📦 Installation</Heading>
              </CardHeader>
              <CardBody>
                <Box bg="gray.950" borderRadius="md" overflow="hidden" border="1px solid" borderColor="gray.700">
                  <Flex bg="gray.800" p={3} justify="space-between" align="center" borderBottom="1px solid" borderColor="gray.700">
                    <Text fontSize="sm" color="gray.400" fontWeight={600}>Terminal</Text>
                    <Button
                      size="xs"
                      colorScheme="brand"
                      onClick={() => navigator.clipboard.writeText('npm install @configkits/core @configkits/react @configkits/flags')}
                    >
                      Copy
                    </Button>
                  </Flex>
                  <Box p={6} fontFamily="mono" fontSize="sm" color="gray.200">
                    <pre>{`npm install @configkits/core
npm install @configkits/react
npm install @configkits/flags`}</pre>
                  </Box>
                </Box>
              </CardBody>
            </Card>
            <Card bg="gray.900" border="1px solid" borderColor="gray.700">
              <CardHeader>
                <Heading size="md" color="white">⚡ Quick Start</Heading>
              </CardHeader>
              <CardBody>
                <Box bg="gray.950" borderRadius="md" overflow="hidden" border="1px solid" borderColor="gray.700">
                  <Flex bg="gray.800" p={3} justify="space-between" align="center" borderBottom="1px solid" borderColor="gray.700">
                    <Text fontSize="sm" color="gray.400" fontWeight={600}>TypeScript</Text>
                    <Button
                      size="xs"
                      colorScheme="brand"
                      onClick={() => navigator.clipboard.writeText(`import { ConfigRenderer } from '@configkits/react';
import { defaultRegistry } from '@configkits/react';

// Register components
defaultRegistry.register('button', Button);

// Render configuration
<ConfigRenderer config={config.components} />`)}
                    >
                      Copy
                    </Button>
                  </Flex>
                  <Box p={6} fontFamily="mono" fontSize="sm" color="gray.200">
                    <pre>{`import { ConfigRenderer } from '@configkits/react';
import { defaultRegistry } from '@configkits/react';

// Register components
defaultRegistry.register('button', Button);

// Render configuration
<ConfigRenderer config={config.components} />`}</pre>
                  </Box>
                </Box>
              </CardBody>
            </Card>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box as="footer" bg="gray.900" color="white" py={12}>
        <Container maxW="1200px">
          <VStack spacing={6} textAlign="center">
            <HStack spacing={3}>
              <ConfigKitsLogo size={20} />
              <Heading size="3xl" color="white">ConfigKits</Heading>
            </HStack>
            <Text color="gray.400">A configuration-driven rendering framework for modern applications.</Text>
            <HStack spacing={6} flexWrap="wrap" justify="center">
              <ChakraLink href={GITHUB_URL} color="gray.400" _hover={{ color: 'brand.500' }}>GitHub</ChakraLink>
              <Link to="/playground" style={{ color: '#9ca3af' }}>Playground</Link>
              <ChakraLink href={DOCS_URL} target="_blank" rel="noopener noreferrer" color="gray.400" _hover={{ color: 'brand.500' }}>Documentation</ChakraLink>
              <ChakraLink href="#packages" color="gray.400" _hover={{ color: 'brand.500' }}>Packages</ChakraLink>
            </HStack>
            <Text fontSize="sm" color="gray.600">MIT License</Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
