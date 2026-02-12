import { prisma } from '../models/prisma.js';
import { AddMemberDto, CreateGroupDto } from '../dtos/group.dto.js';

export class GroupService {
  async createGroup(input: CreateGroupDto) {
    return prisma.group.create({
      data: {
        name: input.name,
        adminId: input.adminId,
        members: {
          create: [
            { userId: input.adminId, role: 'ADMIN' },
            ...input.memberIds.map((userId) => ({ userId, role: 'MEMBER' }))
          ]
        }
      },
      include: { members: true }
    });
  }

  async addMember(groupId: string, input: AddMemberDto) {
    return prisma.groupMember.create({
      data: { groupId, userId: input.userId, role: input.role ?? 'MEMBER' }
    });
  }
}
