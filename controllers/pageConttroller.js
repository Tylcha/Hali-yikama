const getIndex = (req, res) => {
    res.render('index');
};
const getAbout = (req, res) => {
    res.render('about');
};
const getBlog = (req, res) => {
    res.render('blog');
};
const getContact = (req, res) => {
    res.render('contact');
};
const getInsurance = (req, res) => {
    res.render('insurance');
};

export { getIndex, getAbout, getBlog, getContact, getInsurance };
