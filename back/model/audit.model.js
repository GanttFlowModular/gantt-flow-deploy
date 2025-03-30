import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Puede ser null para acciones del sistema
  },
  action: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
    maxlength: 500
  },
  ipAddress: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  entityAffected: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'entityType',
    required: false
  },
  entityType: {
    type: String,
    enum: ['User', 'Project', 'Task', null],
    required: false
  }
});

// Índices para mejor performance
auditSchema.index({ timestamp: -1 });
auditSchema.index({ user: 1, action: 1 });

const Audit = mongoose.model('Audit', auditSchema);

export default Audit;