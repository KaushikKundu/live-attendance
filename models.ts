import mongoose, { Schema, Document, Model } from 'mongoose';
// mongoose.connect(process.env.MONGO_URI);
const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: [ 'teacher', 'student'],
        default: 'student'
    }
});
const classSchema: Schema = new Schema({
    className: { type: String, required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    studentIds: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }]
})
const attendanceSchema: Schema = new Schema({
    classId: { type: Schema.Types.ObjectId, required: true },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true
    }
})
const User = mongoose.model('User', userSchema);
const Class = mongoose.model('Class', classSchema);
const Attendance = mongoose.model('Attendance', attendanceSchema);

export { User, Class, Attendance };