import api from './config/axios';
import type { User } from 'packages/@types/user.d.ts';


export async function Profile(userData: User) {
    try {
        const response = await api.get(`/users/${userData.id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log('✅ Profile response:', response);
        return response.data;
    } catch (error: any) {
        console.error('❌ Erro completo:', error);
        console.error('❌ Response data:', error.response?.data);
        console.error('❌ Response status:', error.response?.status);
        throw error;
    }
}