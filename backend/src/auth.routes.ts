import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { UserModel } from './user.model';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    res.status(401).json({ error: 'Invalid username or password' });
    return;
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401).json({ error: 'Invalid username or password' });
    return;
  }
  res.json({ success: true });
});

export default router;