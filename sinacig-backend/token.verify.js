const jwt = require('jsonwebtoken');

const secret = 'mycat';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbmlzdHJhZG9yIiwiaWF0IjoxNjUxNDI3MDQ0fQ.zJgbXOf8ke492SGa0kblLtsW4fhl4Hyp2Qpob43V0Yc';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
