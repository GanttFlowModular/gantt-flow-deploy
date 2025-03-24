import mongoose from "mongoose";

const ganttSchema = new mongoose.Schema({
    taskId: String,
    taskName: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number, //in days
        required: true,
    },
    progress: {
        type: Number,
        required: true,
    },
    dependencies: String, //comma separated taskIds
    parentTask: String,
    parentTaskName: String,
    taskType: String,
    taskStatus: String,
    taskPriority: String,
    taskDescription: String,
    taskComments: String,
    taskAttachments: String,
    taskAssignedTo: String,
    taskAssignedName: String,
    taskAssignedEmail: String,
    taskAssignedRole: String,
    taskAssignedPermissions: String,
    taskCreatedBy: String,
    taskCreatedName: String,
    taskCreatedEmail: String,
}, {
    timestamps: true
});

const Gantt = mongoose.model("Gantt", ganttSchema, 'gantt');
export default Gantt;