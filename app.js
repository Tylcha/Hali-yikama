import express from 'express';
import 'dotenv/config';

//__dirname
import { dirname } from 'path';
import { fileURLToPath } from 'url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

//routes
import pageRoutes from './routes/pageRoutes.js'
import adminRoutes from './routes/adminRoutes.js';
import fileUpload from 'express-fileupload';

//db connection
import conn from './models/conn.js';


const app = express();

//db connection
conn();

//ejs engine
app.set('view engine', 'ejs')

//add views file
app.set('views', [__dirname + '/views/admin/',__dirname + '/views/'])

//public folder
app.use(express.static('public'));
app.use(express.static('public/uploads'));


//settings
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(fileUpload()); //

//routes
app.use('/', pageRoutes)
app.use('/adminLogin', adminRoutes)


//const port = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});
