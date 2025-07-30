import { useState, useEffect } from 'react'; // Add useEffect
import { useAuth } from './AuthProvider';
import { registerWithEmailAndPassword, signInWithGoogle } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmailAndPassword(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
  if (currentUser) {
    navigate('/dashboard');
  }
}, [currentUser, navigate]);

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div>
        <button onClick={handleGoogleSignIn}>Sign up with Google</button>
      </div>
    </div>
  );
}

export default Signup;