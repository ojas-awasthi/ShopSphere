# ShopSphere

ShopSphere is a MERN e-commerce application adapted from the original open-source Cricket Weapon project.

## Stack
- MongoDB / Mongoose
- Express / Node.js
- React
- Redux / Redux Thunk
- Material UI
- Cloudinary
- Nodemailer

## Features
- User registration and JWT authentication
- Product search, filtering, reviews, cart and checkout
- Cash on Delivery checkout
- Order management
- Admin product, user and order management
- Cloudinary image uploads
- Password recovery by email

## Deployment
The application can be deployed as a single Node/Express web service. The deployment builds the React frontend and the backend serves the resulting production build from `frontend/build`. Configure the environment variables in `backend/config/config.env.example` in the hosting provider; never commit real secrets.

## Environment variables
See `backend/config/config.env.example`.

## Attribution
This project is an adaptation of the original MIT-licensed Cricket Weapon project. The original project and its license should be acknowledged when redistributing the adapted source.
