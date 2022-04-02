import { Router } from 'express';
import { getClientIp, getIpDetails } from '../../src/app/ip';

export const router = Router();

router.get('/', async (req, res, next) => {
  try {
    let response = getClientIp(req);

    if (!response.bogon) {
      response = Object.assign(response, await getIpDetails(response.ip));
    }

    res.json(response);
  } catch (e) {
    next(e);
  }
});
