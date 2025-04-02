# Vidly - Video Rental API

A RESTful API for a video rental service built with Node.js, Express, and MongoDB. This project is part of the [Complete Node.js Course](https://codewithmosh.com/p/the-complete-node-js-course) by Mosh Hamedani.

## Features

- RESTful API design
- MongoDB database integration with Mongoose
- JWT-based authentication
- Input validation using Joi
- Error handling middleware
- Unit and integration testing
- Test-driven development (TDD) practices
- Logging system
- Environment configuration management

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Jest (Testing)
- Joi (Validation)
- JSON Web Tokens (JWT)

## Project Structure

```
vidly/
├── config/         # Configuration files
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── startup/        # Application startup logic
├── tests/          # Test files
├── public/         # Static files
└── playground/     # Learning and testing files
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your environment variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_PRIVATE_KEY=your_jwt_private_key
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

- `GET /api/genres` - Get all genres
- `POST /api/genres` - Create a new genre
- `GET /api/genres/:id` - Get a specific genre
- `PUT /api/genres/:id` - Update a genre
- `DELETE /api/genres/:id` - Delete a genre

- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create a new customer
- `GET /api/customers/:id` - Get a specific customer
- `PUT /api/customers/:id` - Update a customer
- `DELETE /api/customers/:id` - Delete a customer

- `GET /api/movies` - Get all movies
- `POST /api/movies` - Create a new movie
- `GET /api/movies/:id` - Get a specific movie
- `PUT /api/movies/:id` - Update a movie
- `DELETE /api/movies/:id` - Delete a movie

- `POST /api/returns` - Return a movie
- `POST /api/rentals` - Rent a movie

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Course Content

This project covers:
- Node.js fundamentals
- Express.js framework
- MongoDB and Mongoose
- RESTful API design
- Authentication and authorization
- Error handling
- Input validation
- Testing (Unit, Integration, TDD)
- Deployment

