# HomeKitchenAI Backend

This is a Node.js Express backend for HomeKitchenAI.

## Features
- Environment config via `.env`
- REST API routes in `/routes`
- Service logic in `/services`
- Example endpoint: `/api/status` and `/api/recipes`

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
3. Development mode (auto-reload):
   ```sh
   npm run dev
   ```

## API Endpoints
- `GET /api/status` — Health check
- `GET /api/recipes` — Example recipes list

## Project Structure
```
.env                # Environment variables
package.json        # Project metadata and scripts
server.js           # Express app entry point
/routes             # API route definitions
/services           # Business logic/services
```
