.env file

# .env

PORT=3000
NODE_ENV=dev

# Database info

POSTGRES_USER=postgres
POSTGRES_PASSWORD=Mohab
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=storeMain
POSTGRES_DB_TEST=storeTest
PASSWORD_BCRYPTION= hashed-password
SALT_ROUNDS=1
JWT= JSON-WEB-TOKEN

## SETUP

# npm install : install all required dependencies for the project

# npm run test : to run all tests in the project (API end points and functions.)

# npm run build : to build the application

# db-migrate up : to build the database

# db-migrate down : to drop the database

## database.json file
```
{
"defaultEnv": { "ENV": "NODE_ENV" },
"dev": {
"driver": "pg",
"host": { "ENV": "POSTGRES_HOST" },
"port": { "ENV": "POSTGRES_PORT" },
"database": { "ENV": "POSTGRES_DB" },
"user": { "ENV": "POSTGRES_USER" },
"password": { "ENV": "POSTGRES_PASSWORD" }
},
"test": {
"driver": "pg",
"host": { "ENV": "POSTGRES_HOST" },
"port": { "ENV": "POSTGRES_PORT" },
"database": { "ENV": "POSTGRES_DB_TEST" },
"user": { "ENV": "POSTGRES_USER" },
"password": { "ENV": "POSTGRES_PASSWORD" }
}
}
```
## Ports

Application running on port 3000, database port on 5432

## API EndPoints

# User

http://localhost:3000/users [GET-POST]
http://localhost:3000/users/authenticate [AUTHENTICATION]
http://localhost:3000/users/:id [PUT-SHOW-DELETE]

# Products

http://localhost:3000/products [GET-POST]
http://localhost:3000/products/:id [PUT-SHOW-DELETE]

# Orders

http://localhost:3000/orders [GET-POST]
http://localhost:3000/orders/:id [PUT-SHOW-DELETE]

# Ordered Products

http://localhost:3000/ordered/product [GET-POST]
http://localhost:3000/ordered/product/:id [PUT-SHOW-DELETE]
