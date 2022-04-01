const viberController = require('../../src/viber.controller');

module.exports = async (req, res) => {
  try {
    let method = req.method;
    let data = req.body;
    let token = req.query.token;

    if (method != 'POST') return res.status(405)
      .send('Method not allowed!');

    if (!token) return res
      .status(401).send('Required parameter: token in query');

    if (token != 'etherio') return res.status(403).send('Invalid or wrong token!');

    if (!data) return res.status(400)
      .send('Bad request!');

    await viberController
      .handle(data);

    res.status(204).end();

  } catch (e) {
    console.error(e);
    res.status(500)
      .send(e.message);
  }
};