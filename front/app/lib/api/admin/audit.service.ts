import api from '@/app/lib/api';

export interface AuditLog {
  _id: string;
  user?: {
    username: string;
    email: string;
  };
  action: string;
  details: string;
  timestamp: Date;
  ipAddress: string;
  entityAffected?: {
    _id: string;
    type: string;
  };
}

export interface AuditFilters {
  action?: string;
  userId?: string;
  dateFrom?: string;
  dateTo?: string;
  entityType?: string;
}

export const getAuditLogs = async (
  page: number = 1,
  limit: number = 10,
  filters: AuditFilters = {}
) => {
  try {
    const response = await api.get('/admin/audit', {
      params: {
        page,
        limit,
        ...filters
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    throw new Error('Error al obtener los registros de auditoría');
  }
};