import type { User } from '../model/user.ts';

export interface DB {
  users: User[];
}

export const db: DB = { users: [] };
