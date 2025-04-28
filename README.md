# Caseworker Task Manager — Backend API

A RESTful API built with Node.js and Express to manage caseworker tasks. It provides endpoints for creating, retrieving, updating, and deleting tasks, with support for pagination and includes built-in API documentation via Swagger.

---

View the live application at (https://dts-dev-challenge-frontend.vercel.app)

## Features

- **CRUD Operations:** Endpoints for creating, retrieving, updating, and deleting tasks.
- **Pagination:** Supports `limit` and `offset` query parameters for fetching tasks in batches.
- **API Documentation:** Interactive API documentation available through Swagger UI.
- **Docker Support:** Dockerfile and Docker Compose configurations for containerised deployment and development.
- **Lightweight Database:** Uses SQLite (`better-sqlite3`) for simple local development and data persistence.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (using `better-sqlite3` library)
- **API Documentation:** Swagger UI (`swagger-ui-express`, `swagger-jsdoc`)
- **Containerization:** Docker

---

## Getting Started Locally

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- (Optional) [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/) if you want to run containers

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/itskom/DTSDevChallengeBackend.git
    cd DTSDevChallengeBackend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Running the Application (Without Docker)

1.  **Start the development server:**

    ```bash
    npm run dev
    ```

2.  **Access the API:**
    The API will be running at `http://localhost:3000`.

---

## 📄 API Endpoints

These endpoints are available:

| Method   | Route               | Description                          |
| :------- | :------------------ | :----------------------------------- |
| `POST`   | `/tasks`            | Create a new task                    |
| `GET`    | `/tasks`            | Retrieve tasks (supports pagination) |
| `GET`    | `/tasks/:id`        | Retrieve a specific task by its ID   |
| `PATCH`  | `/tasks/:id/status` | Update the status of a specific task |
| `DELETE` | `/tasks/:id`        | Delete a specific task by its ID     |

**Pagination Query Parameters (for `GET /tasks`):**

- `limit`: (Number) Specifies the maximum number of tasks to return.
- `offset`: (Number) Specifies the number of tasks to skip from the beginning.

**E.g. Request:**
Retrieve 5 tasks, skipping the first 10:
`GET /tasks?limit=5&offset=10`

---

## API Documentation (Swagger)

Interactive API documentation generated with Swagger is available when the server is running.

👉 **Access Swagger UI at: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

For exploring endpoints, view request/response schemas, and testing the API directly from the browser.

---

## Docker Deployment

**1. Build and Run with Dockerfile:**

```bash
docker build -t task-manager-backend

docker run -p 3000:3000 --name task-api task-manager-backend
```

**2. Using Docker Compose:**

```bash
docker-compose up --build

docker-compose down
```

## Roadmap / Future Improvements

- **Authentication & Authorization:** Implement JWT (JSON Web Tokens) or similar for securing API endpoints.
- **Database Migration:** Replace SQLite with a more robust production-ready database like PostgreSQL or MySQL, including migration tooling.
- **Enhanced Error Handling:** Implement more detailed, consistent, and user-friendly error responses.
- **Testing:** Implement comprehensive unit, integration, and end-to-end tests (e.g., using Jest, Supertest, Vitest).

---
