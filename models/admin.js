import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const AdminScheme = new Schema({
    admin_k_id: {
        type: String,
        unique: true,
        required: true,
    },
    admin_k_pass: {
        type: String,
        unique: true,
        required: true,
    },
    dateCreated: { type: Date, default: Date.now },
});
AdminScheme.pre('save', function (next) {
    const admin = this;
    bcrypt.hash(admin.admin_k_pass, 10, (error, hash) => {
        admin.admin_k_pass = hash;
        next();
    });
});

const Admin = mongoose.model('admin', AdminScheme);

export default Admin;
