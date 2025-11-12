# CRUD-API Task

This project implements a basic CRUD API built with Node.js.

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org) (recommended LTS version);
- npm;
-  A tool such as Postman or cURL to test the API;

## Installation

1. Clone the repository (or your project folder):
```
git clone <repo-url>
```

2. Install the dependencies:
```
npm install
```

3. For using environment variables, create a .env file in the project root following the format of to .env.example file.

## Running the application

1. Start the server:

```
npm run start:prod
```

## API endpoints

| HTTP Method | Endpoint         | Description                   |
| ----------- | ---------------- | ----------------------------- |
| GET         | `/api/users`     | Retrieve a list of all items  |
| GET         | `/api/users/:id` | Retrieve a single item by ID  |
| POST        | `/api/users`     | Create a new item             |
| PUT         | `/api/users/:id` | Update an existing item by ID |
| DELETE      | `/api/users/:id` | Delete an item by ID          |
