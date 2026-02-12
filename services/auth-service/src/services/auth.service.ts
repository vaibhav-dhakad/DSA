import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../models/prisma.js';
import { env } from '../config/env.js';
import { LoginRequestDto, RegisterRequestDto } from '../dtos/auth.dto.js';

export class AuthService {
  async register(input: RegisterRequestDto) {
    const passwordHash = await bcrypt.hash(input.password, 10);
    const user = await prisma.user.create({
      data: {
        email: input.email,
        displayName: input.displayName,
        passwordHash
      }
    });
    return this.signToken(user.id, user.email);
  }

  async login(input: LoginRequestDto) {
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user) throw new Error('Invalid credentials');
    const isValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValid) throw new Error('Invalid credentials');
    return this.signToken(user.id, user.email);
  }

  private signToken(userId: string, email: string) {
    return jwt.sign({ userId, email }, env.jwtSecret, { expiresIn: '1h' });
  }
}
