import { app } from '../src/app';
import webhook from './webhook';
import weather from './weather';

app.use('/webhook', webhook);

app.use('/weather', weather);

app.use('*', (req, res) =>
  res.status(404).json({ error: 404, message: 'route not found' })
);

export default app;
