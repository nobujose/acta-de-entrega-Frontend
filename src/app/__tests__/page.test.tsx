// src/app/__tests__/page.test.tsx
import { render } from '@testing-library/react';
import Home from '../page';
import { useRouter } from 'next/navigation';

// 1. Hacemos un "mock" del módulo de navegación de Next.js
// Le decimos a Jest que reemplace el 'useRouter' real por una simulación.
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Home Page', () => {
  it('should call router.replace with "/login"', () => {
    // 2. Creamos una función espía para el método 'replace'
    const mockReplace = jest.fn();

    // 3. Configuramos nuestro 'useRouter' simulado para que devuelva nuestra función espía
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });

    // 4. Renderizamos el componente Home. Esto ejecutará el useEffect que llama a router.replace
    render(<Home />);

    // 5. Verificamos que la función 'replace' fue llamada con el argumento correcto ('/login')
    expect(mockReplace).toHaveBeenCalledWith('/login');
    expect(mockReplace).toHaveBeenCalledTimes(1);
  });
});
