# Shopkeyp
https://shopkeyp-frontend.onrender.com

|  t/f  |         isLoggedIn         |                                       isAdmin                                             |
| :---: | :------------------------: | :---------------------------------------------------------------------------------------: |
| true  |           Logout           | View Users, Edit User Balance/Status/Account Type, View/Edit/Add Items, View Transactions |
| false | View Home, Register, Login | View Shop, Purchase Shop Items, View User Inventory, View User Transactions               |


## Home Page
![image](https://github.com/Rajayne/CapstoneShopkeyp/assets/116666601/b57ff61c-47da-4078-a943-1a45feae7ee9)
## Register / Login
![image](https://github.com/Rajayne/CapstoneShopkeyp/assets/116666601/3e5135dd-6428-4488-a2b4-3f5c5158cb7d)
![image](https://github.com/Rajayne/CapstoneShopkeyp/assets/116666601/674b9602-a2fd-473d-84ac-a4750c120ed4)
## Profile Page
![image](https://github.com/Rajayne/CapstoneShopkeyp/assets/116666601/2addfe3f-f188-4e29-932a-7869fd4296f6)
## Shop Page
![image](https://github.com/Rajayne/CapstoneShopkeyp/assets/116666601/e18ac9a7-7947-46e0-a227-b08b13391ef5)
## Admin Dashboard
![image](https://github.com/Rajayne/CapstoneShopkeyp/assets/116666601/b8c0ef25-91b2-460c-9dcb-e4674beffe59)


### Goal

One of the biggest obstacles for admins in roleplaying games (outside of impactful storytelling) is tracking player economy. As such, the goal of this project is to create an inventory management system where admins can maintain a shop with a fixed economy for users to purchase items and access their inventory.

### Demographics

This application is designed for roleplay gaming commerce with an expected demographic ranging from teens to young adults.

## TechStack

This application is built with Node.js, React.js, MaterialUI, PostgreSQL, Express.js, HTML, CSS, Bcryptjs, Supertest, JSONSchema, JSONwebtoken, Formik, and Axios.

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
A[Home Page] --> B(Login/Register)
B -- Auth Pass --> D(isAdmin?)
B -. Auth Fail .-> C{{403 Error}}
C -. Retry Login .-> D
D -- Yes --> E[[Admin Dashboard]]
D -- Both --> F{View Shop}
D -- No --> G[[User Profile]]
E --> H(All Transactions) --> I(Transaction Details)
E --> J(All Users) --> K[User Profile]
K --> O(Toggle Admin)
K --> P(Edit Balance)
E --> L(All Items) --> M(Add/Edit Item)
L --> N(Item Details) --> V(Buy Item)
F --> N
G --> Q(Edit Profile)
Q --> R(Deactivate Account)
G --> S(User Inventory) --> N
G --> T(User Transactions) --> U(Transaction Details)
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
