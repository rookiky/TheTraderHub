import { User } from 'src/users/users.service';

export interface JwtPayload extends Omit<User, 'password'> {
  iat?: number;
  exp?: number;
}
