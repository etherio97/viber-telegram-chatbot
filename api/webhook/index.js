import { Router, json } from 'express';
import { getClientIp } from '../../src/app/ip';
import viberController from '../../src/controllers/viber.controller';
import telegramController from '../../src/controllers/telegram.controller';

const router = Router();

router.post('/telegram', json(), (req, res) => {
  console.log('telegram#ip:', getClientIp(req));

  telegramController
    .handle(req.body)
    .then(() => res.status(204).end())
    .catch((e) => {
      console.error('route.webhook.telegram#error', e);
      res.status(204).end();
    });
});

router.post('/viber', json(), (req, res) => {
  console.log('viber#ip:', getClientIp(req));

  viberController
    .handle(req.body)
    .then(() => res.status(204).end())
    .catch((e) => {
      console.error('route.webhook.viber#error', e);
      res.status(204).end();
    });
});

export default router;
