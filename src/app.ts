import express from "express";
import cors from "cors"
import helmet from "helmet";
import {Routes} from "./routes/routes"
import mongoose from "mongoose"
import path from "path"
import * as dotenv from "dotenv"

class App {
    public app: express.Application
    public routesV1: Routes = new Routes()
    public mongoUrl: string
    
    constructor(){
        dotenv.config({path: path.resolve(__dirname, "..", ".env")})
        this.app = express();
        this.config();
        this.routesV1.routes(this.app)
        this.mongoUrl = process.env.MONGOURL!
        this.mongoSetup()
    }

    private config(): void{
        this.app.use(express.json())
        this.app.use(express.urlencoded())
        this.app.use(helmet())
        this.app.use(cors())
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}

export default new App().app;
