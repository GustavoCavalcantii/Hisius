import api from './config/axios';
import type { userLogin } from '../../@types/userLogin';
import type { userRegister } from '../../@types/userRegister';

interface LoginResponse {
  token: string;
}

export async function Login(userData: userLogin): Promise<LoginResponse> {
  try {
    console.log('🔄 Enviando login:', userData);

  const response = await api.post<LoginResponse>('/auth/login', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, 
  });
  console.log('✅ Login response:', response);
  return response.data;
} catch (error: any) {
    console.error('❌ Erro completo:', error);
    console.error('❌ Response data:', error.response?.data);
    console.error('❌ Response status:', error.response?.status);
  throw error;
}
}

export async function Register(userData: userRegister): Promise<void> {
  try {
    console.log('🔄 Enviando registro:', userData);

    const response = await api.post('/users', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    console.log('✅ Registro response:', response);
  } catch (error: any) {
    console.error('❌ Erro completo:', error);
    console.error('❌ Response data:', error.response?.data);
    console.error('❌ Response status:', error.response?.status);
    throw error;
  }
}