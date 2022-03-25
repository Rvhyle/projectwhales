import { prisma } from '../../../../index';
const bcrypt = require('bcrypt');

async function createUser(email: string, password: string, username: string, name?: string) {
  //Create hashed Password
  const saltRounds = 10;
  const hashedPass = bcrypt.hashSync(password, saltRounds);
  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPass,
      username: username,
      name: name,
    },
  });
}

export default createUser;
