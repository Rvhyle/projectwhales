import express, { Request, Response } from 'express';
import { checkUsername, checkPassword } from '../../models/User/checkUserValidation';
const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  //Destructure
  const { username, password } = req.body;

  //Check if username is valid
  let validUsername: Boolean = await checkUsername(username);

  //Handle non existent username
  if (!validUsername) return res.status(401).json({ message: 'Username does not exists' });

  //Validate password
  //Only triggered if username exists
  let userValidation = await checkPassword(username, password);

  if (!userValidation) return res.status(401).json({ message: 'Incorrect Password' });

  //Set Session Info
  req.session.user_id = userValidation?.user_id;
  req.session.loggedIn = true;

  //log session id
  // console.log(req.session.id);

  return res.status(200).json({ message: 'Logged In' });
});

module.exports = router;
