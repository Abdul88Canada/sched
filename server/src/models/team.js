import mongoose from 'mongoose';

const teamSchema = mongoose.Schema({
    name: String,
    id: String,
    members: [mongoose.Schema.Types.ObjectId],
    projects: [mongoose.Schema.Types.ObjectId]
});

const Team = mongoose.model('Team', teamSchema);

export default Team