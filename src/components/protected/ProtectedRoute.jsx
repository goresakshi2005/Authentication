import { useAuth } from '../auth/AuthProvider';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;