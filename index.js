import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import cors from 'cors';
import locationsRoute from './src/routes/locations.js';
import usersRoute from './src/routes/users.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(locationsRoute)
app.use(usersRoute)

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log('Connected to the DB')
}).catch((err) => {
    console.log('Error', err)
})

app.listen(process.env.PORT, () => {
    console.log(`App started on ${process.env.PORT}`)
})
