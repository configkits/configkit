import { Box, Heading, Flex, Container, HStack, Link as ChakraLink, Button,  Image, } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { DOCS_URL, GITHUB_ICON, GITHUB_URL } from '../../constants'
import { ConfigKitsLogo } from '../../pages/Home'

type Props = {
    scrollY: number
    bgNav: string
    borderColor: string
}

const NavBar = (props: Props) => {
    const { scrollY, bgNav, borderColor } = props
  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      bg={scrollY > 50 ? bgNav : "rgba(255, 255, 255, 0.95)"}
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor={borderColor}
      zIndex={1000}
      py={4}
      transition="all 0.3s"
      boxShadow={scrollY > 50 ? "md" : "none"}
    >
      <Container maxW="1200px">
        <Flex justify="space-between" align="center">
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <ConfigKitsLogo size={10} />
            <Heading size="lg" color="gray.800">
              ConfigKits
            </Heading>
          </Link>
          <HStack spacing={6}>
            <ChakraLink href="#features" _hover={{ color: "brand.500" }}>
              Features
            </ChakraLink>
            <ChakraLink href="#packages" _hover={{ color: "brand.500" }}>
              Packages
            </ChakraLink>
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
              as={Link}
              to="/playground"
              colorScheme="brand"
              size="sm"
              bgGradient="linear(to-r, brand.500, brand.600)"
            >
                <span>🚀</span> &nbsp;Try Playground
            </Button>
            <Button
              as="a"
              href={GITHUB_URL}
              colorScheme="brand"
              size="sm"
              leftIcon={
                <Image src={GITHUB_ICON} w={5} h={5} alt="GitHub" />
              }
            >
              GitHub
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default NavBar