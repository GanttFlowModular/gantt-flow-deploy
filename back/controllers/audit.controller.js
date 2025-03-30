import AuditService from '../services/audit.service.js';

export const getAuditLogs = async (page, limit, filters = {}) => {
  try {
    const query = buildAuditQuery(filters);
    return await AuditService.getAuditLogs(page, limit, query);
  } catch (error) {
    throw new Error(error.message);
  }
};

const buildAuditQuery = (filters) => {
  const query = {};
  
  if (filters.action) query.action = filters.action;
  if (filters.userId) query.user = filters.userId;
  if (filters.entityType) query.entityType = filters.entityType;
  
  if (filters.dateFrom || filters.dateTo) {
    query.timestamp = {};
    if (filters.dateFrom) query.timestamp.$gte = new Date(filters.dateFrom);
    if (filters.dateTo) query.timestamp.$lte = new Date(filters.dateTo);
  }
  
  return query;
};

// Función para registrar acciones (usar en otros controladores)
export const logAction = async (userId, action, details, ipAddress, entityId, entityType) => {
  try {
    await AuditService.createLog({
      user: userId,
      action,
      details,
      ipAddress,
      entityAffected: entityId,
      entityType,
      timestamp: new Date()
    });
  } catch (error) {
    console.error("Error registrando acción:", error);
  }
};