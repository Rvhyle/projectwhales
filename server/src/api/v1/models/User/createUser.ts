import { prisma } from '../../../../index';
const bcrypt = require('bcrypt');

const createUser = async (email: string, password: string, username: string, name: string) => {
  //Create hashed Password
  const saltRounds = 10;
  const hashedPass = bcrypt.hashSync(password, saltRounds);
  await prisma.user.create({
    data: {
      email: email,
      password: hashedPass,
      username: username,
      name: name,
    },
  });
};

export default createUser;
