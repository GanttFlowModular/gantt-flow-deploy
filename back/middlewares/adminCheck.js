import jwt from 'jsonwebtoken';

export const adminAuthMiddleware = async (req, res, next) => {
  try {
      // 1. Verificar el header
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
          console.log('Formato de token incorrecto');
          return res.status(401).json({ error: 'Acceso no autorizado' });
      }

      // 2. Extraer el token
      const token = authHeader.split(' ')[1];
      //console.log('Token recibido:', token);

      // 3. Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log('Token decodificado:', decoded);

      // 4. Verificar el rol
      if (decoded.role !== 'admin') {
          console.log('Usuario no es admin');
          return res.status(403).json({ error: 'Se requieren privilegios de admin' });
      }

      next();
  } catch (error) {
      console.error('Error en middleware:', error);
      res.status(401).json({ error: 'Token inválido o expirado' });
  }
};