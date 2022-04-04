import { app } from '../src/app';
import webhook from './webhook';

app.use('/webhook', webhook);

app.use('*', (req, res) =>
  res.status(404).json({ error: 404, message: 'route not found' })
);

export default app;
