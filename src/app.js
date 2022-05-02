import helmet from 'helmet';
import cors from 'cors';
import express from 'express';

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors());
app.use(helmet());

export default app;