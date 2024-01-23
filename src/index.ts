/* Npm */
import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import routers from './routers';

/* CONFIGURATION */
const __filename = path.resolve();
const __dirname = path.dirname(__filename);


dotenv.config({path: './src/config/.env'})


const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(express.json({ limit: '30mb'}));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(morgan("common"));
app.use(cors());

app.use("/assets", express.static(path.join(__dirname, "public/assets")));


const PORT = process.env.PORT;

app.use('/api', routers());

app.listen(PORT, () => {
    console.log(`server runnig on ${PORT}`)
})