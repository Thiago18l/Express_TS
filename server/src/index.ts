import express from 'express';
import bodyParser from 'body-parser';
import cookiesSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookiesSession({ keys: ['value']}))
app.use(AppRouter.getInstance());

app.listen(PORT, () => {
    console.log(`Running in the port ${PORT}`);
});