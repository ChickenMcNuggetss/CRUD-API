import { UsersApiService } from '../api/users-api-service.ts';
import { ControllerType } from '../model/controller.ts';
import { getId } from '../utils/getId.ts';
import { validate } from 'uuid';

export class UserController {
  private usersApiService = new UsersApiService();

  public controllerForUser: ControllerType = {
    GET: ({ url }) => {
      const id = getId(url);
      const isIdValid = validate(id);
      if (!isIdValid) {
        return { statusCode: 400, message: 'Not uuid' };
      }
      const res = this.usersApiService.getUserById(id);
      return { statusCode: 200, message: res };
    },
    PUT: ({ body, url }) => {
      const id = getId(url);
      const isIdValid = validate(id);
      if (!isIdValid) {
        return { statusCode: 400, message: 'Not uuid' };
      }
      const res = this.usersApiService.updateUser(id, body);
      return { statusCode: 200, message: res };
    },
    DELETE: ({ url }) => {
      const id = getId(url);
      const isIdValid = validate(id);
      if (!isIdValid) {
        return { statusCode: 400, message: 'Not uuid' };
      }
      const res = this.usersApiService.deleteUser(id);
      if (res === true) {
        return { statusCode: 200, message: 'Yay! User deleted FOREVER!' };
      }
      return { statusCode: 404, message: `User with id ${id} doesn't exist` };
    },
  };
}
