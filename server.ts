import express,{Express} from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes';
import clientRoutes from './src/routes/clientRoutes';
import indexRouter from './src/routes/indexRoutes';
import { DB_Connection } from './src/database/config';

export class Server {

   private app:Express;
   private port: number | string;
   private authPath: string;
   private indexPath: string;
   private clientPath:string;

   constructor (){

    this.app = express();
    this.port = process.env.PORT || 3000;
    this.authPath = '/auth';
    this.indexPath = '/';
    this.clientPath = '/client';
  
    this.middelware();
    this.conectarDB();
    this.routes();
   }

   private middelware():void {
      this.app.use(cors());
    this.app.use(express.json());
   }

   private routes():void {
    this.app.use(this.indexPath, indexRouter);
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.clientPath, clientRoutes);
   }

   async conectarDB():Promise<void> {
      await DB_Connection();
   };

   public start ():void {
    this.app.listen(this.port,() => {console.log(`Server started on ${this.port}`);});
   }
}


