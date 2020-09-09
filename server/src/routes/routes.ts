import { Router, Request, Response, NextFunction } from 'express';

interface IRequestBody extends Request{
    body: { [key: string]: string | undefined };
}

const routes = Router();
function requireAuth(req: Request, res: Response, next: NextFunction) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send(`
        <div>Not permitted</div>
        <a href="/login">Please login to acess this page!</a>
    `);
}

routes.get("/login", (req: Request, res: Response) => {
    res.send(`
        <form method="POST">
        <div>
            <label>Email</label>
            <input name="email"/>
        </div>
        <div>
            <label>Password</label>
            <input name="password" type="password" />
        </div>
        <button>Submit</button>
        </form>
    `)
});
routes.post("/login", (req: IRequestBody, res: Response) => {
    const { email, password } = req.body;
    if(email && password && email === 'hi@hi.com' && password === 'password') {
        req.session = { loggedIn: true };
        res.redirect("/");
    } else {
        res.send("You must provide an email");
    }
});

routes.get("/", (req: IRequestBody, res: Response) => {
    if (req.session && req.session.loggedIn) {
        res.send(`
        <div>
            <div>You are logged in</div>
            <a href="/logout">Logout</a>
        </div>
        `)
    } else {
        res.send(`
        <div>
            <div>You are not logged</div>
            <a href="/login">login</a>
        </div>
        `);
    }
});
routes.get("/logout", (req: Request, res: Response) => {
    req.session = null;
    res.redirect("/");

});
routes.get("/protected", requireAuth, (req: Request, res: Response) => {
    res.send(`Welcome to protected route, logged in user`);
});
export default routes;