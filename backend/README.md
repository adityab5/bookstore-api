# Book Store API

This is a Node.js and Express.js based REST API for managing comic book inventory using MongoDB as the database.

## Prerequisites

- Node.js (v14 or later)
- MongoDB

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/adityab5/bookstore-api.git
   cd bookstore-api
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```
   PORT = 8080
   MONGO_URI = mongodb+srv://<user_name>:<password>@cluster0.gkwva.mongodb.net/
   ```

   Replace the `MONGODB_URI` with your MongoDB connection string if needed.

4. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

- POST /api/comic-books - Create a new comic book
- PUT /api/comic-books/:id - Update an existing comic book
- DELETE /api/comic-books/:id - Delete a comic book
- GET /api/comic-books - Get all comic books (with pagination, filtering, and sorting)
- GET /api/comic-books/:id - Get comic book details by ID

## API Testing with Postman

1. Install Postman from https://www.postman.com/downloads/
2. Import the `Book_Store_API.postman_collection.json` file into Postman
3. Set up a new environment in Postman with the following variables:
   - `baseUrl`: Set to your server's URL (e.g., "http://localhost:8080")
   - `comicBookId`: Leave this empty initially
4. Select the imported environment in Postman
5. Use the provided requests to test the API endpoints:
   - Create new comic books using the "Create Comic Book" and "Create Batman Comic" requests
   - Use the returned `_id` from a created comic book to update the `comicBookId` environment variable
   - Test other endpoints like Update, Delete, and Get Details using the set `comicBookId`

## License

This project is licensed under the MIT License.