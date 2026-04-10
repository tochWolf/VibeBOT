import { useState } from 'react';
import { motion } from 'framer-motion';

const defaultForm = { name: '', email: '', password: '' };

export default function AuthForm({ mode = 'login', onSubmit }) {
  const [form, setForm] = useState(defaultForm);

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="glass w-full max-w-md rounded-2xl p-8"
    >
      <h1 className="text-3xl font-bold mb-6">{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
      {mode === 'signup' && (
        <input className="w-full mb-3 rounded-xl bg-white/10 p-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      )}
      <input className="w-full mb-3 rounded-xl bg-white/10 p-3" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input className="w-full mb-6 rounded-xl bg-white/10 p-3" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button className="w-full rounded-xl bg-vibe-500 hover:bg-vibe-600 transition p-3">{mode === 'login' ? 'Login' : 'Sign up'}</button>
    </motion.form>
  );
}
