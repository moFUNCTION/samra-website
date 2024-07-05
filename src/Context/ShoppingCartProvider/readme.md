# React Shopping Cart Management

This project implements a shopping cart management system using React, leveraging Context API for state management and local storage for persistence. It enables users to add products with sizes, update quantities, delete items, and dynamically calculate the total price.

## Features

- **ShoppingCartProvider**: Manages the state of the shopping cart using React Context API.
- **ShoppingCartItem Class**: Represents a product in the shopping cart, including sizes and quantities.
- **useShoppingCart**: Custom hook for consuming the shopping cart context.
- **useShoppingCartItems**: Custom hook to fetch product details based on items in the shopping cart using Firebase.
- **Local Storage**: Persists shopping cart data across sessions using the browser's local storage.

## Components

### ShoppingCartProvider

#### State Management

- Initializes `shoppingCart` state using local storage or an empty array if no data exists.
- Updates local storage whenever `shoppingCart` changes using `useEffect`.

#### Actions

- **onAddProductToShoppingCart**: Adds a new product to the shopping cart if it doesn't already exist.

- **onUpdateProductInShoppingCart**: Updates product sizes and quantities based on specified actions:

  - `"increament"`: Increases quantity of a size.
  - `"decreament"`: Decreases quantity of a size (removes size if quantity is 1).
  - `"delete"`: Completely removes a size from the product.

- **onDeleteItemFromShoppingCart**: Removes an entire product from the shopping cart.

#### Calculations

- **totalPrice**: Computes the total price of all items in the shopping cart.

### useShoppingCart

Custom hook for accessing the shopping cart context within components.

### useShoppingCartItems

Fetches detailed product information for items in the shopping cart using Firebase or other backend services.
