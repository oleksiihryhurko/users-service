import jwt from 'jsonwebtoken';
import { config } from '../config/app.config';
import { UserDTO } from '../users/user.dto';

export const generateAccessToken = (user: UserDTO): string => {
    const payload = { email: user.email, role: user.role }
    const { secret, expires } = config.authentication;
    const token = jwt.sign(payload, secret, { expiresIn: expires })
    return token;
}
