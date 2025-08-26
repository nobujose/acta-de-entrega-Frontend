import Home from '../page';
import { redirect } from 'next/navigation';

// Simular (mock) el módulo 'next/navigation'
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('Home', () => {
  it('should call redirect with "/login"', () => {
    // Llamar a la función del componente directamente en lugar de usar render
    Home();

    // Verificar que la función redirect fue llamada
    expect(redirect).toHaveBeenCalledWith('/login');
    // Opcional: Verificar que fue llamada solo una vez
    expect(redirect).toHaveBeenCalledTimes(1);
  });
});
