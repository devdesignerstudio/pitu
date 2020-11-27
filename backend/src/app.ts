import express from 'express';
import linksRouter from './routes/links';
import cors from 'cors';

const app = express();

app.use(express.json()); //app usando formato json de dados

app.use (cors()); //permite que nosso frontend se comunique com o backend

app.use(linksRouter);

export default app;