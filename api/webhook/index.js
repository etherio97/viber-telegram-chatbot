import { Router, json } from 'express';
import viberController from '../../src/controllers/viber.controller';
import telegramController from '../../src/controllers/telegram.controller';

const router = Router();

router.use(json());

router.post('/telegram', (req, res) =>
  telegramController
    .handle(req.body)
    .then(() => res.status(204).end())
    .catch((e) => {
      console.error('route.webhook.telegram#error', e);
      res.status(204).end();
    })
);

router.post('/viber', (req, res) =>
  viberController
    .handle(req.body)
    .then(() => res.status(204).end())
    .catch((e) => {
      console.error('route.webhook.viber#error', e);
      res.status(204).end();
    })
);

export default router;
