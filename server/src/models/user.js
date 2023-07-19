import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    id: String,
    projects: [mongoose.Schema.Types.ObjectId],
    tasks: [mongoose.Schema.Types.ObjectId],
    teams: [mongoose.Schema.Types.ObjectId],
    role: String,
    firstTimeUser: Boolean,
    projectManagerId: mongoose.Schema.Types.ObjectId
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
        }
    }
});

const User = mongoose.model('User', userSchema);

export default User;