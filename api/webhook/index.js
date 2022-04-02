import { Router, json } from 'express';
import viberController from '../../src/controllers/viber.controller';

export const router = Router();

router.post('/telegram', json(), (req, res) => {
  res.json('ok');
});

router.post('/viber', json(), (req, res) =>
  viberController
    .handle(req.body)
    .then(() => res.status(204).end())
    .catch((e) => {
      console.error('route.webhook.viber#error', e);
      res.status(500).json({ error: e.message });
    })
);
