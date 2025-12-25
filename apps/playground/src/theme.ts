import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// ConfigKits brand colors
const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#e6f2ff',
      100: '#b3d9ff',
      200: '#80bfff',
      300: '#4da6ff',
      400: '#1a8cff',
      500: '#007bff', // Primary brand color (blue from logo)
      600: '#0066cc',
      700: '#0052a3',
      800: '#003d7a',
      900: '#002952',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#2d2d2d', // Dark gray from logo
      900: '#1a1a1a',
    },
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
    mono: `"Monaco", "Courier New", monospace`,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 600,
        borderRadius: '8px',
      },
      sizes: {
        lg: {
          fontSize: '1.1rem',
          px: 8,
          py: 6,
        },
      },
      variants: {
        primary: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          _active: {
            bg: 'brand.700',
          },
        },
        secondary: {
          bg: 'transparent',
          color: 'brand.500',
          border: '2px solid',
          borderColor: 'brand.500',
          _hover: {
            bg: 'brand.500',
            color: 'white',
            transform: 'translateY(-2px)',
          },
        },
        outline: {
          bg: 'white',
          color: 'gray.800',
          border: '2px solid',
          borderColor: 'gray.200',
          _hover: {
            borderColor: 'brand.500',
            color: 'brand.500',
            transform: 'translateY(-2px)',
          },
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 800,
        color: 'gray.800',
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
          color: 'brand.500',
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: '16px',
          boxShadow: 'sm',
          _hover: {
            boxShadow: 'lg',
            transform: 'translateY(-4px)',
          },
          transition: 'all 0.3s',
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.800',
      },
    },
  },
});

export default theme;

