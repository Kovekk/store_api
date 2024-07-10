## store_api - Store Resource Manager
This project is an API designed to manage a store, including operations related to clients, employees, products and suppliers.

## Authors:
**Livia Pimentel** and **Robert Lowry**

## Features
**Clients Management**: Create, read, update, and delete clients records.

**Employee Management**: Create, read, update, and delete employees records.

**Products Management**: Create, read, update, and delete products records.

**Suppliers Management**: Create, read, update, and delete suppliers records.


## Prerequisites
**Node.js (v18.17.1 or later recommended)** 

**npm (v9 or later recommended)** 

## Installation
**Install dependencies:** npm install

## Running the Application
**To run the application in development mode:** node server

## API Endpoints
**Clients**
* GET /clients/: Get a list of all clients. 
* POST /clients/: Create a new client.
* GET /clients/{id}: Get a specific client by ID.
* PUT /clients/{id}: Update an existing client by ID.
* DELETE /clients/{id}: Delete an client by ID.

**Employees**
* GET /employees/: Get a list of all employees. 
* POST /employees/: Create a new employee.
* GET /employees/{id}: Get a specific employee by ID.
* PUT /employees/{id}: Update an existing employee by ID.
* DELETE /employees/{id}: Delete an employee by ID.

**Products**
* GET /products/: Get a list of all products.
* POST /products/: Create a new product.
* GET /products/{id}: Get a specific product by ID.
* PUT /products/{id}: Update an existing product by ID.
* DELETE /products/{id}: Delete a product by ID.

**Suppliers**
* GET /suppliers/: Get a list of all suppliers.
* POST /suppliers/: Create a new supplier.
* GET /suppliers/{id}: Get a specific supplier by ID.
* PUT /suppliers/{id}: Update an existing supplier by ID.
* DELETE /suppliers/{id}: Delete a supplier by ID.

## Authentication
The API uses OAuth for authentication. Ensure you have your OAuth setup correctly to test authenticated routes.
**Protected Routes**
* All routes use authentication.

**Testing Authentication**
You can test authentication using tools like Insomnia or Postman. Make sure to include the appropriate OAuth tokens in your requests to access protected routes.

## Swagger Documentation
You can access the API documentation using Swagger UI at:
* http://localhost:8080/api-docs

or

* https://store-api-ovl4.onrender.com/api-docs
