import express, { NextFunction, Request, Response } from 'express';

let authPaths = {
  login: '/projectwhales/api/v1/auth/login',
  register: '/projectwhales/api/v1/auth/register',
};

export const checkSession = (req: Request, res: Response, next: NextFunction) => {
  let sessionCookie = req.cookies['connect.sid'];
  if (req.path === authPaths.login || req.path === authPaths.register) {
    return next();
  }

  //Check if session exists
  if (!sessionCookie) {
    return res.status(401).json({ authMsg: 'Session Not Found' });
  }

  next();
};
