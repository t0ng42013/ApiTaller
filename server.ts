import express,{Express} from 'express';

import authRoutes from './src/routes/authRoutes';
import indexRouter from './src/routes/indexRoutes';

export class Server {

   private app:Express;
   private port: number | string;
   private authPath: string;
   private indexPath: string;

   constructor (){

    this.app = express();
    this.port = process.env.PORT || 3000;
    this.authPath = '/auth';
    this.indexPath = '/';


    this.middelware();
    this.routes();
   }

   private middelware():void {
    this.app.use(express.json());
   }

   private routes():void {
    this.app.use(this.indexPath, indexRouter);
    this.app.use(this.authPath, authRoutes);
   }

   public start ():void {
    this.app.listen(this.port,() => {console.log(`Server started on ${this.port}`);});
   }
}


