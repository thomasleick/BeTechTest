### System Routes

The system should have routes for:

#### Users (/)
##### POST /signup: create a new user.

 Fields:
 - email (required string)
 - password (required string)

 Responses:
 - 201: Success
 - 400: data validation error or conflict
 - 500: Internal server error

##### POST /login: Realiza o login do usuário e retorna um token JWT.

 Fields:
 - email (required string)
 - password (required string)

 Responses:
 - 200: Success with jwt
 - 401: email and password dont match
 - 404: User not found
 - 500: Internal server error

#### Clients (/clientes) Login required
- GET /: List all clients
- GET /:id?mes=MM&ano=YYYY: Show details of a client and their sales
- POST /: Add a new client
- PUT /:id: Update a client
- DELETE /:id: Delete a client and associated sales

#### Products (/produtos) Login required
- GET /: List all products
- GET /:id: Show details of a product
- POST /: Add a new product
- PUT /:id: Update a product
- DELETE /:id: Soft delete a product

#### Sales (/vendas) Login required
- POST /: Register a sale of 1 product to 1 client
