import { Router } from './app/router.ts';
import http from 'http';

const server = http.createServer((request, response) => {
  let body = '';
  request.on('data', (chunk) => {
    try {
      body += chunk.toString();
    } catch (err) {
      console.log(err);
    }
  });

  request.on('end', () => {
    try {
      const data = JSON.parse(body || '{}');
      const router = new Router();
      const result = router.defineRoute(request, data);
      console.log(JSON.stringify(result?.message));
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = result?.statusCode;
      response.end(JSON.stringify(result?.message));
    } catch (err) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      console.log(214, err);
      response.end(JSON.stringify({ error: 'Invalid JSON' }));
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
