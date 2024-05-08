import mongoose from 'mongoose';
import 'dotenv/config';

const conn = async () => {
    try {
        await mongoose.connect(process.env.DBI_URL, {
            dbName: 'Hali-Yikama',
            serverApi: { version: '1', strict: true, deprecationErrors: true },
        });
    } catch (error) {
        console.log(error);
    }
};

export default conn;