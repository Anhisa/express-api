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
app.listen(port, () => {});
// const allowList = ['http://127.0.0.1:5500'];
// const options = {
//   origin: (origin, callback) => {
//     if (allowList.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('no permitido'));
//     }
//   },
// };

app.use(cors());

app.use(express.json());

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
