import { checkRequiredFields } from '../utils/checkRequiredFields.ts';
import { UsersApiService } from '../api/users-api-service.ts';
import { ControllerType } from '../model/controller.ts';

export class UsersController {
  private usersApiService = new UsersApiService();

  public usersController: ControllerType = {
    POST: ({ body }: { body: any }) => {
      if (!checkRequiredFields({ body })) {
        return { statusCode: 400, message: 'Request body does not contain required fields' };
      }
      const res = this.usersApiService.postUsers(body);
      return { statusCode: 201, message: res };
    },
    GET: () => {
      const res = this.usersApiService.getUsers();
      return { statusCode: 200, message: res };
    },
  };
}
