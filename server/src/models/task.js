import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    id: String,
    projectId: mongoose.Schema.Types.ObjectId,
    title: String,
    assignedTo: mongoose.Schema.Types.ObjectId,
    status: String,
    startDate: Date,
    endDate: Date
});

const Task = mongoose.model('Task', taskSchema);

export default Task