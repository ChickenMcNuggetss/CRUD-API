import { UsersApiService } from '../api/users-api-service.ts';
import { ControllerType } from '../model/controller.ts';

export class UsersController {
  usersApiService = new UsersApiService();

  usersController: ControllerType = {
    // create resuable tpe
    POST: ({ body }: { body: any }) => {
      const res = this.usersApiService.postUsers(body);
      return { statusCode: 201, message: res };
    },
    GET: () => {
      const res = this.usersApiService.getUsers();
      return { statusCode: 200, message: res };
    },
  };
}
