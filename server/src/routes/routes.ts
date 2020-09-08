import { Router, Request, Response } from 'express';

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
routes.post("/login", (req: Request, res: Response) => {
    
});
export default routes;