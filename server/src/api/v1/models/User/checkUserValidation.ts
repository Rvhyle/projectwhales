import { prisma } from '../../../../index';
const bcrypt = require('bcrypt');

export const checkEmail = async (email: string): Promise<boolean> => {
  let emailIsValid = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  //return true if email address does exists; false otherwise
  return emailIsValid ? true : false;
};

export const checkUsername = async (username: string): Promise<boolean> => {
  let usernameIsValid = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  //return true if username does exists; false otherwise
  return usernameIsValid ? true : false;
};

// Validate Password
export const checkPassword = async (username: string, password: string) => {
  //Get hashed password from database
  let hashedPass = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      password: true,
    },
  });

  //compare password input with hashed password
  let isPasswordValid: Boolean = bcrypt.compareSync(password, hashedPass?.password);

  return {
    isPasswordValid: isPasswordValid,
    user_id: hashedPass?.id,
  };
};
