import dotenv from 'dotenv'
dotenv.config();
import  express  from "express";
const app = express();
import cors from "cors"
import connectToMongo from "./config/db.js";
import authRoutes from './routes/blog.js'
connectToMongo();

app.use(cors())
app.use(express.json())
app.use(express.static("public/upload"))

//API Routes
app.use('/api' ,authRoutes)

const port = 5000;
app.listen(port,()=>{
    console.log(`API is running on http://localhost:${5000}`)
})
