import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

//CONSTANTS
const SERVER = express();
const PORT = process.env.PORT || 8080;

SERVER.use(express.json());
//Paths
SERVER.use('/api/v1/auth', require('./api/v1/controllers/auth/register'));
// Start Express server
SERVER.listen(PORT, (): void => {
  console.log(`Server connected at PORT ${PORT} 🔌`);
});
