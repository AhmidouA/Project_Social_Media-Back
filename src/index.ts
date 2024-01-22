/* Npm */
import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from "url"; //  sert à convertir un objet URL en un chemin d'accès de fichier utilisable dans le système de fichiers en JavaScript

/* CONFIGURATION */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({path: './src/config/.env'})


const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(express.json({ limit: '30mb'}));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(morgan("common"));

app.use(express.static("../public/"));


const PORT = process.env.PORT;




app.listen(PORT, () => {
    console.log(`server runnig on ${PORT}`)
})