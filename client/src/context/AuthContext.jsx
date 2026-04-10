import { createContext, useContext, useMemo, useState } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('vibebot-user');
    return raw ? JSON.parse(raw) : null;
  });

  const auth = useMemo(
    () => ({
      user,
      async login(payload) {
        const { data } = await api.post('/auth/login', payload);
        localStorage.setItem('vibebot-token', data.token);
        localStorage.setItem('vibebot-user', JSON.stringify(data.user));
        setUser(data.user);
      },
      async signup(payload) {
        const { data } = await api.post('/auth/signup', payload);
        localStorage.setItem('vibebot-token', data.token);
        localStorage.setItem('vibebot-user', JSON.stringify(data.user));
        setUser(data.user);
      },
      logout() {
        localStorage.removeItem('vibebot-token');
        localStorage.removeItem('vibebot-user');
        setUser(null);
      }
    }),
    [user]
  );

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
