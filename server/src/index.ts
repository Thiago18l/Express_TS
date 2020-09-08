import express from 'express';
import Routes from "./routes/routes";
import Body_Parser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(Body_Parser.urlencoded({ extended: true }));
app.use(Routes);

app.listen(PORT, () => {
    console.log(`Running in the port ${PORT}`);
});