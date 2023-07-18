import mongoose from 'mongoose';

const managerSchema = mongoose.Schema({
    name: String,
    id: String,
    email: String,
    teams: [mongoose.Schema.Types.ObjectId],
    projects: [mongoose.Schema.Types.ObjectId],
    users: [mongoose.Schema.Types.ObjectId]
});

const Manager = mongoose.model('Manager', managerSchema);

export default Manager