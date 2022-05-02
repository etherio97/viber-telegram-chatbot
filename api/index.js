import app from '../src/app';
import dict from './v1/dict';
import weather from './weather';
import webhook from './webhook';

app.use('/v1/dict', dict);

app.use('/webhook', webhook);

app.use('/weather', weather);

app.use('*', (req, res) =>
  res.status(404).json({ 
    error: 404, 
    message: 'route not found',
  })
);

export default app;
