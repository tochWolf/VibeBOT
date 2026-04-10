import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const mode = pathname.includes('signup') ? 'signup' : 'login';

  const handleSubmit = async (form) => {
    if (mode === 'signup') await signup(form);
    else await login(form);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 gap-4">
      <AuthForm mode={mode} onSubmit={handleSubmit} />
      <p className="text-sm text-slate-300">
        {mode === 'login' ? "Don't have an account?" : 'Already registered?'}{' '}
        <Link to={mode === 'login' ? '/signup' : '/login'} className="text-violet-300">{mode === 'login' ? 'Sign up' : 'Login'}</Link>
      </p>
    </div>
  );
}
