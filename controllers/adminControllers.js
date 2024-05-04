const getAdminLogin = (req, res) => {
    res.render('adminLogin');
};
const postAdminLogin = (req, res) => {
    const user = req.body
    console.log(user);
    res.redirect('adminLogin');
};
const getPhotoUpload = (req, res) => {
    res.render('photoUploadPage');
}
const postPhotoUpload = (req, res) => {
    const photos = req.body
    console.log(photos);
}

export { getAdminLogin, postAdminLogin, getPhotoUpload, postPhotoUpload };
