import { Router, Request, Response } from 'express';

interface IRequestBody extends Request{
    body: { [key: string]: string | undefined };
}

const routes = Router();

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
export default routes;