import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { emailValidation, usernameValidation } from '../../models/User/userValidation';
import createUser from '../../models/User/createUser';
const router = express.Router();

/**
 * []Sanitize Inputs
 * []Check if User already exists
 * []Save User into DB
 * []Create Session
 **/
router.post('/register', body('email').isEmail(), body('password').isLength({ min: 8, max: 16 }), async (req: Request, res: Response) => {
  //Sanitize Inputs
  const { email, username, password, name } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check if username and email already exists
  let doesEmailExist = await emailValidation(email);
  if (doesEmailExist) return res.status(401).json({ authError: 'Email already in use' });

  let doesUsernameExist = await usernameValidation(username);
  if (doesUsernameExist) return res.status(401).json({ authError: 'Username already in use' });

  //Create User
  try {
    await createUser(email, username, password, name);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }

  res.status(200).json({ authMsg: 'Success' });
});

module.exports = router;
