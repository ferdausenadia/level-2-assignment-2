# E-Commerce API

This API provides functionality for managing products and orders in an e-commerce application. It allows for creating, reading, updating, and deleting products, as well as creating orders and managing inventory.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Products](#products)
  - [Orders](#orders)
- [Validation](#validation)
- [Error Handling](#error-handling)

## Installation

To get started with this API, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**

   ```sh
   cd <project-directory>
   ```

3. **Install the dependencies:**

   ```sh
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   MONGO_URI=mongodb://localhost:27017/ecommerce
   PORT=3000
   ```

5. **Start the application:**
   ```sh
   npm start
   ```

## Usage

After installing and starting the application, you can access the API at `http://localhost:3000`.

## API Endpoints

### Products

#### Create a Product

- **Endpoint:** `/api/products`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "iPhone 12",
    "description": "Latest model of iPhone",
    "price": 999,
    "category": "Electronics",
    "tags": ["smartphone", "apple"],
    "variants": [
      {
        "type": "color",
        "value": "black"
      }
    ],
    "inventory": {
      "quantity": 100,
      "inStock": true
    }
  }
  ```
  {
  "success": true,
  "message": "Product created successfully",
  "data": {
  "name": "iPhone 12",
  "description": "Latest model of iPhone",
  "price": 999,
  "category": "Electronics",
  "tags": ["smartphone", "apple"],
  "variants": [
  {
  "type": "color",
  "value": "black"
  }
  ],
  "inventory": {
  "quantity": 100,
  "inStock": true
  },
  "\_id": "60d21b4667d0d8992e610c85",
  "createdAt": "2023-06-07T15:36:11.315Z",
  "updatedAt": "2023-06-07T15:36:11.315Z",
  "\_\_v": 0
  }
  }

### Get All Products or Search Products

## Endpoint: /api/products

## Method: GET

## Query Parameters:

## searchTerm (optional): String to search in product names, descriptions, or tags.

### Get a Product by ID

## Endpoint: /api/products/:productId

## Method: GET

### Update a Product

## Endpoint: /api/products/:productId

## Method: PUT

## Request Body: (Same as Create a Product)
