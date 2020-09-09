import express from 'express';
import Routes from "./routes/routes";
import bodyParser from 'body-parser';
import cookiesSession from 'cookie-session';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookiesSession({ keys: ['value']}))
app.use(Routes);

app.listen(PORT, () => {
    console.log(`Running in the port ${PORT}`);
});