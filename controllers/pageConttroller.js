import Photo from '../models/photo.js';

const getIndex = (req, res) => {
    res.render('index');
};
const getAbout = (req, res) => {
    res.render('about');
};
const getBlog = async (req, res) => {
    const photos = await Photo.find({}).sort({dateCreated:-1});
    res.render('blog', { photos });
};
const getContact = (req, res) => {
    res.render('contact');
};
const getInsurance = (req, res) => {
    res.render('insurance');
};

export { getIndex, getAbout, getBlog, getContact, getInsurance };
