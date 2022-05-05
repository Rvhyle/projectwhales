import express from 'express';
import { checkSession } from './api//v1/middlewares/checkSession';
import { PrismaClient } from '@prisma/client';
import sessionConfig from './api/v1/utils/session_config';

const cookieParser = require('cookie-parser');
export const prisma = new PrismaClient();

//Session Data Declarations
declare module 'express-session' {
  export interface SessionData {
    user_id: string;
    loggedIn: boolean;
  }
}

//CONSTANTS
const SERVER = express();
const PORT = process.env.PORT || 8080;

SERVER.use(express.json());
SERVER.use(cookieParser());
SERVER.use(checkSession);
// Session
SERVER.use(sessionConfig);

//Auth
SERVER.use('/projectwhales/api/v1/auth', require('./api/v1/controllers/auth/register'));
SERVER.use('/projectwhales/api/v1/auth', require('./api/v1/controllers/auth/login'));
//Home
SERVER.use('/projectwhales/api/v1/home', require('./api/v1/controllers/home/feed'));
// Start Express server
SERVER.listen(PORT, (): void => {
  console.log(`Server connected at PORT ${PORT} 🔌`);
});
