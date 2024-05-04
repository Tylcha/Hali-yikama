import express from 'express';
import 'dotenv/config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
    
const __dirname = dirname(fileURLToPath(import.meta.url));

//routes
import pageRoutes from './routes/pageRoutes.js'
import adminRoutes from './routes/adminRoutes.js';

const app = express();

//ejs engine
app.set('view engine', 'ejs')

//add views file
app.set('views', [__dirname + '/views/admin/',__dirname + '/views/'])

//public folder
app.use(express.static('public'));

//settings
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//routes
app.use('/', pageRoutes)
app.use('/adminLogin', adminRoutes)

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});
