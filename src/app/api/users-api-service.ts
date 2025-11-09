
import { v4 as uuidv4 } from 'uuid';
import { db } from '../db/db.ts';
import { User } from '../model/user.ts';

export class UsersApiService {
  private info = db;

  postUsers(body: User) {
    const newUser: User = {
      ...body,
      id: uuidv4(),
    };
    this.info.users.push(newUser);
    return newUser;
  }

  getUsers() {
    return this.info.users;
  }

  getUserById(id: string) {
    return this.info.users.find((user) => user.id === id);
  }

  updateUser(id: string, body: any) {
    let updatedRecord;
    this.info.users.map((user, userIndex) => {
      if (user.id === id) {
        const prevData = {...this.info.users[userIndex]};
        this.info.users[userIndex] = { ...prevData, ...body };
        updatedRecord = this.info.users[userIndex];
      }
    });
    return updatedRecord;
  }

  deleteUser(id: string) {
    const userIndex = this.info.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.info.users.splice(userIndex, 1);
    return true;
  }
}
