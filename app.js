import express from 'express';
import 'dotenv/config';

//routes
import pageRoutes from './routes/pageRoutes.js'
import adminRoutes from './routes/adminRoutes.js';

const app = express();

//ejs engine
app.set('view engine', 'ejs')

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
