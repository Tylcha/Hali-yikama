import Photo from '../models/photo.js';

const getIndex = (req, res) => {
    res.render('index',{
        page_name:'index',
    });
};
const getHakkinda = (req, res) => {
    res.render('hakkinda',{
        page_name:'hakkinda',
    });
};
const getBlog = async (req, res) => {
    const photos = await Photo.find({}).sort({dateCreated:-1});
    res.render('yaptigimiz_isler', { 
        page_name:'yaptigimiz_isler',
        photos,
    });
};
const getContact = (req, res) => {
    res.render('iletisim',{
        page_name:'iletisim',
    });
};
const getHizmetlerimiz = (req, res) => {
    res.render('hizmetlerimiz',{
        page_name:'hizmetlerimiz',
    });
};

export { getIndex, getHakkinda, getBlog, getContact, getHizmetlerimiz };
