const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const users = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    users.push({
      firstName: faker.person.firstName(faker.person.sex()),
      middleName: faker.person.middleName(faker.person.sex()),
      lastName: faker.person.lastName(faker.person.sex()),
      gender: faker.person.gender(),
      jobTitle: faker.person.jobTitle(),
      jobDescriptor: faker.person.jobDescriptor(),
    });
  }
  res.json(users);
});

module.exports = router;
