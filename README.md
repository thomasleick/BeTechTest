# Sells API RESTful

## Try this API

https://betechtest.onrender.com/

## About

This RESTful API is developed using the Adonis framework (Node.js) and is intended to provide functionalities for managing clients, products, and sales. The database is structured according to the minimum requirements and includes tables for users, clients, addresses, phones, products, and sales.

## Setup

You can either use the Adonis CLI to install the blueprint or manually clone the repository and install the dependencies.

### Using Adonis CLI

```bash
adonis new BeTechTest
```

### Manual Installation

```bash
git clone https://github.com/thomasleick/BeTechTest.git
cd BeTechTest
npm install
```

### Migrations

Run the following command to run the startup migrations:

```bash
adonis migration:run
```

## Application Details

### Technologies Used

- Adonis (Node.js)
- MySQL Database

### Database Structure

The database structure should be organized according to the following minimum requirements:

- Users: email, password;
- Clients: name, CPF;
- Address: all address fields;
- Phones: client, number;
- Products: name, description, price, deleted
- Sales: client, product, quantity, unit price, total price

### System Routes

The system should have routes for:

#### Users (/)
- POST /signup: User signup
- POST /login: User login with JWT token

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
