const express = require('express');
const routerApi = require('./routes/index.router');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { logErrors, boomErrorHandler } = require('./middlewares/error.handler');
const config = require('./config/config');

const app = express();
const port = config.port;
let server;

// const whiteList = [
//   'http://localhost:4200',
//   'http://localhost:5000',
//   'http://sinacigqa.mspas.gob.gt',
//   'http://sinacig.mspas.gob.gt',
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

if (config.env == 'dev') {
  app.listen(port, () => {
    console.log(
      '\nEl sistema SINACIG se ha levantado en la dirección: http://localhost:' +
        port
    );
  });
} else if (config.env == 'pro') {
  server = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem')),
    },
    app
  );
  server.listen(port);
  console.log('\nEl sistema SINACIG esta en funcionamiento');
}
