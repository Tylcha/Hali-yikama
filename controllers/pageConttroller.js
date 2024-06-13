import Photo from '../models/photo.js';

const getIndex = (req, res) => {
    res.render('index');
};
const getHakkinda = (req, res) => {
    res.render('hakkinda');
};
const getBlog = async (req, res) => {
    const photos = await Photo.find({}).sort({dateCreated:-1});
    res.render('yaptigimiz_isler', { photos });
};
const getContact = (req, res) => {
    res.render('iletisim');
};
const getHizmetlerimiz = (req, res) => {
    res.render('hizmetlerimiz');
};

export { getIndex, getHakkinda, getBlog, getContact, getHizmetlerimiz };
