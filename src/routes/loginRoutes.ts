import { Router, Request, Response, NextFunction } from "express";

interface RequestWithBody extends Request {
    body: {[key: string]: string | undefined};
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if(req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Your are not allowed to this page');
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
    if(req.session && req.session.loggedIn) {
        // console.log(req.session);
        
        res.send(`
            <div>
            <h1>You are Loged in.</h1>
            <a href="/logout">Logout</a>
            </div>
        `);
    } else {
       res.send(`
            <div>
            <h1>You are not Loged in.</h1>
            <a href="/login">Login</a>
            </div>
        `);
    }
})

router.get('/login', (req: Request, res: Response) => {
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
    `)
})

router.post('/login', (req: RequestWithBody, res: Response) => {
    const {email, password} = req.body;
    if(email && password && email === 'hi@hi.com' && password === '55555') {
        console.log(email, password);
        
        req.session = {loggedIn: true};
        res.redirect('/')
    } else {
        console.log(email, password);
        
        res.send('Invalid Email or Password.');
    }
})

router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined;
    res.redirect('/');
})

router.get('/protected', requireAuth,  (req: Request, res: Response) => {
    res.send('Welcome to protected route, logged in user');
})

export {router};