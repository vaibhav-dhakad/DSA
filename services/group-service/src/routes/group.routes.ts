import { Router } from 'express';
import { addMember, createGroup } from '../controllers/group.controller.js';

export const groupRouter = Router();
groupRouter.post('/', createGroup);
groupRouter.post('/:groupId/members', addMember);
