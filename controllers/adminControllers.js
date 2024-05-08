//__dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs';

//db schema
import Photo from '../models/photo.js';

//check type of data file
import mime from 'mime';

const __dirname = dirname(fileURLToPath(import.meta.url));

//create folder if not in server
const uploadDir = 'public/uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const getAdminLogin = (req, res) => {
    res.render('adminLogin');
};
const postAdminLogin = (req, res) => {
    const user = req.body;
    console.log(user);
    res.redirect('adminLogin');
};
const getPhotoUpload = (req, res) => {
    res.render('photoUploadPage');
};
const postPhotoUpload = async (req, res) => {
    // console.log(req.files.image1.mimetype);
    // console.log(photos);
    let image1;
    let image2;
    let uploadPath1;
    let uploadPath2;
    //check file is empt
    if (
        !(req.files.image1 && req.files.image2) ||
        Object.keys(req.files.image1 && req.files.image2).length === 0
    ) {
        res.status(400).send('Hicbir dosya secilmedi.');
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
        console.log(uploadPath1);
        uploadPath2 = __dirname + '/../public/uploads/' + uniqImage2;
        console.log(uploadPath2);

        //save image and write db and go index
        const imgSave = async () => {
            try {
                await image1.mv(uploadPath1, function (err) {
                    if (err) return res.status(500).send(err);
                });
                await image2.mv(uploadPath2, function (err) {
                    if (err) return res.status(500).send(err);
                });
                await Photo.create({
                    image1: '/public/uploads/' + uniqImage1,
                    image2: '/public/uploads/' + uniqImage2,
                });
                res.redirect('/');
            } catch (error) {
                return res.status(500).send(err);
            }
        };
        imgSave();
    }
};

export { getAdminLogin, postAdminLogin, getPhotoUpload, postPhotoUpload };
