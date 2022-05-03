const bcrypt = require('bcryptjs');

async function verifyPassword() {
  const myPassword = 'admin';
  // const prove = await bcrypt.hash(myPassword, 10);
  // console.log(prove);
  const hash = '$2a$10$ig.344BJgkCEXvWvIC1rOO3HoXs8hXyRxNExMj5WSUl33ahae3kBm';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
