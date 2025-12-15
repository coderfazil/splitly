# Splitly
A Bill Splitting Web Application

## Overview
Splitly is a full-stack bill splitting web application built using the MERN stack. It allows users to create groups, add shared expenses, and automatically split bills among group members.

This project focuses on solving real-world expense sharing problems using secure authentication and clean backend design.

## Tech Stack

**Frontend**
- React.js
- Redux (state management)
- HTML, CSS, JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB (Mongoose)

**Authentication**
- JWT (JSON Web Tokens)

---

## Features

### User Features
- User registration and login
- JWT-based authentication
- Create and manage groups
- Add expenses to groups
- Automatically split expenses among members
- View individual balances and settlements
- Global state management using Redux


## Project Structure
splitly/
├── # React frontend
│ ├── store/ # Redux store, reducers, actions
├── backend/ # Node & Express backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── middleware/
└── README.md

## Installation and Setup

### Clone the repository
git clone https://github.com/coderfazil/splitly.git

cd splitly

### Backend setup
cd backend
npm install

Create a `.env` file in the backend directory:
MONGO_URI=mongodb://127.0.0.1:27017/splitly
PORT=5000
JWT_SECRET=your_secret_key

Start the backend server:
npm start

### Frontend setup
npm install
npm run dev

## Deployment
This project is not deployed yet and runs locally for development and testing purposes.

## Learning Outcomes
- Implemented JWT-based authentication
- Designed group-based data models
- Built RESTful APIs with Node and Express
- Developed a complete MERN stack application

## Author
Mohammad Fazil  
GitHub: https://github.com/coderfazil

