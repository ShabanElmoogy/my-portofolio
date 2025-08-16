// Theme utility functions for consistent styling across components

export const getGradientBackground = (isDark) => ({
  background: isDark 
    ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
    : 'linear-gradient(135deg, rgba(33,150,243,0.05) 0%, rgba(33,150,243,0.02) 100%)',
});

export const getGlassmorphismStyle = (isDark) => ({
  background: isDark 
    ? 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
    : 'linear-gradient(135deg, rgba(33,150,243,0.08) 0%, rgba(33,150,243,0.02) 100%)',
  backdropFilter: 'blur(20px)',
  border: isDark 
    ? '1px solid rgba(255,255,255,0.1)'
    : '1px solid rgba(33,150,243,0.1)',
});

export const getCardHoverStyle = (isDark) => ({
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: isDark 
      ? '0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(33,150,243,0.1)'
      : '0 20px 40px rgba(0,0,0,0.1), 0 0 20px rgba(33,150,243,0.1)',
  },
});

export const getButtonGradient = (color = 'primary', isDark = false) => {
  const gradients = {
    primary: isDark 
      ? 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)'
      : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    secondary: isDark
      ? 'linear-gradient(45deg, #7b1fa2 30%, #ba68c8 90%)'
      : 'linear-gradient(45deg, #9c27b0 30%, #e91e63 90%)',
  };
  return gradients[color] || gradients.primary;
};

export const getButtonHoverGradient = (color = 'primary', isDark = false) => {
  const gradients = {
    primary: isDark
      ? 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)'
      : 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
    secondary: isDark
      ? 'linear-gradient(45deg, #6a1b9a 30%, #ad52c6 90%)'
      : 'linear-gradient(45deg, #7b1fa2 30%, #c2185b 90%)',
  };
  return gradients[color] || gradients.primary;
};

export const getTextGradient = () => ({
  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

export const getAnimatedGradient = () => ({
  background: 'linear-gradient(45deg, #2196F3, #21CBF3, #9C27B0)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% 200%',
  animation: 'gradient 3s ease infinite',
  '@keyframes gradient': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  }
});

export const getSectionSpacing = () => ({
  py: { xs: 4, sm: 6, md: 8 },
  px: { xs: 2, sm: 3, md: 4 },
});

export const getContainerMaxWidth = () => 'xl';

export const getResponsiveSpacing = () => ({
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
});

// Common component styles
export const commonStyles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  heroSection: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(33,150,243,0.1) 0%, rgba(156,39,176,0.1) 100%)',
  },
  
  card: {
    borderRadius: 3,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-4px)',
    },
  },
  
  button: {
    borderRadius: 2,
    textTransform: 'none',
    fontWeight: 600,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
  
  chip: {
    borderRadius: 3,
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
};

// Breakpoint helpers
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

// Animation variants for framer-motion
export const animationVariants = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  
  fadeInScale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.5, ease: "easeOut" }
  },
  
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.5, ease: "easeOut" }
  },
  
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};