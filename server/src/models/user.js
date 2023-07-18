import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    id: String,
    projects: [mongoose.Schema.Types.ObjectId],
    tasks: [mongoose.Schema.Types.ObjectId],
    teams: [mongoose.Schema.Types.ObjectId],
    isProjectManager: Boolean
});

const User = mongoose.model('User', userSchema);

export default User;