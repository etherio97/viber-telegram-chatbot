import { readFileSync } from 'fs';
import { app } from '../src/app';
import { router as ip } from './ip';
import { router as webhook } from './webhook';

app.use('/ip', ip);

app.use('/webhook', webhook);

app.use('*', (req, res) =>
  res.status(404).send(readFileSync(__dirname + '/../public/404.html', 'utf-8'))
);

export default app;
