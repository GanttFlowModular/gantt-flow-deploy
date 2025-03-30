import axios from 'axios';

// Exportar funciones de auth.ts
export * as auth from './api/auth/auth';

// Exportar funciones de users.ts
export * as usersAdmin from './api/admin/users';

// Exportar funciones de permissions.ts
export * as permissionsAdmin from './api/admin/permissions';

// Exportar funciones de audit.service.ts
export * as auditAdmin from './api/admin/audit.service';

//crear constante API para mandar token al backend mediante el header
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
});

// Interceptor de solicitud CON DEBUG MEJORADO
api.interceptors.request.use((config) => {

    const token = localStorage.getItem('token');
    if (token) {
      console.log('➕ Añadiendo header Authorization');
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('⚠️ No se encontró token en localStorage');
    }
    
    console.log('📤 Headers finales:', config.headers);
    return config;
  });
  
  export default api;
