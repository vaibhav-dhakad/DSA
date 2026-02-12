export interface CreateGroupDto {
  name: string;
  adminId: string;
  memberIds: string[];
}

export interface AddMemberDto {
  userId: string;
  role?: 'MEMBER' | 'ADMIN';
}
