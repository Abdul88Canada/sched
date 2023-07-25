import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
    name: String,
    id: String,
    description: String,
    projectManager: mongoose.Schema.Types.ObjectId,
    tasks: [mongoose.Schema.Types.ObjectId],
    startDate: Date,
    endDate: Date,
    team: [mongoose.Schema.Types.ObjectId]
});

const Project = mongoose.model('Project', projectSchema);

export default Project