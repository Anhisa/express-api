const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const app = express();
const port = process.env.PORT || 3000;
// const allowList = ['http://127.0.0.1:5500', 'http://localhost:3000','https://myapi-lemon.vercel.app', 'https://myapi-anhisa.vercel.app', 'https://api.greenstudiodev.com'];
// const options = {
//     origin: function (origin, callback) {
//     if (allowList.indexOf(origin) !== -1 ) {
//       callback(null, true);
//     } else {
//       callback(new Error('no permitido'));
//     }
//   },
// };

app.listen(port, () => {});
app.use(cors());

app.use(express.json());

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
