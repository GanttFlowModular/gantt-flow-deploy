import { logAction } from '../controllers/audit.controller.js';

export const auditLogger = (action, detailsResolver) => async (req, res, next) => {
  try {
    const details = detailsResolver 
      ? await detailsResolver(req)
      : `${req.method} ${req.path}`;
    
    await logAction(
      req.user?._id,
      action,
      details,
      req.ip,
      req.params.id || req.body._id,
      req.body?.constructor?.modelName || 'N/A'
    );
    
  } catch (error) {
    console.error('Error en auditLogger:', error);
  }
  next();
};
