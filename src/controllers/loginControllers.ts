import { Request, Response, NextFunction } from "express";

import { get, controller, use, post, validateBody } from "./decorators";

interface RequestWithBody extends Request {
    body: {[key: string]: string | undefined};
}

function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request was made!');
    next();
}


@controller('/auth')
class LoginController {

    @get('/login')
    @use(logger)
    getLogin (req: Request, res: Response)  {
    res.send(`
        <div>
            <h1>Login</h1>
            <form method="POST">
                <div>
                    <label>Email:</label>
                    <input name="email" />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password"  name="password" />
                </div>
                <button>Login</button>
            </form>
        </div>
    `)}

    @post('/login')
    @validateBody('email', 'password')
    postLogin(req: RequestWithBody, res: Response) {
        const {email, password} = req.body;
        if( email === 'hi@hi.com' && password === '55555') {
            console.log(email, password);
            
            req.session = {loggedIn: true};
            res.redirect('/')
        } else {
            console.log(email, password);
            
            res.send('Invalid Email or Password.');
        }
    }

    @get('/logout')
    getLogout(req: Request, res: Response) {
        req.session = undefined;
        res.redirect('/');
    }
}