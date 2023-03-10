# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index /products [GET]
- Show /products/:id [GET]
- Create /products [POST] [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index /users [GET] [token required]
- Show /users/:id [GET] [token required]
- Create users [POST] [token required]

#### Orders

- Current Order by user (args: user id) /users/:id [GET] [token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

CREATE TABLE products(
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
price INTEGER NOT NULL
);

#### User

CREATE TABLE users(
id SERIAL PRIMARY KEY,
email VARCHAR(200) NOT NULL,
firstname VARCHAR(50) NOT NULL,
lastname VARCHAR(50) NOT NULL,
password VARCHAR(100) NOT NULL
);

#### Orders

CREATE TABLE orders(
id SERIAL PRIMARY KEY,
status VARCHAR(50),
user_id INTEGER REFERENCES users(id) NOT Null
);

### Ordered Product

CREATE TABLE products_orders(
id SERIAL PRIMARY KEY,
order_id INTEGER REFERENCES orders(id) NOT NULL,
product_id INTEGER REFERENCES products(id) NOT NULL,
quantity INTEGER
);
