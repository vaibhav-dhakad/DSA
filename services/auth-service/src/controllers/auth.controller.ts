import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const token = await authService.register(req.body);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await authService.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};
