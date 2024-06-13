//__dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs';

//db schema
import Photo from '../models/photo.js';
import Admin from '../models/admin.js';

//bcrypt password
import bcrypt from 'bcrypt';

//check type of data file
import mime from 'mime';

const __dirname = dirname(fileURLToPath(import.meta.url));

//create folder if not in server
const uploadDir = 'public/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const getAdminLogin = (req, res) => {
    try {
        if (req.session.adminID) {
            // console.log(req.session.adminID);
            res.status(200).redirect('/adminLogin/photoUploadPage');
        } else {
            res.status(200).render('adminLogin');
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};
const postCreateAdmin = async (req, res) => {
    try {
        console.log(req.body);
        const admin = await Admin.create(req.body);
        res.status(201).json({
            status: 'success',
            admin,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};
const postAdminLogin = async (req, res) => {
    try {
        const { admin_k_id, admin_k_pass } = req.body;
        const admin = await Admin.findOne({ admin_k_id: admin_k_id });
        if (admin) {
            bcrypt.compare(admin_k_pass, admin.admin_k_pass, (err, same) => {
                if (same) {
                    req.session.adminID = admin._id;
                    //res.status(200).send('YOU ARE LOGGED IN');
                    res.status(200).redirect('/adminLogin/photoUploadPage');
                } else {
                    res.status(401).send('Invalid password or id');
                }
            });
        } else {
            res.status(401).send('Invalid password or id');
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

const getPhotoUpload = (req, res) => {
    try {
        if (req.session.adminID) {
            res.status(200).render('admin/photoUploadPage');
        } else {
            res.redirect('/adminLogin'); // Eğer yönetici oturumu yoksa, burada başka bir işlem yapılabilir veya hata mesajı gönderilebilir.
        }
    } catch (error) {}
};
const postPhotoUpload = async (req, res) => {
    // console.log(req.files.image1.mimetype);
    // console.log(photos);
    let image1;
    let image2;
    let uploadPath1;
    let uploadPath2;
    
    // //check file is empt
    if (!req.files || !req.files.image1 || !req.files.image2) {
        return res.status(400).send('Dosyalari duzgun secin');
    }

    //check file type png or jpeg
    if (
        !(
            req.files.image1.mimetype === 'image/jpeg' ||
            req.files.image1.mimetype === 'image/png'
        ) ||
        !(
            req.files.image2.mimetype === 'image/jpeg' ||
            req.files.image2.mimetype === 'image/png'
        )
    ) {
        res.status(400).send('PNG veya JPG yukleyin.');
    } else {
        //get image
        image1 = req.files.image1;
        image2 = req.files.image2;

        //unig name
        const randomString = Math.random().toString(36).substring(2, 15);
        const uniqImage1 = randomString + image1.name;
        const uniqImage2 = randomString + image2.name;

        //path directory
        uploadPath1 = __dirname + '/../public/uploads/' + uniqImage1;
        // console.log(uploadPath1);
        uploadPath2 = __dirname + '/../public/uploads/' + uniqImage2;
        //console.log(uploadPath2);

        //save image and write db and go index

        try {
            await image1.mv(uploadPath1, function (err) {
                if (err) return res.status(500).send(err);
            });
            await image2.mv(uploadPath2, function (err) {
                if (err) return res.status(500).send(err);
            });
            await Photo.create({
                image1: uniqImage1,
                image2: uniqImage2,
            });
            res.redirect('/');
        } catch (error) {
            return res.status(500).send(err);
        }
    }
};
const getLogout = (req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};
const postDetelePhotos = async (req, res) =>{
    try {
        // console.log(req.params.id);
        const photoid = await Photo.findById(req.params.id);
        let file1 = __dirname + '/../public/uploads/' + photoid.image1;
        let file2 = __dirname + '/../public/uploads/' + photoid.image2;
        console.log(__dirname);
        console.log(file1);
        fs.unlinkSync(file1);
        fs.unlinkSync(file2);
        await Photo.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        return res.status(500).send(error)
    }
    
}

export {
    postCreateAdmin,
    getAdminLogin,
    postAdminLogin,
    getPhotoUpload,
    postPhotoUpload,
    getLogout,
    postDetelePhotos
};
