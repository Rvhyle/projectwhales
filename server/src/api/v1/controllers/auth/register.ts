import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { checkUsername, checkEmail } from '../../models/User/checkUserValidation';
import createUser from '../../models/User/createUser';
const router = express.Router();

router.post('/register', body('email').isEmail(), body('password').isLength({ min: 8, max: 16 }), async (req: Request, res: Response) => {
  const { username, password, email, name } = req.body;
  // Check for input errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  //Check if Username and email exists
  let emailCheck = await checkEmail(email);
  let usernameCheck = await checkUsername(username);

  //Check if info provided is valid and does not exists
  if (emailCheck) {
    return res.status(401).json({ message: 'Email already in use' });
  }

  if (usernameCheck) {
    return res.status(401).json({ message: 'Username already in use' });
  }

  try {
    //User must log in to create session after account creation
    await createUser(email, password, username, name);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Error creating account' });
  }

  //Create User
  return res.status(200).json({ message: 'Account created' });
});

module.exports = router;
