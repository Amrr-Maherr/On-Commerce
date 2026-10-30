# on-commerce

A simple e-commerce REST API built with **Express.js**, **TypeScript**, and **MongoDB** (Mongoose).

The project was converted from NestJS to plain Express so the request flow is easy to follow:
routes -> controllers -> services -> Mongoose models.

## Tech Stack

- Express.js 5
- TypeScript
- MongoDB + Mongoose
- express-validator for request validation
- morgan for JSON request/response logging
- Vitest + Supertest
- oxlint

## Requirements

- Node.js 20+
- MongoDB running locally or a MongoDB connection string

## Environment Variables

Create a `.env` file in the project root:

```env
DB_URL=mongodb://localhost:27017/on-commerce
PORT=3000
```

`DB_URL` and `PORT` are the only environment variables used by the app.

## Installation

```bash
npm install
```

## Running the Project

```bash
# development (run TypeScript directly with tsx)
npm run start

# development with file watching
npm run start:dev

# development with the Node inspector
npm run start:debug
```

## Build and Production

```bash
npm run build
npm run start:prod
```

`npm run build` compiles TypeScript into `dist/`, and `npm run start:prod` runs `dist/server.js`.

## Available Scripts

| Script | Description |
|---|---|
| `npm run start` | Run the server with `tsx` |
| `npm run start:dev` | Run the server in watch mode |
| `npm run start:debug` | Run with the Node inspector enabled |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start:prod` | Run the compiled server |
| `npm run typecheck` | Type-check without emitting files |
| `npm run lint` | Run oxlint |
| `npm test` | Run unit tests |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run test:cov` | Run tests with coverage |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run seed` | Seed the database |

## Project Structure

Each feature is a self-contained module under `src/modules/`.

```text
src/
  config/
    database.ts              # MongoDB connection
  middlewares/               # request logging, validation, error handling
  modules/
    products/
      products.routes.ts     # Express router
      products.controller.ts # HTTP request/response handlers
      products.service.ts    # Database queries and business logic
      product.schema.ts      # Mongoose schema and model
      product.validator.ts   # Request body validation
    brands/
    categories/
    users/
    carts/
    orders/
    validation.spec.ts       # Shared validation tests
  routes/
    index.ts                 # Combines all module routers
  utils/                     # Shared validation helper
  database/seed/             # Seed script and seed data
  app.controller.ts          # Root controller
  app.ts                     # Express app and middleware setup
  server.ts                  # Database connection and server startup
test/
  app.e2e-spec.ts            # End-to-end tests
```

## How a Request Flows

For example, `GET /api/v1/products`:

1. `src/routes/index.ts` mounts the products module router.
2. `src/modules/products/products.routes.ts` matches the route.
3. `src/modules/products/products.controller.ts` calls the service.
4. `src/modules/products/products.service.ts` queries the Mongoose model.
5. `src/modules/products/product.schema.ts` defines the model.

Controllers only handle HTTP concerns. Database queries and business logic live in services. Everything a feature needs is kept together inside its module folder.

## API

All routes are prefixed with `/api/v1`.

### Root

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1` | Returns `Hello World!` |

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/products` | List products |
| POST | `/api/v1/products` | Create a product |
| GET | `/api/v1/products/:id` | Get a product |
| PATCH | `/api/v1/products/:id` | Update a product |
| DELETE | `/api/v1/products/:id` | Delete a product |

### Brands

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/brands` | List brands |
| POST | `/api/v1/brands` | Create a brand |
| GET | `/api/v1/brands/:id` | Get a brand |
| PATCH | `/api/v1/brands/:id` | Update a brand |
| DELETE | `/api/v1/brands/:id` | Delete a brand |

### Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/categories` | List categories |
| POST | `/api/v1/categories` | Create a category |
| GET | `/api/v1/categories/:id` | Get a category |
| PATCH | `/api/v1/categories/:id` | Update a category |
| DELETE | `/api/v1/categories/:id` | Delete a category |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/users` | List users |
| POST | `/api/v1/users` | Create a user |
| GET | `/api/v1/users/:id` | Get a user with cart and orders |
| PATCH | `/api/v1/users/:id` | Update a user |
| DELETE | `/api/v1/users/:id` | Delete a user |

### Carts

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/carts` | List carts |
| POST | `/api/v1/carts` | Create a cart |
| GET | `/api/v1/carts/:id` | Get a cart |
| PATCH | `/api/v1/carts/:id` | Update a cart |
| DELETE | `/api/v1/carts/:id` | Delete a cart |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/orders` | List orders |
| POST | `/api/v1/orders` | Create an order |
| GET | `/api/v1/orders/:id` | Get an order |
| PATCH | `/api/v1/orders/:id` | Update an order |
| DELETE | `/api/v1/orders/:id` | Delete an order |

`POST` requests return `201 Created`. Other successful requests return `200 OK`.

Successful responses use a JSON envelope:

```json
{
  "success": true,
  "data": {}
}
```

## Validation and Errors

Request bodies are validated by `express-validator` chains in each module's `*.validator.ts` file (for example, `src/modules/products/product.validator.ts`). Each POST and PATCH route runs its chains, then `handleValidation` rejects invalid input with `400 Bad Request`.

Route IDs are validated by `validateIdParam`, which rejects anything that is not a 24-character MongoDB ObjectId.

Error responses follow the original API format:

```json
{
  "message": ["Please provide a valid ID"],
  "error": "Bad Request",
  "statusCode": 400
}
```

Unknown routes return:

```json
{
  "message": "Cannot GET /api/v1/unknown",
  "error": "Not Found",
  "statusCode": 404
}
```

## Seeding the Database

```bash
npm run seed
```

The seed script creates brands, categories, products, users, carts, and orders. It uses the `DB_URL` from `.env`.

## Tests

```bash
npm test
npm run test:e2e
```

Unit tests cover request validation and the root endpoint. End-to-end tests use Supertest against the Express app.

## Notes

- Authentication and authorization were not part of the original project and are not included.
- The database technology and Mongo document structure are unchanged from the original NestJS version.
- `PATCH /api/v1/brands/:id` currently preserves the original validation behavior, which validates product fields rather than brand fields. This is a known existing quirk, not a migration bug.
