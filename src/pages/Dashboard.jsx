import { useAuth } from '../components/auth/AuthProvider';
import { logout } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {currentUser?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;