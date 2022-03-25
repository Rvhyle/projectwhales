import { prisma } from '../../../../index';

export async function emailValidation(email: string) {
  //Check if user is already in database
  try {
    const emailExists: object | null = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    return emailExists;
  } catch (error) {
    console.log('error');
  }
}

export async function usernameValidation(username: string) {
  //Check if user is already in database
  try {
    const usernameExists: object | null = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
      },
    });

    return usernameExists;
  } catch (error) {
    console.log('error');
  }
}
