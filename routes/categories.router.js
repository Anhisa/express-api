const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const users = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    users.push({
      category: faker.commerce.department(),
      product: faker.commerce.product(),
    });
  }
  res.json(users);
});

module.exports = router;
