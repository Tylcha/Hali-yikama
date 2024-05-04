const getAdminLogin = (req, res) => {
    res.render('adminLogin');
};
const postAdminLogin = (req, res) => {
    const user = req.body
    console.log(user);
    res.redirect('adminLogin');
};

export { getAdminLogin, postAdminLogin };
