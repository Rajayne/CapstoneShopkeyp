# Shopkeyp

Shopkeyp is an inventory management system that tracks user purchases.

ShopKeyp presents as a browser website that allows users to create an account and access a static shop. Admins are able to add and edit shop items, view items and item history, view users, add/remove items from users, add/subtract from user balances, and view all transaction history. Users can purchase/favorite shop items, view their favorite items, view their purchased inventory, and view their transaction history.

<div align="center">

|  t/f  |           isUser           |                                       isAdmin                                        |
| :---: | :------------------------: | :----------------------------------------------------------------------------------: |
| true  |           Logout           | View/Edit Users, Edit User Balance/Inventory, View/Edit/Add Items, View Transactions |
| false | View Home, Register, Login | View Shop, Favorite/Purchase Shop Items, View User Inventory, View User Transactions |

</div>

### Goal

One of the biggest obstacles for admins in roleplaying games (outside of impactful storytelling) is tracking player economy. As such, the goal of this project is to create an inventory management system where admins can maintain a shop with a fixed economy for users to purchase items and access their inventory.

### Demographics

This application is designed for roleplay gaming commerce with an expected demographic ranging from teens to young adults.

## TechStack

This application is built with Node.js, React.js, React-Bootstrap/MaterialUI, PostgreSQL, Express.js, HTML, CSS, Bcrypt/Magic Link, Supertest, JSONSchema, JSONwebtoken, Formik, and Axios.

> **Key Features:** Object-Oriented Programming, Database Management, HTML Inheritance, Password Encryption, API Validation, User Authentication, and Integration Testing.

### Testing

Tests are written using Jest and SuperTest.

- Require supertest, app and db
- Set process.env.NODE_ENV === "test"
- Run jest or npm run test from test folder in command line

## Database Diagram

Diagram created with [Quick Database Diagrams](https://app.quickdatabasediagrams.com/#/).
![image](images/diagram.png)

## User Flow

```mermaid
graph TD
A[Home Page] --> C(Login)
C -- Auth Pass --> D(isAdmin?)
C -- Auth Fail --> E{403 Error}
E -- Retry Login --> D
D -- Yes --> F[Admin Page]
D -- No--> G[User Page]
F --> J[View Items] --> K(Edit/Add Item)
F --> H(View Transactions) --> I(Transaction Details)
F --> L(View Users) --> M[User Page]
M --> DD(Edit Balance)
M --> N(View User Inventory)
N --> BB(Add/Remove Item)
M --> O(Edit User Status) --> P
G --> AA(Edit Profile)
AA --> P(Deactivate Account)
G --> Q(User Transactions) --> R(Transaction Details)
G --> S(View Inventory) --> T(Item Details)
G --> X[View Shop] --> T
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.
