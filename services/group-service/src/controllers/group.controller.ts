import { Request, Response } from 'express';
import { GroupService } from '../services/group.service.js';

const service = new GroupService();

export const createGroup = async (req: Request, res: Response) => {
  const group = await service.createGroup(req.body);
  res.status(201).json(group);
};

export const addMember = async (req: Request, res: Response) => {
  const member = await service.addMember(req.params.groupId, req.body);
  res.status(201).json(member);
};
