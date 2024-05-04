import mongoose from 'mongoose';

const { Schema } = mongoose;

const PhotoScheme = new Schema({
    title: String, // String is shorthand for {type: String}
    description: String,
    image1: String,
    image2: String,
    dateCreated: { type: Date, default: Date.now },
});

const Photo = mongoose.model('Photo', PhotoScheme);

export default Photo;
