import { create } from 'zustand';

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  // Acción para guardar el token y los datos del usuario
  setAuth: (token, user) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user });
  },
  // Acción para cerrar sesión
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    set({ token: null, user: null });
  },
  // Acción para inicializar el estado desde localStorage al cargar la app
  initialize: () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    if (token && user) {
      set({ token, user: JSON.parse(user) });
    }
  },
}));
