import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
  const loginTime = localStorage.getItem('adminLoginTime');
  
  // Check if session is expired (24 hours)
  const isSessionValid = loginTime && (Date.now() - parseInt(loginTime)) < 24 * 60 * 60 * 1000;
  
  if (!isAuthenticated || !isSessionValid) {
    // Clear expired session
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedAdminRoute;