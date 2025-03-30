import Audit from '../model/audit.model.js';

const AuditService = {
  async createLog(logData) {
    try {
      const newLog = new Audit({
        ...logData,
        ipAddress: logData.ipAddress || 'system'
      });
      
      const savedLog = await newLog.save();
      return savedLog;
    } catch (error) {
      console.error('❌ Error guardando log:', error.message);
      console.error('Documento fallido:', logData);
      throw error;
    }
  },
  async getAuditLogs(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const [logs, total] = await Promise.all([
      Audit.find()
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .populate('user', 'username email'),
      Audit.countDocuments()
    ]);

    return {
      logs,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  },  
};

export default AuditService;