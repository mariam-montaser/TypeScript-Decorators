import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import express, {Request, Response} from "express";

import { AppRouter } from "./AppRouter";

import { router as loginRoutes } from "./routes/loginRoutes";
import "./controllers/loginControllers";
import "./controllers/RootController";

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({keys: ['thisisforcookiesession']}));

app.use(loginRoutes);
app.use(AppRouter.getInstance());


app.listen(3000, () => {
    console.log('server is running.');
    
})


// class Server {
//     app: express.Express = express();

//     constructor() {
//         this.app.use(bodyParser.urlencoded({extended: true})),
//         this.app.use(cookieSession({keys: ['thisisforcookiesession']})),
//         this.app.use(loginRoutes)
//     }

//     start(): void {
//         this.app.listen(3000, () => {
//             console.log('Server is running.');
            
//         })
//     }
// }

// new Server().start();
