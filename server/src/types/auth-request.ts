import { User } from 'src/users/users.service';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: Omit<User, 'password'>;
}
