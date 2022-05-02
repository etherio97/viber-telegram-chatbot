import { Router, json } from 'express';
import { findBurmese, findWord, similarWord } from '../../../src/app/dict';
import { sortItems } from '../../../src/utils/helpers';

const router = Router();

router.get('/match/en', async (req, res) => {
  let { q } = req.query;
  if (!q) {
    return res.status(400).json({
      error: 'required paramter: q',
    });
  }
  let text = q.trim();
  res.json(
    sortItems(['word'], await findWord(text), text)
  );
});

router.get('/match/mm', async (req, res) => {
  let { q } = req.query;
  if (!q) {
    return res.status(400).json({
      error: 'required paramter: q',
    });
  }
  let text = q.trim();
  res.json(
    sortItems(
      ['defination'],
      await findBurmese(text, 100),
      text
    )
  );
});

router.get('/search/en', async (req, res) => {
  let { q } = req.query;
  if (!q) {
    return res.status(400).json({
      error: 'required paramter: q',
    });
  }
  let text = q.trim();
  res.json(
    sortItems(
      ['word'],
      await findWord(text + '%'),
      text
    )
  );
});

router.get('/search/mm', async (req, res) => {
  let { q } = req.query;
  if (!q) {
    return res.status(400).json({
      error: 'required paramter: q',
    });
  }
  let text = q.trim();
  res.json(
    sortItems(
      ['defination'],
      await findBurmese('%' + text + '%'),
      text
    )
  );
});

export default router;