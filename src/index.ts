import express from 'express';
import dotenv from 'dotenv'

dotenv.config({path: './src/config/.env'})


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;




app.listen(PORT, () => {
    console.log(`server runnig on ${PORT}`)
})