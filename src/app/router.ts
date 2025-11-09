import { IncomingMessage, STATUS_CODES } from 'http';
import { UsersApiService } from './api/users-api-service.ts';
import { validate } from 'uuid';

interface Result {
  statusCode: number;
  message: any;
}

export class Router {
  usersApiService = new UsersApiService();

  defineRoute(request: IncomingMessage, body: any): Result {
    if (request.url === '/api/users' && request.method === 'POST') {
      console.log(body);
      const res = this.usersApiService.postUsers(body);
      return { statusCode: 201, message: res };
    } else if (request.url === '/api/users' && request.method === 'GET') {
      const res = this.usersApiService.getUsers();
      return { statusCode: 200, message: res };
    } else if (
      request.url?.startsWith('/api/users') &&
      request.url.split('/api/users').length === 2 &&
      request.method === 'GET'
    ) {
      const id = this.getId(request.url);
      const isIdValid = validate(id);
      if (!isIdValid) {
        return { statusCode: 400, message: 'Not uuid' };
      }
      const res = this.usersApiService.getUserById(id);
      return { statusCode: 200, message: res };
    } else if (
      request.url?.startsWith('/api/users') &&
      request.url.split('/api/users').length === 2 &&
      request.method === 'PUT'
    ) {
      const id = this.getId(request.url);
      const isIdValid = validate(id);
      if (!isIdValid) {
        return { statusCode: 400, message: 'Not uuid' };
      }
      const res = this.usersApiService.updateUser(id, body);
      return { statusCode: 200, message: res };
    } else if (
      request.url?.startsWith('/api/users') &&
      request.url.split('/api/users').length === 2 &&
      request.method === 'DELETE'
    ) {
      const id = this.getId(request.url);
      const isIdValid = validate(id);
      if (!isIdValid) {
        return { statusCode: 400, message: 'Not uuid' };
      }
      const res = this.usersApiService.deleteUser(id);
      if (res === true) {
        return { statusCode: 200, message: 'Yay! User deleted FOREVER!' };
      }
      return { statusCode: 404, message: `User with id ${id} doesn't exist` };
    } else {
      return { statusCode: 404, message: 'Not Found' };
    }
  }

  getId(url: string){
    return url.split('/api/users')[1].slice(1);
  }
}
