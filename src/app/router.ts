import { IncomingMessage } from 'http';
import { UsersApiService } from './api/users-api-service.ts';
import { Result } from './model/result.ts';
import { UsersController } from './controller/users-controller.ts';
import { UserController } from './controller/user-controller.ts';

export class Router {
  private usersController = new UsersController().usersController;
  private controllerForUser = new UserController().controllerForUser;

  public defineRoute(request: IncomingMessage, body: any): Result {
    const { method, url } = request;
    if (!method) {
      return { statusCode: 400, message: 'Method not found' };
    }
    if (url === '/api/users') {
      return this.getHandlerFromController(method, this.usersController)({ body });
    } else if (url?.startsWith('/api/users') && url.split('/api/users').length === 2 && url.split('/api/users')[1]?.startsWith('/')) {
      return this.getHandlerFromController(method, this.controllerForUser)({ body, url });
    } else {
      return { statusCode: 404, message: 'Not Found' };
    }
  }

  private getHandlerFromController(method: string, controller: Record<string, any>) {
    const controllerMethod = controller[method];
    if (controllerMethod) {
      return controllerMethod;
    }
    return () => ({ statusCode: 400, message: 'Method not found' });
  }
}
