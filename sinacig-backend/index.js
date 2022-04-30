const express = require('express');
const routerApi = require('./routes/index.router');
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const config = require('./config/config');

const app = express();
const port = config.port;

// const whiteList = [
//   'http://localhost:8080',
//   'https://capacitacionmalaria.com.gt',
// ];
// const options = {
//   origin: (origin, callback) => {
//     if (whiteList.includes(origin || !origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('no permitido'));
//     }
//   },
// };
app.use(express.json());
app.use(cors());
require('./utils/auth/index.strategy');

routerApi(app);

app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(
    '\nEl sistema SINACIG se ha levantado en la dirección: http://localhost:' +
      port
  );
});
